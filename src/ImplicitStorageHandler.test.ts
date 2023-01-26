import { createHandler } from "./ImplicitStorageHandler";
import { LocalForageInstance } from "./LocalForageInstance";


// mock of LocalForageInstance
const localForageInstanceMock: any = {

	name: 'mock',

	getItem: function (prop: PropertyKey) {
		return this[ prop ]
	},

	setItem: function (prop: PropertyKey, value: any) {

		this[ prop ] = value

		return this[ prop ] == value ?
			true
			: false
	},
}


describe('mocked localforage instance', () => {
	let mock: any

	beforeEach(() => {
		mock = Object.assign({}, localForageInstanceMock) // reset mock
	})

	it('should get values from object', async () => {
		const accessed = await mock.getItem('name')

		expect(accessed).toBeDefined()
		expect(accessed).toBe(mock.name)
	})

	it('should set values on object', async () => {
		const prop = 'foo'
		const value = 'bar'

		mock.setItem('foo', 'bar')

		expect(mock[ prop ]).toBeDefined()
		expect(mock[ prop ]).toBe(value)

	})
})


const createProxy = (mock: LocalForageInstance) => {

	return new Proxy({}, createHandler(mock))
}


describe('ImplicitStorageHandler setter', () => {
	let mock: LocalForageInstance
	let proxy: any

	beforeEach(() => {
		mock = Object.assign({}, localForageInstanceMock) // reset mock
		proxy = createProxy(mock)
	})

	it('should set direct properties', () => {
		const prop = 'foo'
		const value = 'bar'

		const done = (proxy[ prop ] = value)

		expect(done).toBeTruthy()
		expect(proxy[ prop ]).toBeDefined()
		expect(proxy[ prop ]).toBe(value)
	})

	it('should set nested properties on localforage instance', () => {
		const prop1 = 'foo'
		const prop2 = 'baz'
		const value = 'bar'
		const flatProps = [ prop1, prop2 ].join('.')

		const done = (proxy[ prop1 ] = { [ prop2 ]: value })

		expect(done).toBeTruthy()
		expect(Object.keys(mock)).toContain(flatProps)
		expect(mock.getItem(flatProps)).toBe(value)
	})

	it('should set nested properties on proxy', () => {
		const prop1 = 'foo'
		const prop2 = 'baz'
		const value = 'bar'

		const done = (proxy[ prop1 ] = { [ prop2 ]: value })

		expect(done).toBeTruthy()
		expect(proxy[ prop1 ][ prop2 ]).toBeDefined()
		expect(proxy[ prop1 ][ prop2 ]).toEqual(value)
	})
})