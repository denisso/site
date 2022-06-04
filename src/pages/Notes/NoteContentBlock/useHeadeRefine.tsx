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
                let indx = arrayHeaders.indexOf(entry.target);
                if (indx === -1) return;
                if (entry.isIntersecting) {
                    // appear below or above
                    // above
                    if (indx < indxTop) {
                        indxTop = indx;
                        indxTopLastOutside = indx - 1;
                    }

                    // below
                    if (indx > indxTop && indxTopLastOutside === indxTop) {
                        indxTop = indx;
                        if (indx > indxBottom) {
                            indxBottom = indx;
                        }
                    }
                    if (indx > indxBottom) indxBottom = indx;
                } else if (entry.boundingClientRect.top > 0) {
                    // leave below && scroll up
                    switch (true) {
                        case indx === 0:
                            indxTop = indxBottom = 0;
                            break;
                        case indx === indxTop:
                            indxTop = indxBottom = indx - 1;
                            break;
                        case indx === indxBottom:
                            indxBottom = indx - 1;
                            break;
                        default:
                    }
                } else {
                    // leave above && scroll bottom
                    indxTopLastOutside = indx;
                    switch (true) {
                        case indx === arrayHeaders.length - 1:
                            indxTop = indxBottom = indx;
                            break;

                        case indx === indxTop && indx < indxBottom:
                            indxTop = indx + 1;
                            break;
                        case indx > indxTop && indx === indxBottom:
                            indxTop = indx;
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
