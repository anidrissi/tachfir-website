import { defineConfig, globalIgnores } from 'eslint/config';
import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...coreWebVitals,
  ...typescript,
  globalIgnores([
    'node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Fichiers générés par Payload
    'src/app/(payload)/**',
    'src/payload-types.ts',
    'src/migrations/**',
  ]),
]);

export default eslintConfig;
