# Implicit Storage
A local storage library with a dead-simple syntax (set values with property assignments). It is powered by [localforage](https://localforage.github.io/localForage/).

`implicit-storage` exposes a proxied object you can modify with direct property assignments (e.g. `store.item = 'foo'`). Object calls are trapped so that localforage can apply changes to the browser storage backend.

## Usage
Create a store :
```
import {createImplicitStorage} from 'ImplicitStorage.js'

const store = createImplicitStorage(<storeName>)
```

Use it as you would a simple object :
```
store.item = { one : true, two : false}
// stores locally "item.one" = true and "item.two" = false

console.log(store.item.one)
// true
```

It supports nesting :
```
store.item = { one : { sub : 'nested' } }
// stores locally "item.one.sub" = 'nested'

console.log(store.item.one.nested)
// 'nested'
```
