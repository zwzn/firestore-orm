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


test('Model.construct', () => {
    expect(new Test()).toBeInstanceOf(Model)
})

test('Model.builder', () => {
    expect(Test.builder()).toBeInstanceOf(QueryBuilder)
})

test('Model.find', async () => {
    const t = await Test.find('test')
    expect(t).toBeInstanceOf(Test)
    expect(t!.foo).toBe('test')
})

test('create', async () => {
    const t = new Test()
    t.foo = 'create'
    expect(t.id).toBe(undefined)
    await t.save()
    expect(t.id).not.toBe(undefined)
})

test('modify', async () => {
    const t = (await Test.find('test'))!

    expect(t.foo).not.toBe('modify')
    t.foo = 'modify'
    await t.save()
    expect((await Test.find('test'))!.foo).toBe('modify')
})

test('query', async () => {
    const t = (await Test.builder().where('foo', '==', 'test').get())!

    expect(t.length).toBe(1)
    expect(t[0]).toBeInstanceOf(Test)
})

test('delete', async () => {
    const t = (await Test.find('test'))!

    expect(t).not.toBe(null)
    await t.delete()
    expect(await Test.find('test')).toBe(null)
})