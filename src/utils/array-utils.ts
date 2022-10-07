export function propertiesToArray<T>(object: { [index: string]: T }): T[] {
    return Object.keys(object).map(key => object[key]);
}