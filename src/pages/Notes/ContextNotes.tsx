import React from "react";
export const ContextNotes = React.createContext({
    currentHeader: -1,
    refHeaders: {},
    setCurrentHeader: (value: any) => value,
} as any);
