/**
 * @description
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import React from "react";
import { BlockHero } from "./Blocks/Hero";
import { BlockSection } from "./Blocks/Section";
import { BlockScores } from "./Blocks/Scores";

const Components: any = {
    Hero: BlockHero,
    Section: BlockSection,
    Scores: BlockScores,
};

const Dummy = () => <></>;

export const Blocks = ({ className, data }: any) => {
    return (
        <div className={className}>
            {data.map((blockData: any, i: number) =>
                Components[blockData.type] ? (
                    React.createElement(Components[blockData.type], {
                        data: blockData,
                        key: i,
                    })
                ) : (
                    <Dummy />
                )
            )}
        </div>
    );
};
