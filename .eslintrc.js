module.exports = {
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  root: true,
  rules: {
    'no-console': 'off',
    'no-use-before-define': ['error', 'nofunc'],
    'import/prefer-default-export': 'off'
  },
};
