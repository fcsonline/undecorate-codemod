export default function transformer(file, api) {
  const j = api.jscodeshift;

  const getExpression = (source, opts = {}) => {
    const { noParenthesis } = opts;
    const program = j(noParenthesis ? source : `(${source})`).find(j.Program).get();
    const node = program.node.body[0];
    return node.expression;
  }

  const createConstructor = (node, propsname) => {
    const propstype = propsname ? `: ${propsname}` : ''

    node.unshift(
      j.methodDefinition('constructor', j.identifier('constructor'), getExpression(`function (props${propstype}) {\n  super(props)\n}`))
    )

    return node
  }

  const root = j(file.source)
  let previous = 0

  root
    .find(j.MethodDefinition)
    .map(method => {
      const decorated = j(method).find(j.Decorator, { expression: { name: 'boundMethod' }})

      // Ignore this file if there are not decorators
      if (decorated.length === 0) return

      // Retrieve flow types for props
      const propsname = method.parent.parent.value.superTypeParameters && method.parent.parent.value.superTypeParameters.params[0].id.name

      // Add the binding
      const constructors = j(method.parent.value).find(j.MethodDefinition, { key: { name: 'constructor' } })
      const constructor = (constructors.length > 0 ? constructors.nodes()[0] : createConstructor(method.parent.value.body, propsname))
      const constructorBlockStatement = j(constructor).find(j.BlockStatement).nodes()[0]

      const superIndex = constructorBlockStatement.body.findIndex((node) => {
        return node.type === 'ExpressionStatement' &&
          node.expression.type === 'CallExpression' &&
          node.expression.callee.type === 'Super'
      })

      if (superIndex >= 0) {
        decorated.forEach((decoratedMethod) => {
          const name = decoratedMethod.parent.node.key.name
          const expression = j.expressionStatement(getExpression(`this.${name} = this.${name}.bind(this)`))

          previous = previous + 1

          constructorBlockStatement.body.splice(
            superIndex + previous, 0,
            expression
          )
        })
      } else {
        decorated.forEach((decoratedMethod) => {
          const name = decoratedMethod.parent.node.key.name
          const expression = j.expressionStatement(getExpression(`this.${name} = this.${name}.bind(this)`))

          constructorBlockStatement.body.push(expression)
        })
      }

      // Destroy existing decorators
      decorated.map(dec => dec.replace(null))

      // Append method declaration
      const classBody = method.parent.value
      const methodName = method.value.key.name

      const methodIndex = classBody.body.findIndex((node) => {
        return node.type === 'MethodDefinition' &&
          node.kind === 'method' &&
          node.key.name === methodName
      })

      const methodDefExpression = j.classProperty(j.identifier(methodName), null, j.typeAnnotation(j.genericTypeAnnotation(j.identifier('Function'), null)))

      classBody.body.splice(
        methodIndex, 0, methodDefExpression
      )
    })

  root
    .find(j.ImportDeclaration, { source: { value: 'autobind-decorator' } })
    .map(imp => imp.replace(null))

  return root.toSource()
}
