const defineTest = require('jscodeshift/dist/testUtils').defineTest;

const tests = [
  'simple-case',
  'unrelated-decorator',
  'mixed-decorators',
  'return-value',
  'async',
];

tests.forEach(test => {
  defineTest(
    __dirname,
    'undecorateBoundMethod',
    { parser: 'flow' },
    `undecorateBoundMethod/${test}`
  );
});
