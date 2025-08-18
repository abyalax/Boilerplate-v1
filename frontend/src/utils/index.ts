export type ExtractString<T> = T extends object ? { [K in keyof T]: ExtractString<T[K]> }[keyof T] : T;
