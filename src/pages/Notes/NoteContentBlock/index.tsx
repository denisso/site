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
import { AnimateItem, scrollTo } from "components/Tools";
import { CommentsComponent } from "../Comments";
import { ErrorBoundary } from "components/Tools/ErrorBoundary";
import { up } from "styled-breakpoints";

const Container = styled.div`
    ${up("md")} {
        .ContainerContent {
            display: flex;
            .BlockContent {
                flex: 1;
            }
            .NavHeaders {
                flex-basis: 30%;
                min-width: 200px;
            }
        }
    }
`;

/**
 *
 */
export const NoteContent = withTheme(({ theme }: { theme: themeType }) => {
    React.useEffect(() => {
        scrollTo(0);
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
            ) : data !== undefined ? (
                <Container>
                    <ErrorBoundary name="Content">
                        <div className="ContainerContent">
                            <BlockContent
                                data={data}
                                className={"BlockContent"}
                            />
                            <NavHeadersMobile
                                className={"NavHeaders"}
                                isVisible={mDown("md", theme.breakpoint)}
                            />
                            <NavHeadersDesktop
                                className={"NavHeaders"}
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
