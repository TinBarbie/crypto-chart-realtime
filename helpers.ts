
export function getKey(object: any, key: string): number {
    return object[key as keyof typeof object];
}