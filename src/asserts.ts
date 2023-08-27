/**
 * Blindly asserts to the type system that the input is of a given type.
 * @param _o The input.
 */
export function assertType<T>(_o: unknown): asserts _o is T {}
