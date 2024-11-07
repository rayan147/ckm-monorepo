export type Prettify<T> = {
    [K in keyof T]: Prettify<T[K]>;
  } & {};


//   export type Prettify<T> = {
//   [K in keyof T]: T[K];
// } & {};