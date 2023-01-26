import { LocalForageInstance } from "./LocalForageInstance.js"
import { flattenProperties } from "./utils/flattenProperties.js"
import { isEmpty, isObject } from "./utils/objectAssertions.js"

/**
 * The proxy handler required by ImplicitStorage
 */
interface ImplicitStorageHandler extends ProxyHandler<any> {
	store: (key: string, value: any) => any
	clearPath: () => void
}


/**
 * Creates the proxy handler for ImplicitStorage.
 * When setting nested objects on the proxied object,
 * it sets values under flattened keys using stringified string notation.\
 * i.e.:
 * `proxy.foo.bar = 'baz'` stores `'foo.bar':'baz'` on the localforage instance.
 *
 * @param storage The named localforage instance to use.
 * @returns A ProxyHandler updating indexedDB (through localforage)
 * when properties are accessed on the original object.
 */
const createHandler = (storage: LocalForageInstance): ImplicitStorageHandler => {
	// Temporary array, collects strings for accessed nested keys.
	// Used to construct flattened dot-notation strings for storage.
	let path: Array<string> = []

	return {
		set(
			object: Record<string, any>,
			key: string,
			value: any,
			reciever: any,
		) {
			if (isObject(value) && isEmpty(value)) return false // dont set empty objects to avoid polluting the store

			// Update localForage instance only if creating
			// or changing the value.
			if (object[ key ] !== value) {
				const flatKey = path.length ?
					path.join('.') + '.' + key
					: key

				// If the value is an object, flatten its properties.
				if (typeof value == 'object') {
					// flatten and prefix with parent key
					const flatObject = flattenProperties(value, flatKey)

					Object.entries(flatObject).forEach(
						async ([ key, value ]) => await this.store(key, value)
					)
				}
				else {
					async () => await this.store(flatKey, value)
				}

				// set on exposed object
				object[ key ] = value
			}

			this.clearPath()
			return true
		},

		get(
			object: Record<string, any>,
			key: string
		) {
			const value = object[ key ]

			// get recursively for nested objects
			if (typeof value == 'object') {
				// append accessed property name to path
				// when going one level deeper
				path = [ ...path, key ]

				return new Proxy(value, createHandler(storage))
			}

			return value
		},

		async store(
			key: string,
			value: any,
		) {
			try {
				await storage.setItem(key, value)
				return true
			}
			catch (err) {
				return false
			}
		},

		clearPath() { path = [] }
	}
}


export { createHandler }
export type { ImplicitStorageHandler }