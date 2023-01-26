import { createHandler } from "./ImplicitStorageHandler.js"
import { createLocalForageInstance } from "./LocalForageInstance.js"
import { setNestedProperty, getNestedProperty } from "./utils/nestedProperty.js"



interface ImplicitStorage {
	init: () => void
	clear: () => Promise<void>
	getEntries: () => Promise<Array<Record<string, any>>>
	getKeys: () => Promise<string[]>
	getLength: () => Promise<number>
	getNestedProp: (nestedProps: Array<string>) => any
	setNestedProp: (nestedProps: Array<string>, value: any) => void
}


const createImplicitStorage = async (storageName: string) => {

	const storage = createLocalForageInstance(storageName)

	const exposedObject = {
		name: storageName,

		clear: storage.clear,
		getKeys: storage.keys,
		getLength: storage.length,

		async init() {
			const keys = await storage.keys()

			// retrieve stored entries for use
			keys.map(async (key) => {
				const path = key.split('.') // reconstructs key of flattened properties
				setNestedProperty(this, path, await storage.getItem(key))
			})
		},

		getNestedProperty(path: Array<string>) {
			return getNestedProperty(this, path)
		},

		setNestedProperty(
			path: Array<string>,
			value: any
		) {
			setNestedProperty(this, path, value)
		},
	}

	const handler = createHandler(storage)
	const proxiedStorage = new Proxy(exposedObject, handler)
	await proxiedStorage.init()

	return proxiedStorage
}

export { createImplicitStorage }
export type { ImplicitStorage }