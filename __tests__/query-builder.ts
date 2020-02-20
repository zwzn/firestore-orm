import { Model, QueryBuilder } from "../src";
import MockFirebase from 'mock-cloud-firestore'

const defaultFixtureData = {
    __collection__: {
        test: {
            __doc__: {
                test: {
                    foo: 'test',
                    bar: 1,
                    baz: { 'a': 1 },
                },
                test2: {
                    foo: 'test2',
                    bar: 1,
                    baz: { 'a': 1 },
                },
            },
        },
    },
}

let workingDB = clone(defaultFixtureData)

beforeEach(() => {
    workingDB = clone(defaultFixtureData)
});

function clone<T>(v: T): T {
    if (typeof v === 'object') {
        const objectCopy: any = {}
        for (const [key, value] of Object.entries(v)) {
            objectCopy[key] = clone(value)
        }
        return objectCopy
    }
    return v
}

class Test extends Model {
    public collection = (new MockFirebase(workingDB)).firestore().collection('test')

    @Model.field()
    foo: string = ''

    @Model.field()
    bar: string = ''

    @Model.field()
    baz: { a: number } = { a: 0 }
}


test('get', () => {
    Test.builder().get()
})

