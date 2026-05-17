import coreWebVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";

export default [
  { ignores: [".next/**", ".claude/**", "node_modules/**"] },
  ...coreWebVitals,
  prettier,
];
