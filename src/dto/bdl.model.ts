export interface MainTopicsDto {
    totalRecords: number;
    page: number;
    pageSize: number;
    links: LinksDto;
    results: MainTopicResultDto[];
}

export interface LinksDto {
    first: string;
    self: string;
    next: string;
    last: string;
}

export interface MainTopicResultDto {
    id: string;
    name: string;
    hasVariables: boolean;
    children: string[];
    levels: number[];
}

