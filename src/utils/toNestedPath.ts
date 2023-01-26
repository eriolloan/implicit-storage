const toNestedPath = (arg: string | Array<string>) => {
	if (typeof arg === 'string') return [ arg ]
	if (Array.isArray(arg)) return arg
	return new TypeError("argument can't be coerced to a path, received:" + arg)
}

export { toNestedPath }