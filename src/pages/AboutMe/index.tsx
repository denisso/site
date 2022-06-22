import React from "react";
import { scrollContent, AnimateItem } from "components/Tools";
import styled from "styled-components";
import { faHand } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BlocksList } from "./BlocksList";
const Content = styled.div`
    h1 {
        text-align: center;
        margin-bottom: 1rem;
        .Icon {
            margin-right: 0.5rem;
        }
    }
`;

const arr = new Array(40).fill(0);
export const AboutMe = () => {
    React.useEffect(() => {
        document.title = "About me";
        scrollContent(0);
    }, []);

    return (
        <Content>
            <AnimateItem>
                <h1>
                    <FontAwesomeIcon icon={faHand} className="Icon" />
                    <span>About Me</span>
                </h1>
            </AnimateItem>
            <BlocksList/>
        </Content>
    );
};
