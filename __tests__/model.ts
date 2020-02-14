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
                }
            }
        }
    }
};

function TestFactory(fixtureData: MockFirebase.FixtureData = defaultFixtureData) {
    const firebase = new MockFirebase(fixtureData);
    return class extends Model {
        public collection = firebase.firestore().collection('test')

        @Model.field()
        foo: string = ''
    }
}

test('Model.construct', () => {
    const Test = TestFactory()
    expect(new Test()).toBeInstanceOf(Model)
})

test('Model.builder', () => {
    const Test = TestFactory()
    expect(Test.builder()).toBeInstanceOf(QueryBuilder)
})

test('Model.find', async () => {
    const Test = TestFactory()
    const t = await Test.find('test')
    expect(t).toBeInstanceOf(Test)
    expect(t!.foo).toBe('test')
})