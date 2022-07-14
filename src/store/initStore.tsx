/**
 *
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import { fetchGetReadyServer } from "features/settings/reducer";

export const initStore = (store: any) => {
    store.dispatch(fetchGetReadyServer());
};
