/**
 * 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
export type PagesContextType = {
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
} as PagesContextType);
