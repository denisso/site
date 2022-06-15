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
        ready: boolean;
    };
};
export const PagesContext = React.createContext({
    intersect: {
        addNodes: (arg) => {},
        removeNodes: (arg) => {},
        ready: false,
    },
} as contextType);
