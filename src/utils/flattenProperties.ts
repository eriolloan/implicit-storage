// Declare a flatten function that takes
// object as parameter and returns the
// flatten object
const flattenProperties = (source: Record<any, any>, prefixProperty: string | undefined = undefined) => {

	// The object which contains the
	// final result
	let result: Record<string, any> = {}

	// loop through the object "ob"
	for (const key in source) {



		// We check the type of the key using
		// typeof() function and recursively
		// call the function again
		if ((typeof source[ key ]) === 'object' && !Array.isArray(source[ key ])) {
			const temp = flattenProperties(source[ key ], key)

			for (const subKey in temp) {
				const flatKey = prefixProperty ?
					prefixProperty + '.' + subKey
					: subKey

				result[ flatKey ] = temp[ subKey ]
			}
		}

		// Else store source[i] in result directly
		else {
			const flatKey = prefixProperty ?
				prefixProperty + '.' + key
				: key

			result[ flatKey ] = source[ key ]
		}
	}

	return result
}

export { flattenProperties }