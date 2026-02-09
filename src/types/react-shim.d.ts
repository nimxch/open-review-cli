declare module "react" {
  export type SetStateAction<S> = S | ((prevState: S) => S)
  export type Dispatch<A> = (value: A) => void
  export type ReactNode = unknown
  export function useState<S>(
    initialState: S | (() => S),
  ): [S, Dispatch<SetStateAction<S>>]
  export function createElement(type: unknown, ...children: unknown[]): ReactNode
}
