export const data = [
    {
        component: "Hero",
        Photo: "/asset/Face.jpg",
        Name: "Denis",
        Role: "React web programmer",
        SkillsMain: [
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
    {
        component: "EcoSystem",
        type: "type0",
        ecosystem: [
            {
                name: "State Management",
                desc: "",
                libs: [
                    {
                        name: "Redux",
                        desc: 'Redux is a pattern and library for managing and updating application state, using events called "actions". It serves as a centralized store for state that needs to be used across your entire application, with rules ensuring that the state can only be updated in a predictable fashion.',
                        link: "https://redux.js.org/",
                        badgets: [""],
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
        ],
    },
    {
        name: "Languages",
        type: "type1",
        list: [
            {
                name: "Russian",
                props: [
                    {
                        name: "read",
                        value: 10,
                    },
                    {
                        name: "write",
                        value: 10,
                    },
                    {
                        name: "listen",
                        value: 10,
                    },
                    {
                        name: "speach",
                        value: 10,
                    },
                ],
            },
            {
                name: "English",
                props: [
                    {
                        name: "read",
                        value: 8,
                    },
                    {
                        name: "write",
                        value: 7,
                    },
                    {
                        name: "listen",
                        value: 6,
                    },
                    {
                        name: "speach",
                        value: 5,
                    },
                ],
            },
        ],
    },
    { component: "Achevements", type: "type2",  },
];
