import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, useRoutes } from "react-router-dom";

import { store } from "./store";
import App from "./App";
import {
    AboutMe,
    Notes,
    NoteContent,
    NotesListWithFilter,
    HomePage,
} from "pages";

import reportWebVitals from "./reportWebVitals";

const rootElement = document.getElementById("root");

// Root outlet placed in src\components\Page\Main\index.tsx
const SiteMap = [
    { path: "/", element: <HomePage /> },
    { path: "aboutme", element: <AboutMe /> },
    {
        path: "notes",
        element: <Notes />,
        children: [
            {
                index: true,
                element: <NotesListWithFilter />,
            },
            {
                path: ":noteSlug",
                element: <NoteContent />,
            },
        ],
    },
];

const Routes = () => {
    let routes = useRoutes([
        {
            path: "/",
            element: <App />,
            children: [...SiteMap],
        },
    ]);
    return routes;
};

let appReady = Promise.resolve();
if (process.env.NODE_ENV === "development") {
    const { worker } = require("./mocks/browser");
    appReady = worker.start({
        serviceWorker: {
            url: "/mockServiceWorker.js",
        },
    });
}
appReady.then(() => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Provider>,
        rootElement
    );
});

reportWebVitals();