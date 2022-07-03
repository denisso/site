/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import styled from "styled-components";
import { CommentsRender } from "./Comments";
import { CommentDataType } from "mocks/data/notes-comments";
import { useCommentsHandler } from "./useCommentsHandler";
import { AnimateItem } from "components/Tools";
import { Spinner } from "components/Elements/Spinner";

import { Context } from "./Context";
import { ReplyButton } from "./CommentButtons";
import {
    ContentLoadingProblemNotFound,
    ContentLoadingProblemError,
} from "components/Elements/ContentLoadingProblem";
const Container = styled.div`
    margin-top: 2rem;
    .CommentsHeader {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        display: flex;
        & > * + * {
            margin-left: 1rem;
        }
    }
    & a {
        user-select: auto;
    }
    .Comments {
        margin-top: 1rem;
    }
`;

export const CommentsComponent = ({ noteSlug }: any) => {
    const {
        data,
        error,
        isLoading,
        dispatch,
    }: {
        data?: { numComments: number; comments: CommentDataType[] };
        error?: any;
        isLoading?: any;
        dispatch: any;
    } = useCommentsHandler(noteSlug);

    const [currentComment, setCurrentComment] = React.useState("");
    return (
        <Context.Provider
            value={{ dispatch, currentComment, setCurrentComment }}
        >
            <AnimateItem>
                {error ? (
                    <ContentLoadingProblemError />
                ) : isLoading ? (
                    <div>
                        <Spinner />
                    </div>
                ) : data !== undefined && data !== null ? (
                    <Container>
                        <div className="CommentsHeader">
                            <span>
                                Comments: {" { "}
                                {data.numComments || 0}
                                {" }"}
                            </span>
                        </div>
                        <ReplyButton className="ReplyButton" />
                        <div className="Comments">
                            <CommentsRender comments={data.comments} />
                        </div>
                    </Container>
                ) : (
                    <ContentLoadingProblemNotFound />
                )}
            </AnimateItem>
        </Context.Provider>
    );
};
