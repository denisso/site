import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Main } from "./Main";
import { ContextPageWrapper } from "./ContextpageWrapper";

export { ContextPageWrapper } from "./ContextpageWrapper";

export const WrapperComponents = () => {
    const context = {};
    return (
        <ContextPageWrapper.Provider value={context}>
            <Header />
            <Main />
            <Footer />
        </ContextPageWrapper.Provider>
    );
};
