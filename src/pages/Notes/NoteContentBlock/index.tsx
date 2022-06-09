/**
 * Displays post with mobile friendly panel table of contents
 */

import React from "react";
import { useParams } from "react-router-dom";
import styled, { withTheme } from "styled-components";

import { themeType} from "features/theming";
import { useGetNoteQuery } from "api-query/";
import { ContentBlock } from "./ContentBlock";
import { Spinner } from "components/Elements/Spinner";
import { AnimateItem, scrollTo } from "components/Tools";
import { CommentsComponent } from "../Comments";
import { ErrorBoundary } from "components/Tools/ErrorBoundary";
const Container = styled.div`

`;
/**
 * headerText - text for displays in link, matches the header h1-6
 * headerlink - link like #some-link-anchor
 */
export type AnchorData = {
    headerText: any;
    headerlink: any;
};

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
                    <div className="ContainerContent">
                        <ContentBlock
                            data={data}
                            className={"ContentBlock"}
                        />
                    </div>
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
