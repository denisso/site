import React from "react";
import styled from "styled-components";
import { Badge } from "components/Elements/Badge";
import { Anchor } from "components/Elements/Anchor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faLink } from "@fortawesome/free-solid-svg-icons";
import { ComponentLazy } from "../ComponentLazy";

const Container = styled.div`
    & > * + * {
        margin-top: 0.4rem;
    }

    .Links,
    .Badgets,
    .Sandboxes {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        > * {
            margin-bottom: 0.3rem;
        }
        .Link {
            text-decoration: underline;
        }
        .Caption {
            font-size: 1.2rem;
            font-weight: bold;
            margin-right: 1rem;
        }
        *:not(*:last-child) {
            margin-right: 0.3rem;
        }
    }
`;
const BlockSectionChildren = ({ section, data }: any) => {
    const { name, desc, links, badgets, sandboxes } = data;
    return (
        <ComponentLazy>
            <Container>
                <h2 className="Header">
                    {section} {">"} {name}
                </h2>
                <div className="Description">{desc}</div>
                <div className="Links">
                    <div className="Caption">Links:</div>
                    {links &&
                        links instanceof Array === true &&
                        links.map(({ name, link }: any) => (
                            <Anchor
                                key={name}
                                href={link}
                                className="Link"
                                target="_blank"
                                title="Go to sandbox"
                            >
                                <span className="Icon">
                                    <FontAwesomeIcon icon={faLink} />
                                </span>
                                {name}
                            </Anchor>
                        ))}
                </div>
                <div className="Badgets">
                    <div className="Caption">Badgets:</div>
                    {badgets &&
                        badgets instanceof Array === true &&
                        badgets.map((e: string) => (
                            <Badge className="Badge" key={e}>
                                {e}
                            </Badge>
                        ))}
                </div>
                <div className="Sandboxes">
                    <div className="Caption">Sandboxes:</div>
                    {sandboxes &&
                        sandboxes instanceof Array === true &&
                        sandboxes.map(({ name, link }: any) => (
                            <Anchor
                                key={name}
                                href={link}
                                className="Link"
                                target="_blank"
                                title="Go to sandbox"
                            >
                                <span className="Icon">
                                    <FontAwesomeIcon icon={faCode} />
                                </span>
                                {name}
                            </Anchor>
                        ))}
                </div>
            </Container>
        </ComponentLazy>
    );
};

export const BlockSection = ({ data, className }: any) => {
    return (
        <div className={className}>
            {data &&
                data.children instanceof Array === true &&
                data.children.map((dataSection: any) => (
                    <BlockSectionChildren
                        data={dataSection}
                        key={dataSection.name}
                        section={data.name}
                    />
                ))}
        </div>
    );
};
