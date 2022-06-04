import { Avatar } from "components/Elements/Avatar";
import styled from "styled-components";
import { CommentButtons } from "./CommentButtons";
import { CommentDataType } from "mocks/db-comments";
import { Context } from "./Context";
import React from "react";

const CommentStyled = styled.div.attrs({ className: "CommentContainer" })`
    display: flex;
    flex-direction: column;

    .Comment {
        display: flex;
        flex-direction: column;

        padding: 0.5rem;
        background: ${({ theme }) => theme.colors.thirdLightMore};
        & > * + * {
            margin-top: 1rem;
        }
        & > .CommentContent {
            margin-left: 0.3rem;
            padding: 1rem;
            background: ${({ theme }) => theme.colors.colorRoot};
            border-radius: var(--borderRadiusBlock);
        }
        & > .CommentInfoData {
            display: flex;
            align-items: center;
            a {
                text-decoration: underline;
            }
            & > * + * {
                margin-left: 1rem;
            }
            .CommentHash {
            }
            & > .CommentAvatar {
                width: 2rem;
                height: 2rem;
                & > * {
                    display: block;
                    width: 100%;
                    height: auto;
                }
            }
        }

    }

    & > .CommentsChild {
        display: flex;
        margin-left: 0.2rem;
        margin-top: 0.5rem;
        & > .CommentsChildOffsetLeft {
            width: 0.3rem;
            background: ${({ theme }) => theme.colors.third};
        }
        & > .CommentsChildContainer {
            flex: 1;

            & > .CommentContainer + .CommentContainer {
                margin-top: 0.5rem;
            }
        }
    }
`;

const Comment = ({
    comment,
    children,
}: {
    comment: CommentDataType;
    children?: any | any[];
}) => {
    const { commentid }: any = React.useContext(Context);

    return (
        <CommentStyled>
            <div className="Comment" id={comment.commentid}>
                <div className="CommentInfoData">
                    <div className="CommentHash">
                        Comment id:{" "}
                        <a href={"#" + comment.commentid}>
                            {"#" + comment.commentid}
                        </a>
                    </div>
                </div>
                <div className="CommentContent">{comment.comment}</div>
                <div className="CommentInfoData">
                    <Avatar
                        className="CommentAvatar"
                        picture={comment.picture}
                    />
                    <div className="CommentUserName">
                        <b>{comment.name}</b>
                    </div>
                    <div className="CommentDate">
                        {comment.date &&
                            "Published at : " +
                                new Date(
                                    Number(comment.date) || Date.now()
                                ).toUTCString()}
                    </div>
                </div>
                <CommentButtons className="CommentButtons" {...{ comment }} />
            </div>

            {children}
        </CommentStyled>
    );
};

export const CommentsRender = ({
    comments,
}: {
    comments: CommentDataType[];
}) => {
    return (
        <>
            {comments instanceof Array &&
                comments.map((comment: CommentDataType) => {
                    return (
                        <Comment key={comment.commentid} comment={comment}>
                            {comment.child instanceof Array &&
                                comment.child.length > 0 && (
                                    <div className="CommentsChild">
                                        <div className="CommentsChildOffsetLeft"></div>
                                        <div className="CommentsChildContainer">
                                            {comment.child.map(
                                                (child: CommentDataType) => (
                                                    <Comment
                                                        key={child.commentid}
                                                        comment={{
                                                            ...child,
                                                            parentid:
                                                                comment.commentid,
                                                        }}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                        </Comment>
                    );
                })}
        </>
    );
};
