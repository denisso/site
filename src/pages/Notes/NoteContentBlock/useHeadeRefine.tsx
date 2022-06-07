import React from "react";

const actionChangeNumber = 0;

const initialState = {
    numberHeader: 0,
};

export const useRefineHeader = (refContainer: any) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const arrayHeaders = React.useMemo(() => {
        if (refContainer.current === null) return [];
        const NodeListOfElement: NodeListOf<Element> =
            refContainer.current.querySelectorAll(
                "h1 > a, h2 > a, h3 > a, h4 > a, h5 > a, h6 > a"
            );

        return Array.from(NodeListOfElement);
    }, [refContainer.current]);

    const refineHeader = React.useMemo(() => {
        if (refContainer.current === null) return (entries: any[]) => {};
        let indxTop = 0;
        let indxBottom = 0;
        let indxTopLastOutside = -1;
        let indxTopPrev = indxTop;
        return (entries: any[]) => {
            entries.forEach((entry) => {
                let indxTriggered = arrayHeaders.indexOf(entry.target);
                if (indxTriggered === -1) return;
                if (entry.isIntersecting) {
                    // appear below or above
                    // scroll top - node appears above 
                    if (indxTriggered < indxTop) {
                        indxTop = indxTriggered;
                        indxTopLastOutside = indxTriggered -1;
                    }

                    // scroll bottom - node appears below
                    if (indxTriggered > indxTop && indxTopLastOutside === indxTop) {
                        indxTop = indxTriggered;
                        if (indxTriggered > indxBottom) {
                            indxBottom = indxTriggered;
                        }
                    }
                    if (indxTriggered > indxBottom) indxBottom = indxTriggered;
                // scroll top - node leave at the bottom border top < bottom && (top > 0 && bottom > 0) 
                // for example: isIntersecting false top: 744.796875 bottom: 1511.203125
                } else if (entry.boundingClientRect.top > 0) {
                    // leave below && scroll up
                    switch (true) {
                        case indxTriggered === 0:
                            indxTop = indxBottom = 0;
                            break;
                        case indxTriggered === indxTop:
                            indxTop = indxBottom = indxTriggered - 1;
                            break;
                        case indxTriggered === indxBottom:
                            indxBottom = indxTriggered - 1;
                            break;
                        default:
                    }
                // scroll bottom - node leave at the top border top < bottom && (top < 0 (off-screen top) && bottom > 0) 
                // for example: isIntersecting false top: -692.8125 bottom: 73.609375
                } else {
                    // leave above && scroll bottom
                    indxTopLastOutside = indxTriggered;
                    switch (true) {
                        case indxTriggered === arrayHeaders.length - 1:
                            indxTop = indxBottom = indxTriggered;
                            break;

                        case indxTriggered === indxTop && indxTriggered < indxBottom:
                            indxTop = indxTriggered + 1;
                            break;
                        case indxTriggered > indxTop && indxTriggered === indxBottom:
                            indxTop = indxTriggered;
                            break;
                        default:
                    }
                }
            });
            if (indxTop !== indxTopPrev) {
                dispatch({ type: actionChangeNumber, payload: indxTop });
                indxTopPrev = indxTop;
            }
        };
    }, [dispatch, arrayHeaders]);

    return { numberHeader: state.numberHeader, arrayHeaders, refineHeader };
};

function reducer(state: any, action: any) {
    const newState = { ...state };
    switch (action.type) {
        case actionChangeNumber:
            newState.numberHeader = action.payload;
            break;
        default:
    }
    return newState;
}
