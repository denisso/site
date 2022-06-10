import React from "react";
export type contextType = {
    intersect: {
        addNodes: ({
            node,
            trigger,
        }: {
            node: any;
            trigger: ({ entity, unobserve }: any) => void;
        }) => void;
        removeNodes: (value: any) => void;
    };
};
export const PagesContext = React.createContext({
    intersect: {
        addNodes: (arg) => {},
        removeNodes: (arg) => {},
    },
} as contextType);
