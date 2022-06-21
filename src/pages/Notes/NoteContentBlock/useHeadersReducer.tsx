import React from "react";

const changeCurrentHeader = (state: any, action: any, localData: any) => {
    if (action.type === "ready") {
        localData.countHeaders = action.payload.countHeaders;
        return state;
    }
    let { indxTriggered, entity }: any = action.payload;
    if (indxTriggered === -1) return state;
    if (entity.isIntersecting) {
        // appear below or above
        // scroll top - node appears above
        if (indxTriggered < localData.indxTop) {
            localData.indxTop = indxTriggered;
            localData.indxTopLastOutside = indxTriggered - 1;
        }

        // scroll bottom - node appears below
        if (
            indxTriggered > localData.indxTop &&
            localData.indxTopLastOutside === localData.indxTop
        ) {
            localData.indxTop = indxTriggered;
            if (indxTriggered > localData.indxBottom) {
                localData.indxBottom = indxTriggered;
            }
        }
        if (indxTriggered > localData.indxBottom)
            localData.indxBottom = indxTriggered;
        // scroll top - node leave at the bottom border top < bottom && (top > 0 && bottom > 0)
        // for example: isIntersecting false top: 744.796875 bottom: 1511.203125
    } else if (entity.boundingClientRect.top > 0) {
        // leave below && scroll up
        switch (true) {
            case indxTriggered === 0:
                localData.indxTop = localData.indxBottom = 0;
                break;
            case indxTriggered === localData.indxTop:
                localData.indxTop = localData.indxBottom = indxTriggered - 1;
                break;
            case indxTriggered === localData.indxBottom:
                localData.indxBottom = indxTriggered - 1;
                break;
            default:
        }
        // scroll bottom - node leave at the top border top < bottom && (top < 0 (off-screen top) && bottom > 0)
        // for example: isIntersecting false top: -692.8125 bottom: 73.609375
    } else {
        // leave above && scroll bottom
        localData.indxTopLastOutside = indxTriggered;
        switch (true) {
            case indxTriggered === localData.countHeaders - 1:
                localData.indxTop = localData.indxBottom = indxTriggered;
                break;

            case indxTriggered === localData.indxTop &&
                indxTriggered < localData.indxBottom:
                localData.indxTop = indxTriggered + 1;
                break;
            case indxTriggered > localData.indxTop &&
                indxTriggered === localData.indxBottom:
                localData.indxTop = indxTriggered;
                break;
            default:
        }
    }
    let stateNew = state;
    if (localData.indxTop !== localData.indxTopPrev) {
        stateNew = { value: localData.indxTop };
        localData.indxTopPrev = localData.indxTop;
    }
    return stateNew;
};

const reducer = (() => {
    const localData = {
        indxTop: 0,
        indxBottom: 0,
        indxTopLastOutsid: -1,
        indxTopPrev: 0,
        countHeaders: 0,
    };
    return (state: any, action: any) => {
        return changeCurrentHeader(state, action, localData);
    };
})();

export const useHeadersReducer = () => {
    const [state, dispatch] = React.useReducer(reducer, { value: 0 });
    return { state, dispatch };
};
