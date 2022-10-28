module.exports = {
  root: true,
  env: {
    node: true,
    'es6': true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    'ecmaVersion': 6, //emcaVersion用来指定你想要使用的 ECMAScript 版本
    'sourceType': 'module', //设置为“ script”(默认) 或 "module"（如果代码是 ECMAScript 模块)
    parser: '@babel/eslint-parser',
  },
  plugins: ['vue', ],
  rules: {
    'semi': 'warn', //默认自动加分号
    'quotes': ['warn', 'single', ], //默认使用单引号
    'no-extra-semi': 'warn', //禁止不必要的分号
    'eqeqeq': ['error', 'always', ], //要求使用 === 和 !==
    'no-multi-spaces': 'warn', //禁止使用多个空格
    'no-undefined': 'warn', //禁止将 undefined 作为标识符
    'comma-dangle': ['warn', {
      'arrays': 'always',
      'objects': 'always',
      'imports': 'never',
      'exports': 'never',
      'functions': 'never',
    }, ], //要求使用拖尾逗号
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    //关闭组件命名规则
    'vue/multi-word-component-names': 'off',
    // "prettier/prettier": "warn",
    // endOfLine: "auto", //修复报错 Delete ␍eslint
  },
};