import { Outlet } from "react-router-dom";
import React from "react";
import { ContextNotes } from "./ContextNotes";
import { AnimateItem, scrollTo } from "components/Tools";

export const Notes = () => {
    const [currentHeader, setCurrentHeader] = React.useState(-1);
    React.useEffect(() => {
        document.title = "Notes";
        scrollTo(0);
    }, []);
    const refHeaders = React.useRef<any[]>([]);
    return (
        <AnimateItem>
            <ContextNotes.Provider
                value={{
                    currentHeader,
                    refHeaders,
                    setCurrentHeader
                }}
            >
                <Outlet />
            </ContextNotes.Provider>
        </AnimateItem>
    );
};
