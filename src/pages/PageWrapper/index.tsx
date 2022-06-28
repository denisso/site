/**
 * 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Main } from "./Main";
import { useIntersection } from "components/Tools/IntersectionOserver";
import { PagesContext } from "./PagesContext";
import { PagesContextType } from "./PagesContext";
export const WrapperComponents = () => {
    const { ready, addNodes, removeNodes } = useIntersection();

    const context = React.useRef<PagesContextType>({
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
