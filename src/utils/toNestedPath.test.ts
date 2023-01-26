import { toNestedPath } from "./toNestedPath"

describe('toNestedPath', () => {

	it('should return arrays', () => {
		const array = [ 'foo', 'bar' ]

		expect(Array.isArray(toNestedPath(array))).toBe(true)
		expect(toNestedPath(array)).toBe(array)
	})

	it('should return arrays even if empty', () => {
		const array: Array<string> = []

		expect(Array.isArray(toNestedPath(array))).toBe(true)
		expect(toNestedPath(array)).toEqual(array)
	})

	it('should return arrays from strings', () => {
		const string = 'foo'

		expect(Array.isArray(toNestedPath(string))).toBe(true)
		expect(toNestedPath(string)).toEqual([ string ])
	})

})