// http://docs.spring.io/spring-data/commons/docs/current/org/springframework/data/domain/Pageable.html
export class PaginationPropertySort {
    direction: string;
    property: string;
}

export interface SpringSort {
    sorted?: boolean;
    unsorted?: boolean;
}

export interface PaginationPage<T> {
    content?: Array<T>;
    last?: boolean;
    first?: boolean;
    number: number;
    size: number;
    totalPages?: number;
    itemsPerPage?: number;
    // sort?: Array<PaginationPropertySort>;
    sort?: SpringSort;
}
