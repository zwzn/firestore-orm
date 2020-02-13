import { useEffect, useState } from 'react'
import { Model } from './model'
import { QueryBuilder } from './query-builder'

export function useQuery<T extends Model>(q: QueryBuilder<T>): T[] | undefined {
    const [list, changeList] = useState<T[]>()

    useEffect(() => q.subscribe(changeList), [q.hash()])

    return list
}
