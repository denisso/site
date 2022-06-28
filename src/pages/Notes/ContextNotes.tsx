/**
 * 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
export const ContextNotes = React.createContext({
    currentHeader: -1,
    refHeaders: {},
    setCurrentHeader: (value: any) => value,
} as any);
