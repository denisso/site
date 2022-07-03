/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

export const aboutme: any = [
    {
        type: "Hero",
        name: "Hero Block",
        hero: {
            photo: {
                src: "/asset/Face.jpg",
                height: 1080,
                width: 1080,
                alt: "hero of this site",
            },
            name: "Denis",
            role: "React Web Developer",
            skills: [
                "Javasciprts & Typescript",
                "Programming Patterns",
                "HTML & Markdown",
                "CSS & SCSS",
                "SQL",
                "Web API",
                "NodeJS",
                "React",
                "Redux",
                "Styled-components",
                "Framer Motion",
            ],
        },
    },
    {
        name: "Languages",
        type: "Scores",
        max: 10,
        children: [
            {
                name: "Russian",
                scores: [
                    {
                        name: "Read",
                        score: 10,
                    },
                    {
                        name: "Write",
                        score: 10,
                    },
                    {
                        name: "Listen",
                        score: 10,
                    },
                    {
                        name: "Speach",
                        score: 10,
                    },
                ],
            },
            {
                name: "English",
                scores: [
                    {
                        name: "Read",
                        score: 8,
                    },
                    {
                        name: "Write",
                        score: 7,
                    },
                    {
                        name: "Listen",
                        score: 6,
                    },
                    {
                        name: "Speach",
                        score: 5,
                    },
                ],
            },
        ],
    },
    {
        name: "React EcoSystem",
        type: "Section",
        children: [
            {
                name: "Redux",
                category: "State Management",
                desc: 'Redux is a pattern and library for managing and updating application state, using events called "actions". It serves as a centralized store for state that needs to be used across your entire application, with rules ensuring that the state can only be updated in a predictable fashion.',
                links: [
                    { name: "Main site", link: "https://redux.js.org/" },
                    {
                        name: "Redux Toolkit",
                        link: "https://redux-toolkit.js.org/",
                    },
                ],
                badgets: [
                    "Actions",
                    "Reducers",
                    "Store",
                    "Selectors",
                    "EntityAdapter",
                    "Query API",
                ],
                sandboxes: [
                    {
                        name: "Redux",
                        link: "https://codesandbox.io/s/redux-21hrj",
                    },
                    {
                        name: "React Redux",
                        link: "https://codesandbox.io/s/react-redux-s084g",
                    },
                    {
                        name: "React Redux Toolkit",
                        link: "https://codesandbox.io/s/react-redux-toolkit-iq1zp",
                    },
                    {
                        name: "React Redux Toolkit extraReducer",
                        link: "https://codesandbox.io/s/react-redux-toolkit-extrareducers-j17tb",
                    },
                ],
            },
            {
                name: "Router",
                category: "Routing",
                desc: "React Router is a fully-featured client and server-side routing library for Rent, a JavaScript library for building user interfaces. React Router run anywhere React run; on the web, on the server with node.js, and on React Native.",
                links: [
                    { name: "Main site", link: "https://reactrouter.com/" },
                ],
                badgets: [
                    "Router",
                    "BrowserRouter",
                    "HashRouter",
                    "HistoryRouter",
                    "MemoryRouter",
                    "NativeRouter",
                ],
                sandboxes: [
                    {
                        name: "Basic example",
                        link: "https://github.com/denisso/Example-Bookeeper-React-router",
                    },
                    {
                        name: "Router + Framer Motion",
                        link: "https://codesandbox.io/s/outlet-framer-motion-animation-07bu0b",
                    },
                ],
            },
        ],
    },
    {
        name: "React EcoSystem",
        type: "Section",
        children: [
            {
                name: "Styled-components",
                category: "Style",
                desc: "styled-components is the result of wondering how we could enhance CSS for styling React component systems. By focusing on a single use case we managed to optimize the experience for developers as well as the output for end users.",
                links: [
                    {
                        name: "Main site",
                        link: "https://styled-components.com/",
                    },
                ],
                badgets: [
                    "Automatic critical CSS",
                    "No class name bugs",
                    "Easier deletion of CSS",
                    "Simple dynamic styling",
                    "Painless maintenance",
                    "Automatic vendor prefixing",
                ],
                sandboxes: [
                    {
                        name: "Redux + Styled-components theme switch",
                        link: "https://codesandbox.io/s/react-thm-swtchr-l30rs",
                    },
                ],
            },
            {
                name: "Framer Motion",
                category: "Motion",
                desc: "Motion is a production-ready motion library for Rent from Framer. It brings declarative animations, effortless layout transitions and gestures while maintaining HTML and SVG semantics.",
                links: [{ name: "Main site", link: "https://www.framer.com/" }],
                badgets: [
                    "Animation",
                    "Transition",
                    "Gestures",
                    "AnimatePresence",
                    "LayoutGroup",
                    "LazyMotion",
                ],
                sandboxes: [
                    {
                        name: "Side menu",
                        link: "https://codesandbox.io/s/framer-motion-side-menu-forked-m3j5dw",
                    },
                    {
                        name: "Router + Framer Motion",
                        link: "https://codesandbox.io/s/outlet-framer-motion-animation-07bu0b",
                    },
                ],
            },
        ],
    },
];
