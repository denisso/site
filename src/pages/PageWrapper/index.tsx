import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Main } from "./Main";
import { useIntersection } from "components/Tools/IntersectionOserver";
import { PagesContext } from "./PagesContext";
import { contextType } from "./PagesContext";
export const WrapperComponents = () => {
    const { ready, addNodes, removeNodes } = useIntersection();

    const context = React.useRef<contextType>({
        intersect: { ready, addNodes, removeNodes },
    });
    context.current = { intersect: { ready, addNodes, removeNodes } };
    return (
        <PagesContext.Provider value={context.current}>
            <Header />
            <Main />
            <Footer />
        </PagesContext.Provider>
    );
};
