import React from "react";
export const ContextNotes = React.createContext({
    currentHeader: -1,
    refHeaders: {},
    setCurrentHeader: (value: any) => value,
    addNodes: ({ node, trigger }: { node: any; trigger: ({}) => any }): any => {},
    removeNodes: (value: any) => value,
} as any);
