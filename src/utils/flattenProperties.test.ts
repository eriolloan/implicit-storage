import { flattenProperties } from "./flattenProperties"

describe('flattenProperties', () => {

	const testString = 'bar'
	const testNumber = 1
	const testArray = [ 1, 2 ]

	const emptyObj = {}
	const simpleObj = { foo: testString, baz: testArray }
	const nestObj = {
		foo: testString,
		baz: {
			x: testNumber,
			y: {
				a: {},
				b: testArray
			}
		}
	}

	const objects = [ emptyObj, simpleObj, nestObj ]


	it('should return objects literals', () => {

		expect(typeof flattenProperties(emptyObj)).toBe('object')
		expect(typeof flattenProperties(simpleObj)).toBe('object')
		expect(typeof flattenProperties(nestObj)).toBe('object')
		// nut not arrays
		expect(Array.isArray(flattenProperties(emptyObj))).toBe(false)
		expect(Array.isArray(flattenProperties(simpleObj))).toBe(false)
		expect(Array.isArray(flattenProperties(nestObj))).toBe(false)
	})

	it('returned objects should have no nesting', () => {

		const possibleValues = [ testString, testNumber, testArray ]

		objects.forEach(object => {
			const flatObj = flattenProperties(object)

			Object.values(flatObj).forEach(value => {
				expect(possibleValues).toContainEqual(value)
			})
		})
	})

	it('returned object keys should start with prefix string if provided', () => {

		const prefix = 'key'

		objects.forEach(object => {
			const flatObj = flattenProperties(object, prefix)

			Object.keys(flatObj).forEach(key => {
				expect(key.startsWith(prefix + '.')).toBe(true)
			})
		})
	})
})