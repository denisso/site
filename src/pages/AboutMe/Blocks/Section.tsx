import React from "react";
import { Badge } from "components/Elements/Badge";
import { Anchor } from "components/Elements/Anchor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { ComponentLazy } from "../ComponentLazy";
const BlockSectionChildren = ({
    name,
    category,
    desc,
    link,
    badgets,
    sandboxes,
}: any) => {
    return (
        <ComponentLazy>
            <div>
                {category} {name}
            </div>
            <div>{desc}</div>
            <div>
                "Links:"
                {link &&
                    link instanceof Array === true &&
                    link.map(({ name, link }: any) => (
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
            <div>
                "Badgets:"
                {badgets &&
                    badgets instanceof Array === true &&
                    badgets.map((e: string) => <Badge key={e}>{e}</Badge>)}
            </div>
            <div>
                "Sandboxes:"
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
        </ComponentLazy>
    );
};

export const BlockSection = ({ data, className }: any) => {
    return (
        <div className={className}>
            {data &&
                data.children instanceof Array === true &&
                data.children.map((e: any) => (
                    <BlockSectionChildren props={e} key={e.name} section={e.name}/>
                ))}
        </div>
    );
};
