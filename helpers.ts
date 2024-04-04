export function getNumberFromObjectKey(object: any , key: string): number {
    return object[key.toLowerCase() as keyof typeof object];
}