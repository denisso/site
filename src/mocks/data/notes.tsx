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
    image: {
        src: string;
        alt: string;
    };
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
        image: {
            src: "https://community-cdn-digitalocean-com.global.ssl.fastly.net/FoqMLpAxDfEr9YeRNaDmJTaE",
            alt: "",
        },
        createdAt: 0,
    },
    {
        id: 0,
        slug: "",
        title: "The S.O.L.I.D Principles in Pictures",
        excerpt: "",
        content: "",
        image: {
            src: "https://miro.medium.com/max/875/1*wrxj0oBKpA_GXb8LPhXOeg.png",
            alt: "",
        },
        createdAt: 0,
    },
    {
        id: 0,
        slug: "",
        title: "Flux In-Depth",
        excerpt: "",
        content: "",
        image: {
            src: "https://www.codeproject.com/KB/scripting/1179395/flux-architecture.jpg",
            alt: "",
        },
        createdAt: 0,
    },
    {
        id: 0,
        slug: "",
        title: "How JavaScript works: Service Workers, their lifecycle and use cases",
        excerpt: "",
        content: "",
        image: {
            src: "https://www.codeproject.com/KB/scripting/1179395/flux-architecture.jpg",
            alt: "",
        },
        createdAt: 0,
    },
    {
        id: 0,
        slug: "",
        title: "How JavaScript works: an overview of the engine, the runtime, and the call stack",
        excerpt: "",
        content: "",
        image: {
            src: "https://www.codeproject.com/KB/scripting/1179395/flux-architecture.jpg",
            alt: "",
        },
        createdAt: 0,
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
            e.createdAt = Date.now();
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
