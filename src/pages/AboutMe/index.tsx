import React from "react";
import { scrollContent, AnimateItem } from "components/Tools";
import styled from "styled-components";
import { faHand } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImageLazy } from "components/Elements/ImageLazy";

const Content = styled.div`
    h1 {
        text-align: center;
        margin-bottom: 1rem;
        .Icon {
            margin-right: 0.5rem;
        }
    }
    & .HeroBlock {
        width: 300px;
        margin: 0 auto;
        .HeroBlockImage {
            width: 100%;
            height: auto;
        }
    }
`;

export const AboutMe = () => {
    React.useEffect(() => {
        document.title = "About me";
        scrollContent(0);
    }, []);

    return (
        <AnimateItem>
            <Content>
                <h1>
                    <FontAwesomeIcon icon={faHand} className="Icon" />
                    About Me
                </h1>
                <div className="HeroBlock">
                    <ImageLazy
                        src="/asset/Face.jpg"
                        className="HeroBlockImage"
                        width="1080"
                        height="1080"
                        alt="hero of this site"
                    />
                </div>
            </Content>
        </AnimateItem>
    );
};
