/**
 * Displays post with mobile friendly panel table of contents
 */

import React from "react";
import { useParams } from "react-router-dom";
import styled, { withTheme } from "styled-components";
import { themeType, mUp, mDown } from "features/theming";
import { NavHeadersMobile } from "./NavHeadersMobile";
import { NavHeadersDesktop } from "./NavHeadersDesktop";
import { useGetNoteQuery } from "api-query/";
import { BlockContent } from "./BlockContent";
import { Spinner } from "components/Elements/Spinner";
import { AnimateItem, scrollContent } from "components/Tools";
import { CommentsComponent } from "../Comments";
import { ErrorBoundary } from "components/Tools/ErrorBoundary";
import { up, down } from "styled-breakpoints";

const Container = styled.div`
    .ContainerContent {
        display: flex;
        flex-wrap: wrap;
        .BlockContent {
            ${up("md")} {
                flex-basis: 70%;
            }
            ${down("md")} {
                flex-basis: 100%;
            }
            transition: flex-basis var(--transition);
        }
        .NavHeadersDesctop {
            flex-basis: 30%;
            min-width: 200px;
        }
        .NavHeadersMobile {
            flex-basis: 100%;
        }
    }
`;

/**
 *
 */
export const NoteContent = withTheme(({ theme }: { theme: themeType }) => {
    React.useEffect(() => {
        scrollContent(0);
    }, []);
    // Get param from URL string
    const { noteSlug } = useParams<{ noteSlug?: string }>();
    // load data
    const { data, error, isLoading } = useGetNoteQuery(noteSlug);

    return (
        <AnimateItem>
            {error ? (
                <>
                    <div>
                        <span>Oh no, there was an error loading</span>
                    </div>
                    <div>
                        <Spinner />
                    </div>{" "}
                </>
            ) : isLoading ? (
                <Spinner />
            ) : data instanceof Object ? (
                <Container>
                    <ErrorBoundary name="Content">
                        <div className="ContainerContent">
                            <BlockContent
                                data={data}
                                className={"BlockContent"}
                            />
                            <NavHeadersMobile
                                className={"NavHeadersMobile"}
                                isVisible={mDown("md", theme.breakpoint)}
                            />
                            <NavHeadersDesktop
                                className={"NavHeadersDesctop"}
                                isVisible={mUp("md", theme.breakpoint)}
                            />
                        </div>
                    </ErrorBoundary>
                    <ErrorBoundary name="Comments">
                        <CommentsComponent {...{ noteSlug }} />
                    </ErrorBoundary>
                </Container>
            ) : (
                <>Emty data</>
            )}
        </AnimateItem>
    );
});
