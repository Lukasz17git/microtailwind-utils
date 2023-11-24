export type VariantValues<T extends (v: string) => string> = Parameters<T>[0]
export type VariantAsProp<T extends (v: string) => string, K extends string> = Record<K, Parameters<T>[0]>
export const createVariant = <T extends Record<string, string>>(variants: T) => (variantName: keyof T) => variants[variantName]