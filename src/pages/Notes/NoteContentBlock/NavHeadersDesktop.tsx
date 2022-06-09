/**
 * Table of conetent fot desctop
 */

import React from "react";
import styled from "styled-components";
import { scrollTo } from "components/Tools/scrollTo";
import { ContextNotes } from "../ContextNotes";
import { AnchorData } from "./index";
import { AnchorBox } from "components/Elements/Anchor";
import { AnimateItem } from "components/Tools";

const Nav = styled.nav`
    padding: 1rem;
    padding-right: 0;
    top: 3.5rem;
    position: sticky;
    display: flex;
    flex-direction: column;
`;

const AnchorBoxStyled = styled(AnchorBox)`
    margin-bottom: 0.3rem;
    &:hover {
        font-weight: bold;
    }
    &.active {
        font-weight: bold;
    }
`;
/**
 *
 * Table of content
 */
export const ToCDesctop = ({
    className,
    anchorsArrayForToc,
    isVisible = true,
}: {
    className: string;
    anchorsArrayForToc?: AnchorData[];
    isVisible?: boolean;
}) => {
    const { currentHeader } = React.useContext(ContextNotes);
    // handler for scroll to header
    const onClickAnchor = React.useCallback((e: any) => {
        scrollTo(document.querySelector(e.target.hash).offsetTop);
    }, []);
    // refs on elementa a[href] in table of content
    const refAnchors = React.useRef<any[]>([]);

    // on change current header for highlight it
    React.useEffect(() => {
        if (refAnchors.current.length === 0) return;
        refAnchors.current.forEach(
            (e: any) => e && e.classList.remove("active")
        );

        refAnchors.current[currentHeader] && refAnchors.current[currentHeader].classList.add("active");
    }, [currentHeader]);
    return (
        <AnimateItem {...{ className, isVisible }}>
            <Nav>
                {anchorsArrayForToc &&
                    anchorsArrayForToc.map((e, i) => (
                        <AnchorBoxStyled
                            key={i}
                            href={e.headerlink}
                            onClick={onClickAnchor}
                            ref={(el) => (refAnchors.current[i] = el)}
                        >
                            {e.headerText}
                        </AnchorBoxStyled>
                    ))}
            </Nav>
        </AnimateItem>
    );
};
