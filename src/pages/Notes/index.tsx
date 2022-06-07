import { Outlet } from "react-router-dom";
import React from "react";
import { ContextNotes } from "./ContextNotes";
import { AnimateItem, scrollTo } from "components/Tools";

export const Notes = () => {
    const [currentHeader, setCurrentHeader] = React.useState(0);

    React.useEffect(() => {
        document.title = "Notes";
        scrollTo(0);
    }, []);

    return (
        <AnimateItem>
            <ContextNotes.Provider
                value={{
                    currentHeader,
                    setCurrentHeader,
                }}
            >
                <Outlet />
            </ContextNotes.Provider>
        </AnimateItem>
    );
};
