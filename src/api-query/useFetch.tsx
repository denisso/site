/**
 * For queries without cache
 */

import React from "react";

function dataReducer(state: any, action: any) {
    switch (action.type) {
        case "loading":
            return { ...state, loading: true };
        case "response":
            return { ...state, loading: false, data: action.data };
        case "error":
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
}

export const useFetch = (url: any, options = {}) => {
    const [{ loading, error, data }, dispatch] = React.useReducer(dataReducer, {
        data: null,
        loading: false,
        error: null,
    });

    const serializedOptions = JSON.stringify(options);

    React.useEffect(() => {
        dispatch({ type: "loading" });

        fetch(url, JSON.parse(serializedOptions))
            .then((res) => {
                return res.text();
            })
            .then((data) => dispatch({ type: "response", data }))
            .catch((error) => dispatch({ type: "error", error }));
    }, [url, serializedOptions]);

    return { loading, error, data };
};
