import uniqid from "uniqid";

export const uid = (...args: any) => {
    return uniqid(...args);
};
