# Firestore ORM

Firestore ORM is a class based orm on top of Google Cloud Firestore inspired by
Laravel's Eloquent ORM.

## Basic Example

``` ts
import { Model } from '@zwzn/firestore-orm'
import firebase from 'firebase/app'

class Foo extends Model {
    collection = firebase.firestore().collection('foo')

    @Model.field()
    bar: string = ''
}

const f1 = new Foo()
f1.bar = 'baz'

console.log(f1.toJSON()) // { id: undefined, bar: 'baz' }
await f1.save()
console.log(f1.toJSON()) // { id: <random id>, bar: 'baz' }

const f2 = await Foo.find(f.id)
console.log(f2.toJSON()) // { id: <random id>, bar: 'baz' }
```
