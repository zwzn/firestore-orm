/// <reference lib="dom" />
import * as firebase from 'firebase'
import { StaticModel, Model } from './model'

export class QueryBuilder<T extends Model> {

    constructor(
        private readonly staticModel: StaticModel<T>,
        private readonly query: firebase.firestore.Query,
        private readonly key: string = '',
    ) { }

    public where<K extends keyof T & string>(
        fieldPath: K,
        opStr: firebase.firestore.WhereFilterOp,
        value: T[K],
    ): QueryBuilder<T> {
        return new QueryBuilder(
            this.staticModel,
            this.query.where(fieldPath, opStr, value),
            this.key + ' where' + JSON.stringify(fieldPath) + opStr + JSON.stringify(value)
        )
    }

    public orderBy(
        fieldPath: keyof T & string,
        directionStr: firebase.firestore.OrderByDirection = 'asc',
    ): QueryBuilder<T> {
        return new QueryBuilder(
            this.staticModel,
            this.query.orderBy(fieldPath, directionStr),
            this.key + ' orderBy' + JSON.stringify(fieldPath) + directionStr
        )
    }
    public limit(limit: number): QueryBuilder<T> {
        return new QueryBuilder(
            this.staticModel,
            this.query.limit(limit),
            this.key + ' limit' + limit
        )
    }

    public async get(): Promise<T[]> {
        const ref = await this.query.get()

        return ref.docs.map(doc => this.staticModel.fromDoc(doc))
    }

    public subscribe(callback: (models: T[]) => void): () => void {
        return this.query.onSnapshot(ref => {
            callback(ref.docs.map(doc => this.staticModel.fromDoc(doc)))
        })
    }

    public equal(q: QueryBuilder<T>): boolean {
        return this.query.isEqual(q.query)
    }

    public hash(): string {
        return this.key
    }
}