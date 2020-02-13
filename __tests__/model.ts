import { Model, QueryBuilder } from "../src";
import MockFirebase from 'mock-cloud-firebase'

const fixtureData = {
    __collection__: {
        test: {
            __doc__: {
                test: {
                    age: 15,
                    username: 'user_a',
                }
            }
        }
    }
};

const firebase = new MockFirebase(fixtureData);
test('Model.construct', () => {
    class Test extends Model {
        public collection = firebase.firestore().collection('test')
    }
    expect(new Test()).toBeInstanceOf(Model)
})

test('Model.builder', () => {
    class Test extends Model {
        public collection = firebase.firestore().collection('test')
    }
    expect(Test.builder()).toBeInstanceOf(QueryBuilder)
})

test('Model.find', async () => {
    class Test extends Model {
        public collection = firebase.firestore().collection('test')
    }
    expect(await Test.find('test')).toBeInstanceOf(Test)
})