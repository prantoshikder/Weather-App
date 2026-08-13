// Next ships types for `*.module.css` only (see next/types/global.d.ts), so a
// plain side-effect import of a global stylesheet — `import "./globals.css"` —
// has no declaration to resolve to. Editors that run TypeScript with
// `noUncheckedSideEffectImports` flag that as ts(2882); this declaration
// satisfies them. The build never depended on it: Next handles CSS imports at
// the bundler level.
declare module "*.css";
