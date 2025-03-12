export interface IOk<T> {
  isOk: true
  isErr: false
  value: T
}

export interface IErr<E = Error> {
  isOk: false
  isErr: true
  error: E
}

export type Result<T, E = Error> = IOk<T> | IErr<E>

class Ok<T> implements IOk<T> {
  public readonly isOk = true as const
  public readonly isErr = false as const
  constructor(public readonly value: T) {}
}

export const ok = <T>(value: T): IOk<T> => new Ok(value)

class Err<E = Error> implements IErr<E> {
  public readonly isOk = false as const
  public readonly isErr = true as const
  constructor(public readonly error: E) {}
}

export const err = <E = Error>(error: E): IErr<E> => new Err(error)
