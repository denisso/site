/**
 * Displays post with mobile friendly panel table of contents
 */

import React from "react";
import { useParams } from "react-router-dom";
import styled, { withTheme } from "styled-components";

import { themeType, mUp, mDown } from "features/theming";
import { useGetNoteQuery } from "api-query/";
import { ContentBlock } from "./ContentBlock";
import { ToCDesctop } from "./ToCDesctop";

import { Spinner } from "components/Elements/Spinner";
import { AnimateItem, scrollTo } from "components/Tools";
import { CommentsComponent } from "../Comments";
import { ErrorBoundary } from "components/Tools/ErrorBoundary";
const Container = styled.div`
    .ContainerContent {
        display: flex;
        .ContentBlock {
            flex: 1;
        }
        .TableOfContent {
            flex-basis: 30%;
            min-width: 200px;
        }
    }
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

    // extract hash and text from markdown
    const anchorsArrayForToc: AnchorData[] | undefined = React.useMemo(() => {
        if (!data) return;
        document.title = data.title;
        const regXHeader =
            /#*\s+(\[)+(?<headerText>[a-zA-Z0-9\s]*)(\])+\(*(?<headerlink>[#a-zA-Z0-9\-]*)\)*/g;
        const tocArray: AnchorData[] = [];
        Array.from(data.description.matchAll(regXHeader)).map(
            (elementHeader: any) => {
                tocArray.push(elementHeader.groups);
            }
        );

        return tocArray;
    }, [data]);

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
                <></>
            ) : data !== undefined ? (
                <Container>
                    <div className="ContainerContent">
                        <ContentBlock
                            data={data}
                            className={"ContentBlock"}
                            anchorsArrayForToc={anchorsArrayForToc}
                        />

                        <ToCDesctop
                            anchorsArrayForToc={anchorsArrayForToc}
                            className={"TableOfContent"}
                            isVisible={mUp("md", theme.breakpoint)}
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
