# Microtailwind Utils

Class name helpers for [microtailwind](https://www.npmjs.com/package/microtailwind): `cnx` joins classes and drops the ones a later class overrides, short names included, and `createVariant` gives typed variants without CVA.

```bash
npm install microtailwind-utils
```

## cn and cnx

```ts
import { cn, cnx } from 'microtailwind-utils'

cn('p-4', isHidden && 'hidden', { 'tc-red-500': hasError }) // 'p-4 tc-red-500' when only hasError is true
cnx('p-4 tc-white', 'p-8') // 'p-8 tc-white'
cnx('g-4 gap-8') // 'gap-8'
cnx('hover:bg-red-500 hover:bg-blue-500 bg-white') // 'hover:bg-blue-500 bg-white'
```

| Function   | Returns                                                                                      |
| ---------- | -------------------------------------------------------------------------------------------- |
| `cn(...)`  | [clsx](https://github.com/lukeed/clsx) as is: joins strings, arrays and `{ class: boolean }` |
| `cnx(...)` | `cn(...)`, then keeps only the last class of each utility, in the place of the first one     |

`cnx` treats a short name and its Tailwind name as the same utility (`g-` and `gap-`, `br-` and `rounded-`, `o-` and `opacity-`), keeps modifiers apart (`hover:bg-*` doesn't replace `bg-*`) and drops a negative value on a later positive one (`'-m-4 m-2'` -> `'m-2'`).

It only merges classes of the same utility: `cnx('px-4 p-2')` keeps both, unlike `tailwind-merge`.

## createVariant

```ts
import { createVariant, type VariantAsProp, type VariantValues } from 'microtailwind-utils'

const buttonSize = createVariant({ default: 'h-36 px-16', sm: 'h-32 px-12', lg: 'h-40 px-20' })

buttonSize() // 'h-36 px-16'
buttonSize('sm') // 'h-32 px-12'

type TButtonProps = VariantAsProp<typeof buttonSize, 'size'> // { size?: 'default' | 'sm' | 'lg' }
type TButtonSize = VariantValues<typeof buttonSize> // 'default' | 'sm' | 'lg' | undefined
```

Without a name it returns the `default` classes, or `undefined` when there's no `default`.

## Development

| Script          | Does                                  |
| --------------- | ------------------------------------- |
| `npm run dev`   | Runs the tests in watch mode          |
| `npm test`      | Runs the tests once                   |
| `npm run lint`  | Type-checks with `tsc`                |
| `npm run build` | Builds ESM + CJS and types to `dist`  |
| `npx changeset` | Adds a changeset for the next release |

### Releasing

1. Run `npx changeset`, pick the bump type and describe the change, and commit the generated file.
2. When pushed to `main`, CI opens a "Version Packages" PR and runs the checks on it.
3. Merging that PR publishes to npm with [trusted publishing](https://docs.npmjs.com/trusted-publishers) (no npm token needed).
