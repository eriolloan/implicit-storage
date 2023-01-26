import { isObject, isEmpty } from "./objectAssertions"

describe('isObject ', () => {

	it('should return "true" for objects, "false" for arrays and other value types', () => {

		const object = {}
		const array = [ 1, 2 ]
		const map = new Map()
		const symbol = Symbol('symbol')
		const string = 'string'
		const number = 0

		expect(isObject(object)).toEqual(true)
		expect(isObject(array)).toEqual(false)
		expect(isObject(map)).toEqual(false)
		expect(isObject(symbol)).toEqual(false)
		expect(isObject(string)).toEqual(false)
		expect(isObject(number)).toEqual(false)
	})
})