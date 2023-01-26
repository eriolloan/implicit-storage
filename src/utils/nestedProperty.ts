/**
 * Sets a nested value in an object at at a given path.
 * @param obj The reciever object.
 * @param path An array of nested properties as strings.
 * @param value The value to set at the given `path`.
 */
const setNestedProperty = (obj: Record<string, any>, path: Array<string>, value: any) => {
	let i = 0
	let prop: any

	for (; i < path.length - 1; i++) {
		prop = path[ i ]
		obj = obj[ prop ]
	}

	obj[ path[ i ] ] = value
}


/**
 * Access the value for a nested property from an object given a path of properties.
 * @param obj The reciever object.
 * @param path An array of nested properties as strings.
 * @returns The value.
 */
const getNestedProperty = (obj: Record<string, any>, path: Array<string>) => {
	let i = 0
	let prop: any

	for (; i < path.length - 1; i++) {
		prop = path[ i ]
		obj = obj[ prop ]
	}

	return obj[ path[ i ] ]
}


export { setNestedProperty, getNestedProperty }