import { getNestedProperty, setNestedProperty } from "./nestedProperty"

const obj: any = {
	a: {
		b: 'x'
	}
}

describe('setNestedProperty', () => {

	it('should set nested values under nested properties', () => {
		const path = [ 'a', 'c' ]
		const value = 'y'

		setNestedProperty(obj, path, value)

		expect(obj.a.c).toBeDefined()
		expect(obj.a.c).toBe(value)
	})

	it('should also set values for direct properties', () => {
		const path = [ 'd' ]
		const value = 'z'

		setNestedProperty(obj, path, value)

		expect(obj.d).toBeDefined()
		expect(obj.d).toBe(value)
	})
})


describe('getNestedProperty', () => {
	it('should get values for nested properties', () => {
		const path = [ 'a', 'b' ]
		const value = getNestedProperty(obj, path)

		expect(value).toBeDefined()
		expect(value).toBe('x')
	})

	it('should also get values for direct properties', () => {
		const path = [ 'a' ]
		const value = getNestedProperty(obj, path)

		expect(value).toBeDefined()
		expect(value).toMatchObject({ b: 'x' })
	})
})