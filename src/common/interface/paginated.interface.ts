export interface PaginatedI<T> {
    data: T[],
    meta: {
        page: number,
        total: number
    }
}