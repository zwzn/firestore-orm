declare module 'mock-cloud-firestore' {
    namespace MockFirebase {

        interface FixtureData {
            __collection__: {
                [name: string]: Collection
            }
        }

        interface Collection {
            __doc__: {
                [id: string]: Document
            }
        }

        interface Document {
            [key: string]: unknown
            __collection__?: {
                [name: string]: Collection
            }
        }
    }
    const MockFirebase: {
        new(fixtureData: MockFirebase.FixtureData): {
            firestore: () => firebase.firestore.Firestore
        }
    }
    export = MockFirebase
}