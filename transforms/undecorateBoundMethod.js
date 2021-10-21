export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source)

  // Replace function
  root
    .find(j.MethodDefinition)
    .replaceWith(methodPath => {
      const { node: method } = methodPath
      const decorated = j(method).find(j.Decorator, { expression: { name: 'boundMethod' }})

      // Ignore this file if there are not decorators
      if (decorated.length === 0) return method

      const methodName = method.key.name
      const params = method.value.params
      const body = method.value.body
      const asynchronous = method.value.async
      const returnType = method.value.returnType

      const expression = j.arrowFunctionExpression(params, body, false)
      expression.async = asynchronous
      expression.returnType = returnType

      return j.classProperty(j.identifier(methodName), expression, null)
    })

  // Remove import
  root
    .find(j.ImportDeclaration, { source: { value: 'autobind-decorator' } })
    .map(imp => imp.replace(null))

  return root.toSource()
}
