import { useEffect, useState, useCallback } from 'react'
import { Model } from './model'
import { QueryBuilder } from './query-builder'

export function useQuery<T extends Model>(q: QueryBuilder<T>): T[] | undefined {
    const [list, changeList] = useState<T[]>()

    useEffect(() => q.subscribe(changeList), [q.hash()])

    return list
}

export function useQueryChanges<T extends Model>(q: QueryBuilder<T>): [T[], Map<string, string>] | undefined {
    const [list, changeList] = useState<[T[], Map<string, string>]>()
    const change = useCallback((list: T[], changes: Map<string, string>) => {
        changeList([list, changes])
    }, [changeList])

    useEffect(() => q.subscribe(change), [q.hash()])

    return list
}
