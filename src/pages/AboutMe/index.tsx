import React from "react";
import { scrollTo, AnimateItem } from "components/Tools";
import styled from "styled-components";
import {
    faHand
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Content = styled.div`
    .Icon {
        margin-right: 0.5rem;
    }
    h1 {
        text-align: center;
        margin-bottom: 1rem;
    }
`;

export const AboutMe = () => {
    React.useEffect(() => {
        document.title = "About me";
        scrollTo(0);
    }, []);
    return (
        <AnimateItem>
            <Content>
                <h1><FontAwesomeIcon icon={faHand} className="Icon"/>About Me</h1>
                <span>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Veritatis laudantium rerum ab facilis dicta fugit, cum
                    repellendus. Eius tempore laudantium, explicabo enim
                    necessitatibus, consequatur quasi, doloribus rerum cum
                    similique veritatis.
                </span>
            </Content>
        </AnimateItem>
    );
};
