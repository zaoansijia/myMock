module.exports = {
  "root": true,
  "extends": "standard",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "mocha": true
  },
  "plugins": [
    "html"
  ],
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': 0,
    'comma-spacing': 0
}
};
