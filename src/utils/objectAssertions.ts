/**
 * Asserts whether a given value is an object.
 */
export const isObject = (value: unknown): boolean => {
	return value !== null
		&& value != 0
		&& typeof value === 'object'
		&& value.constructor === Object
}

/**
 * Asserts whether a given object is empty.
 */
export const isEmpty = (obj: Object) => {
	return Object.keys(obj).length === 0
}