import React from "react";
export const ContextNotes = React.createContext({
    currentHeader: 0,
    setCurrentHeader: (value: any) => value
});
