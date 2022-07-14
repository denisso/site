/**
 *
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import styled from "styled-components";
import { useGetNoteQuery } from "api-query/";
import { up } from "styled-breakpoints";
import { NoteDataType } from "mocks/data/notes";
import { NavLink } from "react-router-dom";
import { themeType } from "features/theming";
import { Spinner } from "components/Elements/Spinner";
import { scrollContent } from "components/Tools";
import {
    ItemAnimated,
    BoxAnimated,
} from "components/Tools/Animation/BoxAnimated";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    ContentLoadingProblemNotFound,
    ContentLoadingProblemError,
} from "components/Elements/ContentLoadingProblem";

const NotesListElement = styled(BoxAnimated)<{ theme: themeType }>`
    display: grid;
    gap: var(--gap);
    place-items: center;
    ${up("lg")} {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const NoteContainer = styled(ItemAnimated)<{ theme: themeType }>`
    width: 100%;
    height: 150px;

    .NoteContainer {
        display: block;
        background: ${({ theme }) => theme.colors.firstLightMore};
        border-radius: var(--borderRadiusBlock);
        height: 100%;
        border-radius: var(--borderRadiusBlock);
        overflow: hidden;
        border: solid transparent;
        transition: border-color var(--transition),
            background-color var(--transition), color var(--transition);
        &:hover {
            border: solid ${({ theme }) => theme.colors.third};
        }
        .NoteBlock {
            display: flex;
            height: 100%;
            /* align-items: center; */
            .NoteImage {
                min-width: 150px;
                max-width: 150px;
                display: flex;
                align-items: center;
                /* border-radius: var(--borderRadiusBlock); */
                /* overflow: hidden; */
                img {
                    display: block;
                    width: 100%;
                    height: auto;
                }
            }
            .NoteContent {
                flex-grow: 1;
                padding: 0.5rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                & > * {
                    display: flex;
                    align-items: center;
                }
                .NoteTitle {
                    margin-bottom: 0.5rem;
                    font-size: 1.2rem;
                    font-weight: bold;
                }
                .NoteExcerpt {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 4;
                    overflow: hidden;
                    max-height: 75px;
                }
                .NoteMeta {
                    display: flex;
                    .WrittenBy {
                        display: flex;
                        .Author {
                            margin-right: 1rem;
                        }
                    }
                }
            }
        }
    }
`;

const NotesList = ({ notes }: { notes: NoteDataType[] }) => {
    React.useEffect(() => {
        scrollContent(0);
        document.title = "Notes List";
    }, []);

    return (
        <NotesListElement className="NotesList">
            {notes.map((noteData: NoteDataType) => {
                return (
                    <NoteContainer key={noteData.id}>
                        <NavLink
                            to={`/notes/${noteData.slug}`}
                            className="NoteContainer"
                        >
                            <div className="NoteBlock">
                                <div className="NoteImage">
                                    <img
                                        src={noteData.icon}
                                        alt={"article image"}
                                    />
                                </div>
                                <div className="NoteContent">
                                    <div className="NoteTitle">
                                        {noteData.title}
                                    </div>
                                    <div className="NoteMeta">
                                        <div className="WrittenBy">
                                            <div className="Author">
                                                <span>
                                                    {noteData.author.name}
                                                </span>
                                            </div>
                                            <div className="WriteAt">
                                                {`${new Date(
                                                    noteData.createdAt
                                                ).getFullYear()} /
                                                ${
                                                    new Date(
                                                        noteData.createdAt
                                                    ).getMonth() + 1
                                                } /
                                                ${new Date(
                                                    noteData.createdAt
                                                ).getDate()}`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="NoteMeta">
                                        <div className="Coments">
                                            <FontAwesomeIcon
                                                icon={faComment}
                                                className="Icon"
                                            />{" "}
                                            {noteData.numComments}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    </NoteContainer>
                );
            })}
        </NotesListElement>
    );
};

const Content = styled.div`
    .Icon {
        margin-right: 0.5rem;
    }
    h1 {
        text-align: center;
        margin-bottom: 1rem;
    }
`;

const NoteListMemo = React.memo(NotesList);

export const NotesListWithFilter = () => {
    const { data, error, isLoading } = useGetNoteQuery("", {
        refetchOnMountOrArgChange: true,
    });
    return (
        <Content>
            <h1>
                <FontAwesomeIcon icon={faBookOpenReader} className="Icon" />
                Notes
            </h1>
            {error ? (
                <ContentLoadingProblemError />
            ) : isLoading ? (
                <Spinner />
            ) : data ? (
                <NoteListMemo notes={[...data]} />
            ) : (
                <ContentLoadingProblemNotFound />
            )}
        </Content>
    );
};
