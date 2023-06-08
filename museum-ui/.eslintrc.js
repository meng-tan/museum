module.exports = {
  env: {
    browser: true,
    es2022: true
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "standard-with-typescript",
    "plugin:import/recommended",
    "plugin:prettier/recommended"
  ],
  overrides: [],
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": "off",
    // "react/react-in-jsx-scope": "off",
    "import/no-unused-modules": [
      "error",
      {
        unusedExports: true
      }
    ],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        warnOnUnassignedImports: true,
        alphabetize: {
          caseInsensitive: true,
          order: "asc"
        },
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type"
        ],
        pathGroups: [
          {
            pattern: "react*",
            position: "before",
            group: "builtin"
          },
          {
            pattern: "*@(service|config)/**",
            position: "after",
            group: "external"
          },
          {
            pattern: "*@img/**",
            position: "after",
            group: "index"
          },
          {
            pattern: "**/*.(css|less)",
            patternOptions: {
              matchBase: true
            },
            position: "after",
            group: "type"
          }
        ],
        pathGroupsExcludedImportTypes: ["react"]
      }
    ],
    "import/no-unresolved": [
      "error",
      {
        ignore: [".jpg$", ".png$", ".webp$"]
      }
    ]
  },
  settings: {
    "import/extensions": [".js", ".jsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {}
    }
  }
};
