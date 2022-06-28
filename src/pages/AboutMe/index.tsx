/**
 * @description 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import { scrollContent, AnimateItem } from "components/Tools";
import styled from "styled-components";
import { faHand } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Blocks } from "./Blocks";

const Content = styled.div`
    h1 {
        text-align: center;
        margin-bottom: 1rem;
        .Icon {
            margin-right: 0.5rem;
        }
    }
`;

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
            <Blocks className="Blocks"/>
        </Content>
    );
};
