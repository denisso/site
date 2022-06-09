/**
 * Table of content for mobile
 */
import React from "react";
import { ContextNotes } from "../ContextNotes";
import styled from "styled-components";
import { themeType } from "features/theming";
import { AnchorData } from ".";
import { Button } from "components/Elements/Button";
import { scrollTo } from "components/Tools";
import { useModal } from "components/Elements/CModal";
import { AnchorBox } from "components/Elements/Anchor";
import { AnimateItem } from "components/Tools";
const Wrapper = styled(AnimateItem)<{ theme: themeType }>`
    position: sticky;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colorRoot};
    height: 3rem;
    padding: 0.5rem 0;
    z-index: 200;
    .NavPanel {
        display: flex;
        justify-content: space-around;
        width: 100%;
    }
`;

const NavBox = styled.div`
    .NavContent {
        margin-bottom: 1rem;
        .NavigationAnchor {
            text-align: center;
        }
        .NavigationAnchor + .NavigationAnchor {
            margin-top: 0.5rem;
        }
    }
    .NavFooter {
        text-align: center;
    }
`;

export const NavHeadersDesktop = ({
    className,
    anchorsArrayForToc,
    isVisible = true,
}: {
    className?: string;
    anchorsArrayForToc: AnchorData[] | undefined;
    isVisible?: boolean;
}) => {
    const { currentHeader } = React.useContext(ContextNotes);
    const currentHeaderRef = React.useRef<number>(0)
    currentHeaderRef.current = currentHeader
    const { Modal, openModal, closeModal } = useModal("Choose section");
    const onClickAnchor = React.useCallback((arg: any) => {
        if (!anchorsArrayForToc) return;
        if (arg === "Prev") {
            scrollTo(
                document.querySelector(
                    anchorsArrayForToc[
                        currentHeaderRef.current > 0 ? currentHeaderRef.current - 1 : currentHeaderRef.current
                    ].headerlink
                ).offsetTop
            );
        }
        if (arg === "Next") {
            scrollTo(
                document.querySelector(
                    anchorsArrayForToc[
                        currentHeaderRef.current < anchorsArrayForToc.length - 1
                            ? currentHeaderRef.current + 1
                            : currentHeaderRef.current
                    ].headerlink
                ).offsetTop
            );
        }
        if (Number.isInteger(parseInt(arg))) {
            const numChapter = parseInt(arg);
            scrollTo(
                document.querySelector(
                    anchorsArrayForToc[numChapter].headerlink
                ).offsetTop
            );
        }
    }, []);

    return (
        <Wrapper {...{ className, isVisible }}>
            <div className="NavPanel">
                <Button onClick={onClickAnchor.bind(null, "Prev")}>Prev</Button>
                <Button
                    onClick={(e: any) => {
                        openModal(e);
                    }}
                >
                    Current:{" "}
                    {anchorsArrayForToc &&
                        anchorsArrayForToc[currentHeader].headerText}
                </Button>
                <Button onClick={onClickAnchor.bind(null, "Next")}>Next</Button>
            </div>

            <Modal>
                <NavBox>
                    <div className="NavContent">
                        {anchorsArrayForToc &&
                            anchorsArrayForToc.map((e, i) => (
                                <AnchorBox
                                    className="NavigationAnchor"
                                    key={i}
                                    href={e.headerlink}
                                    onClick={onClickAnchor.bind(null, i)}
                                >
                                    {e.headerText}
                                </AnchorBox>
                            ))}
                    </div>
                    <div className="NavFooter">
                        <Button onClick={(e: any) => closeModal(e)}>
                            Close
                        </Button>
                    </div>
                </NavBox>
            </Modal>
        </Wrapper>
    );
};
