import ShortUniqueId from "short-unique-id";

export const createUid = (): string => {
    const uid: ShortUniqueId = new ShortUniqueId({
        length: 28
    });
    return uid()
}