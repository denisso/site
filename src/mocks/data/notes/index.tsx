import article001 from "../articles/article001.md";
import article002 from "../articles/article002.md";
import article003 from "../articles/article003.md";
import article004 from "../articles/article004.md";
import article005 from "../articles/article005.md";
import { createSlug } from "tools/createSlug";

 const articles = [
    {
        name: "An Introduction to Document-Oriented Databases",
        excerpt: "",
        content: article001,
        image: "https://community-cdn-digitalocean-com.global.ssl.fastly.net/FoqMLpAxDfEr9YeRNaDmJTaE"
    },
    {
        name: "The S.O.L.I.D Principles in Pictures",
        excerpt: "",
        content: article002,
        image: "https://miro.medium.com/max/875/1*wrxj0oBKpA_GXb8LPhXOeg.png"
    },
    {
        name: "Flux In-Depth",
        excerpt: "",
        content: article003,
        image: "https://www.codeproject.com/KB/scripting/1179395/flux-architecture.jpg"
    },
    {
        name: "How JavaScript works: Service Workers, their lifecycle and use cases",
        excerpt: "",
        content: article004,
        image: "https://www.codeproject.com/KB/scripting/1179395/flux-architecture.jpg"
    },
    {
        name: "How JavaScript works: an overview of the engine, the runtime, and the call stack",
        excerpt: "",
        content: article005,
        image: "https://www.codeproject.com/KB/scripting/1179395/flux-architecture.jpg"
    },
];
// articles.forEach(e=>e.slug = createSlug(e.name))
export {articles}