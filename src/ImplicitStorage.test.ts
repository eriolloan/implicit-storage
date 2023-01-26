import { describe, it, expect } from '@jest/globals'
require("fake-indexeddb/auto");
import { createImplicitStorage } from "./ImplicitStorage.js";


describe('Storage ', () => {
	let storage: any

	const instanceName = 'test'

	beforeEach(async () => storage = await createImplicitStorage(instanceName))

	it('should setup', () => {

		expect(storage).toBeDefined()
		expect(typeof storage).toBe('object')
		expect(Object.keys(storage).length).toBeGreaterThan(0)
		expect(storage.init).toBeDefined()
		expect(storage.name).toBe(instanceName)
	})

	it('should store (by assignation) and retrieve simple items', () => {
		const key = 'item'
		const value = 3

		storage[ key ] = value

		expect(storage[ key ]).toBeDefined()
		expect(storage[ key ]).toBe(value)
	})

	it('should store (by assignation) nested items as flattened dot notation', () => {
		const key1 = 'item'
		const key2 = 'subItem'
		const value = 3

		storage[ key1 ] = { [ key2 ]: value }

		expect(storage[ key1 ]).toStrictEqual({ [ key2 ]: value })
		expect(storage[ key1 ][ key2 ]).toBe(value)
	})
})