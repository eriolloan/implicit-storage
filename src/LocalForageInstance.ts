import { createInstance } from 'localforage'

/**
 * A named localforage instance.
 */
interface LocalForageInstance extends LocalForage {
	name: string
}
/**
 * Assigns a 'name' property to a localforage instance object.
 * @param name The name for the LocalForage instance.
 * @returns A localforage object with a 'name' property.
 */
const createLocalForageInstance = (name: string) => Object.assign(createInstance({ name: name }), { name: name })

export { createLocalForageInstance }
export type { LocalForageInstance }