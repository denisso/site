import { Outlet } from "react-router-dom";
import React from "react";
import { ContextNotes } from "./ContextNotes";
import { AnimateItem, scrollTo } from "components/Tools";
import { useIntersection } from "components/Tools/IntersectionOserver";

export const Notes = () => {
    const [currentHeader, setCurrentHeader] = React.useState(-1);
    const { addNodes, removeNodes } = useIntersection();
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
                    setCurrentHeader,
                    addNodes,
                    removeNodes,
                }}
            >
                <Outlet />
            </ContextNotes.Provider>
        </AnimateItem>
    );
};
