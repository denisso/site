import { apiQueryAccounts } from "features/accounts/apiQuery"

export const initStore = (store:any) => {
    store.dispatch(apiQueryAccounts.endpoints.getUsers.initiate())
}