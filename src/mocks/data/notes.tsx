/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import noteLink001 from "./notes/note001.md";
import noteLink002 from "./notes/note002.md";
import noteLink003 from "./notes/note003.md";
import noteLink004 from "./notes/note004.md";
import noteLink005 from "./notes/note005.md";

const links = [noteLink001, noteLink002, noteLink003, noteLink004, noteLink005];

import { createSlug } from "tools/createSlug";

export type NoteDataType = {
    id: number;
    slug: string;
    title: string;
    icon: string;
    image: {
        src: string;
        alt: string;
    };
    author: {
        name: string;
        ref: string;
    }
    original?: {
        name: string;
        ref: string;
    }
    excerpt: string;
    content: string;
    createdAt: number;
    numComments?: number; // get this number from comments when note will be requested
};

const notes: NoteDataType[] = [
    {
        id: 0,
        slug: "",
        title: "An Introduction to Document-Oriented Databases",
        excerpt: "",
        content: "",
        icon: "/asset/notes/note001_icon.png",
        image: {
            src: "/asset/notes/note001.png",
            alt: "",
        },
        author: {
            name: "Mateusz Papiernik",
            ref: "https://www.digitalocean.com/community/users/mati",
        },
        original: {
            name: "digitalocean.com",
            ref: "https://www.digitalocean.com/community/conceptual_articles/an-introduction-to-document-oriented-databases",
        },
        createdAt: Number(new Date(2021, 6, 20, 0, 0, 0, 0)),
    },
    {
        id: 0,
        slug: "",
        title: "The S.O.L.I.D Principles in Pictures",
        excerpt: "",
        content: "",
        icon: "/asset/notes/note002_icon.png",
        image: {
            src: "/asset/notes/note002.png",
            alt: "",
        },
        author: {
            name: "Ugonna Thelma",
            ref: "https://medium.com/@ugonnat",
        },
        original: {
            name: "medium.com",
            ref: "https://medium.com/backticks-tildes/the-s-o-l-i-d-principles-in-pictures-b34ce2f1e898",
        },
        createdAt: Number(new Date(2020, 4, 18, 0, 0, 0, 0)),
    },
    {
        id: 0,
        slug: "",
        title: "Flux In-Depth",
        excerpt: "",
        content: "",
        icon: "/asset/notes/note003_icon.png",
        image: {
            src: "/asset/notes/note003.png",
            alt: "",
        },
        author: {
            name: "Yangshun Tay",
            ref: "https://yangshuntay.com/",
        },
        original: {
            name: "facebook.github.io",
            ref: "https://facebook.github.io/flux/docs/in-depth-overview",
        },
        createdAt: Number(new Date(2022, 2, 6, 0, 0, 0, 0)),
    },
    {
        id: 0,
        slug: "",
        title: "How JavaScript works: Service Workers, their lifecycle and use cases",
        excerpt: "",
        content: "",
        icon: "/asset/notes/note004_icon.png",
        image: {
            src: "/asset/notes/note004.png",
            alt: "",
        },
        author: {
            name: "Alexander Zlatkov",
            ref: "https://medium.com/@zlatkov",
        },
        original: {
            name: "blog.sessionstack.com",
            ref: "https://blog.sessionstack.com/how-javascript-works-service-workers-their-life-cycle-and-use-cases-52b19ad98b58",
        },
        createdAt: Number(new Date(2017, 7, 10, 0, 0, 0, 0)),
    },
    {
        id: 0,
        slug: "",
        title: "How JavaScript works: an overview of the engine, the runtime, and the call stack",
        excerpt: "",
        content: "",
        icon: "/asset/notes/note005_icon.png",
        image: {
            src: "/asset/notes/note005.png",
            alt: "",
        },
        author: {
            name: "Alexander Zlatkov",
            ref: "https://medium.com/@zlatkov",
        },
        original: {
            name: "blog.sessionstack.com",
            ref: "https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf",
        },
        createdAt: Number(new Date(2022, 1, 5, 0, 0, 0, 0)),
    },
];

export const NotesModule = ((notes) => {
    const _notes = Array.from(notes);
    let _ready = false
    const _load = async () => {
        for (let i = 0; i < links.length; i++) {
            const response = await fetch(links[i]);
            const text = await response.text();
            _notes[i].content = text;
        }
        const notesLength = _notes.length;
        for (let i = 1; i < 20; i++) {
            _notes.push({ ..._notes[i % notesLength] });
        }
        _notes.forEach((e, i) => {
            e.id = i;
            e.slug = `${createSlug(e.title)}-${i}`;
        });
        _ready = true
    };
    _load();
    const getReady = () => _ready
    const data = () => {
        return _notes;
    };
    return { data, getReady };
})(notes);
