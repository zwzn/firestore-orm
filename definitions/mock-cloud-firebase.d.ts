declare module 'mock-cloud-firebase' {
    export interface FixtureData {
        __collection__: {
            [name: string]: Collection
        }
    }

    export interface Collection {
        __doc__: {
            [id: string]: Document
        }
    }

    export interface Document {
        [key: string]: unknown
        __collection__?: {
            [name: string]: Collection
        }
    }

    const MockFirebase: {
        new(fixtureData: FixtureData): {
            firestore: () => firebase.firestore.Firestore
        }
    }
    export default MockFirebase
}