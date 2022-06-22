import React from "react";
import styled from "styled-components";
import { ImageLazy } from "components/Elements/ImageLazy";
import { ComponentLazy } from "../ComponentLazy";
import { Badge } from "components/Elements/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { Anchor } from "components/Elements/Anchor";
const Hero = styled.div`
    display: flex;
    min-height: 150px;
    .HeroAvatar {
        padding: 0.5rem;
        overflow: hidden;
        min-width: 170px;
        flex-basis: 170px;
        .HeroImage {
            width: 100%;
            height: auto;
            border-radius: 50%;
            overflow: hidden;
        }
    }
    .HeroAbout {
        padding: 0 1rem;
        & > * + * {
            margin-top: 0.4rem;
        }
        .HeroName {
            display: flex;
            font-size: 1.4rem;
            font-weight: bold;
            & > * + * {
                margin-left: 1rem;
            }
        }
        .HeroRole {
            font-style: italic;
        }
        .HeroSkills {
            display: flex;
            flex-wrap: wrap;
            .Badge {
                margin-bottom: 0.3rem;
            }
            .Badge:not(.Badge:last-child) {
                margin-right: 0.3rem;
            }
        }
    }
`;

export const BlockHero = ({ className, data }: any) => {
    return (
        <ComponentLazy className={className}>
            <Hero>
                <div className="HeroAvatar">
                    <ImageLazy
                        src={data?.hero?.photo?.src}
                        className="HeroImage"
                        width={data?.hero?.photo?.width}
                        height={data?.hero?.photo?.height}
                        alt={data?.hero?.photo?.alt}
                    />
                </div>
                <div className="HeroAbout">
                    <div className="HeroName">
                        <div className="Name">
                        {data?.hero?.name}
                        </div>
                        
                        <Anchor
                            href={"mailto: blackbrain2009@gmail.com"}
                            className="Link"
                            target="_blank"
                            title="Go to sandbox"
                        >
                            <span className="Icon">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
                        </Anchor>
                    </div>
                    <div className="HeroRole">{data?.hero?.role}</div>
                    <div className="HeroSkills">
                        {data.hero &&
                            data.hero.skills instanceof Array === true &&
                            data.hero.skills.map((badgeText: string) => (
                                <Badge className="Badge" key={badgeText}>
                                    {badgeText}
                                </Badge>
                            ))}
                    </div>
                </div>
            </Hero>
        </ComponentLazy>
    );
};
