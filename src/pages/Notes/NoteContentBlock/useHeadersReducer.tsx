/**
 *
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";

const changeCurrentHeader = (state: any, action: any, localData: any) => {
    if (action.type === "ready") {
        localData.headers = action.payload.headers.current;
        return state;
    }
    let { indxTriggered, entity }: any = action.payload;

    if (entity.isIntersecting) {
        // appear
        if (entity.boundingClientRect.top < 0) {
            // from above && scroll to up
            localData.indxTop = indxTriggered;
        } else {
            // from belove && scroll to bottom
            if (
                localData.headers[localData.indxTop].getBoundingClientRect()
                    .bottom < 0
            ) {
                // if top header outside viewport set active next header
                localData.indxTop = localData.indxTop + 1;
            }
        }
    } else {
        // leave
        if (entity.boundingClientRect.top > 0) {
            // leave below && scroll to up
            const indxPrevHeader =
                localData.indxTop - 1 >= 0
                    ? localData.indxTop - 1
                    : localData.indxTop;
            if (
                localData.headers[indxPrevHeader].getBoundingClientRect().top >
                0
            ) {
                console.log("leave below && scroll to up", indxPrevHeader)
                localData.indxTop = indxPrevHeader;
            }
        } else {
            // leave above && scroll to bottom
            const indxNeaxtHeader =
                localData.indxTop + 1 < localData.headers.length
                    ? localData.indxTop + 1
                    : localData.indxTop;
            if (
                localData.headers[indxNeaxtHeader].getBoundingClientRect().top <
                document.documentElement.clientHeight
            ) {
                // if  next header not outside viewport set active nex header
                localData.indxTop = indxNeaxtHeader;
            }
        }
    }

    let stateNew = { value: localData.indxTop };

    return stateNew;
};

const reducer = (() => {
    const localData = {
        headers: [],
        indxTop: 0,
    };
    return (state: any, action: any) => {
        return changeCurrentHeader(state, action, localData);
    };
})();

export const useHeadersReducer = () => {
    const [state, dispatch] = React.useReducer(reducer, { value: 0 });
    return { state, dispatch };
};
