import React from "react";
import { data } from "./data";
import { BlockHero } from "./Blocks/Hero";
import { BlockSection } from "./Blocks/Section";
import { BlockScores } from "./Blocks/Scores";

const Components: any = {
    Hero: BlockHero,
    Section: BlockSection,
    Scores: BlockScores,
};

export const Blocks = ({ className }: any) => {
    return (
        <div className={className}>
            {data.map((blockData: any, i: number) =>
                React.createElement(Components[blockData.type] || "div", {
                    data: blockData,
                    key: i,
                })
            )}
        </div>
    );
};
