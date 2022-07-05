/**
 * 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

export const fetchWrapper = (url: string, options: any = {}) => {
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then((response) => response.json())
            .then((json) => resolve(json))
            .catch((err) => reject(err));
    });
};