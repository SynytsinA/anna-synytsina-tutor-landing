import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "jsx-a11y/control-has-associated-label": [
        "error",
        {
          labelAttributes: ["aria-label"],
          controlComponents: ["Button"],
          depth: 3,
        },
      ],
      "jsx-a11y/anchor-has-content": "error",
    },
  },
];

export default eslintConfig;
