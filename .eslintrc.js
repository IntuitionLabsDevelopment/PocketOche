module.exports = {
  extends: ["expo", "prettier", "plugin:import/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
  ignorePatterns: ["node_modules/", "**/components/ui/*"],
};
