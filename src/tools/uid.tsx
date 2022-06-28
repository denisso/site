/**
 * 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import uniqid from "uniqid";

export const uid = (...args: any) => {
    return uniqid(...args);
};
