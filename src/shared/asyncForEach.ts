/* eslint-disable @typescript-eslint/no-explicit-any */
export const asyncForEach = async <T>(array: T[], callback: any) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};
