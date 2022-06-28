/**
 * @description 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

export const data: any = [
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
                "HTML & Markdown",
                "CSS & SCSS",
                "Web API",
                "NodeJS",
                "React",
                "Redux",
                "Styled-components",
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
                    { name: "Redux", link: "https://redux.js.org/" },
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
        ],
    },
    {
        name: "React Styled-components",
        type: "Section",
        children: [
            {
                name: "Redux",
                category: "State Management",
                desc: 'Redux is a pattern and library for managing and updating application state, using events called "actions". It serves as a centralized store for state that needs to be used across your entire application, with rules ensuring that the state can only be updated in a predictable fashion.',
                links: [
                    { name: "Redux", link: "https://redux.js.org/" },
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
        ],
    },
    {
        name: "React router",
        type: "Section",
        children: [
            {
                name: "Redux",
                category: "State Management",
                desc: 'Redux is a pattern and library for managing and updating application state, using events called "actions". It serves as a centralized store for state that needs to be used across your entire application, with rules ensuring that the state can only be updated in a predictable fashion.',
                links: [
                    { name: "Redux", link: "https://redux.js.org/" },
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
        ],
    },
];
