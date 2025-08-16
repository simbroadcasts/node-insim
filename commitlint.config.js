module.exports = {
  rules: {
    // disallow "!" or BREAKING CHANGE on master only (CI check can gate by branch)
    'footer-leading-blank': [2, 'always'],
  },
};
