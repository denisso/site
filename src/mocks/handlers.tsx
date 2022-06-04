import { rest } from "msw";
import { notes, NoteDataType } from "./db-notes";
import { dataHomepage } from "./db-page-home";
import {
    comments,
    CommentsHandlerServer,
    CommentDataType,
    CommentsSlugType,
} from "./db-comments";
import { users, UsersType } from "./db-users";

let currentUserID: string | null | undefined = "guest";

export const handlers = [
    rest.get("/api/page/:slug", (req, res, ctx) => {
        const { slug } = req.params as { slug: string };
        switch (slug) {
            case "homepage":
                return res(ctx.json(dataHomepage), ctx.delay(400));
            case "aboutme":
                return res(ctx.json({}), ctx.delay(400));
        }
        return res(ctx.json({}), ctx.delay(400));
    }),
    // get all notea for NotesList, need use chache data
    rest.get("/api/notes", (req, res, ctx) => {
        const resData = notes.map(
            ({ id, excerpt, title, slug, image }: NoteDataType) => ({
                id,
                excerpt,
                title,
                image,
                slug,
                numComments: comments[slug] ? comments[slug].numComments : 0,
            })
        );
        return res(ctx.json(resData), ctx.delay(400));
    }),
    //
    rest.get("/api/notes/:noteslug", (req, res, ctx) => {
        const { noteslug } = req.params as { noteslug: string };
        const noteData: NoteDataType | undefined = notes.find(
            (e) => e.slug === noteslug
        );
        if (noteData === undefined)
            return res(ctx.json(noteData), ctx.delay(400));
        noteData.numComments = comments[noteData.slug]
            ? comments[noteData.slug].numComments
            : 0;
        return res(ctx.json(noteData), ctx.delay(400));
    }),
    rest.get("/api/comments/:noteslug", (req, res, ctx) => {
        // Get all comment by note slug
        const { noteslug }: { noteslug: string } = req.params as {
            noteslug: string;
        };
        const getComments = (
            commentsSlug: CommentsSlugType,
            users: UsersType
        ): CommentsSlugType => {
            if (commentsSlug === undefined)
                return { numComments: 0, comments: [] };
            const { comments } = commentsSlug;
            comments.forEach((e: any) => {
                const commentsChild = e.child || [];
                commentsChild.forEach((e: any) => {
                    e.picture = users[e.userid].picture;
                    e.name = users[e.userid].name;
                });
            });
            return commentsSlug;
        };
        let resBody: { error: boolean; payload?: CommentsSlugType } = {
            error: false,
        };
        try {
            resBody.payload = getComments(comments[noteslug], users);
        } catch (err: any) {
            resBody.error = err.message;
        }

        return res(ctx.json(resBody), ctx.delay(400));
    }),
    rest.post("/api/comments/:noteslug", (req: any, res, ctx) => {
        // CRUID operations of comments
        const { noteslug } = req.params as { noteslug: string };

        let resData: { error: any; payload?: any } = {
            error: false,
            payload: null,
        };

        try {
            const { type, payload }: { type: string; payload: any } =
                JSON.parse(req.body as string);
            resData = CommentsHandlerServer({
                comments,
                slug: noteslug,
                users,
                currentUserID,
            })[type](payload);
        } catch (err: any) {
            resData.error = err.message || true;
        }

        return res(ctx.json(resData), ctx.delay(400));
    }),
    rest.get("/api/users", (req, res, ctx) => {
        return res(ctx.json(users), ctx.delay(400));
    }),

    rest.post("/api/login", (req, res, ctx) => {
        try {
            const { id, email, name, picture }: any = JSON.parse(
                req.body as string
            );
            if(id === undefined) throw new Error("Server response: user id not defined.")
            currentUserID = id;
            
            users[id] = { email, name, picture };
        } catch (err: any) {
            return res(ctx.json({ error: err.message }));
        }

        return res(ctx.json({ error: false }));
    }),
];
