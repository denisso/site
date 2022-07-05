/**
 * 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import { fetchGetReady } from "features/settings/reducer";

export const initStore = (store:any) => {
    store.dispatch(fetchGetReady())
}