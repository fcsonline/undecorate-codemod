const defineTest = require('jscodeshift/dist/testUtils').defineTest;

const tests = [
  'simple-case',
  'unrelated-decorator',
  'mixed-decorators',
  'without-constructor',
  'with-constructor',
  'with-custom-props',
];

tests.forEach(test => {
  defineTest(
    __dirname,
    'undecorateBoundMethod',
    { parser: 'flow' },
    `undecorateBoundMethod/${test}`
  );
});
