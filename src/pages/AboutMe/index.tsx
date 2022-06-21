import React from "react";
import { scrollContent, AnimateItem } from "components/Tools";
import styled from "styled-components";
import { faHand } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ImageLazy } from "components/Elements/ImageLazy";
import { ComponentLazy } from "./ComponentLazy";
const Content = styled.div`
    h1 {
        text-align: center;
        margin-bottom: 1rem;
        .Icon {
            margin-right: 0.5rem;
        }
    }
    & .HeroBlock {
        display: flex;
        .HeroAvatar {
            width: 150px;
            overflow: hidden;
            border-radius: 50%;
            .HeroImage {
                width: 100%;
                height: auto;
            }
        }
    }
`;

const Badge = styled(({ className, ...props }) => {
    return <div className={className}></div>;
})`
    padding: 0.5rem;
    border-radius: 0.5rem;
    color: white;
    background: orange;
    font-weight: bold;
`;
const arr = new Array(40).fill(0);
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
                    <div className="HeroAvatar">
                        <ImageLazy
                            src="/asset/Face.jpg"
                            className="HeroImage"
                            width="1080"
                            height="1080"
                            alt="hero of this site"
                        />
                    </div>
                    <div className="HeroAbout">
                        <div className="HeroName">Denis</div>
                        <div className="HeroRole">React web programmer</div>
                    </div>
                </div>

                {arr.map((_, i) => (
                    <ComponentLazy key={i} />
                ))}
            </Content>
        </AnimateItem>
    );
};
