/**
 * @description 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import styled from "styled-components";
import { ImageLazy } from "components/Elements/ImageLazy";

import { Badge } from "components/Elements/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { Anchor } from "components/Elements/Anchor";
const Container = styled.div`
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
            .Link{
                font-size: 1.5rem;
                font-weight: bold;
            }
            
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

export const BlockHero = React.memo(({ className, data }: any) => {
    return (
        
            <Container>
                <div className="HeroAvatar">
                    <ImageLazy
                        src={data?.hero?.photo?.src}
                        className="HeroImage"
                        width={170}
                        height={170}
                        alt={data?.hero?.photo?.alt}
                    />
                </div>
                <div className="HeroAbout">
                    <div className="HeroName">
                        <h2 className="Name">{data?.hero?.name}</h2>

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
            </Container>

    );
});
