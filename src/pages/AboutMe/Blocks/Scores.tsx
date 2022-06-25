import React from "react"
import styled from "styled-components";
import { ComponentLazy } from "../ComponentLazy";
import { up, down } from "styled-breakpoints";
const Container = styled.div`
    .Children {
        display: flex;
        ${down("sm")} {
            flex-wrap: wrap;
        }
        ${up("sm")} {
            flex-wrap: nowrap;
        }
        .Child {
            ${down("sm")} {
                min-width: 100%;
            }
            ${up("sm")} {
                flex: 1;
            }

            .Scores {
                display: flex;
                :not(:last-child) {
                    margin-bottom: 0.3rem;
                }
                .Caption {
                    min-width: 20%;
                }
                .Score {
                    flex: 1;
                    background-color: ${({ theme }) => theme.colors.third};
                }
                .Score.Empty{
                    border: solid ${({ theme }) => theme.colors.third};
                    background-color: transparent;
                }
                .Score + .Score {
                    margin-left: 0.3rem;
                }
            }
        }
        ${up("sm")} {
            .Child + .Child {
                margin-left: 1rem;
            }
        }

        ${down("sm")} {
            min-width: 100%;
            .Child:not(.Child:last-child) {
                margin-bottom: 1rem;
            }
        }
    }
`;

export const BlockScores = React.memo(({ data, className }: any) => {
    return (
        <ComponentLazy className={className}>
            <Container>
                <h2 className="Header">{data.name}</h2>
                <div className="Children">
                    {data.children instanceof Array === true &&
                        data.children.map((childData: any) => (
                            <div className="Child" key={childData.name}>
                                <h3 className="Caption">{childData.name}</h3>

                                {childData?.scores &&
                                    childData?.scores instanceof Array &&
                                    childData?.scores.map((scoreData: any) => (
                                        <div
                                            className="Scores"
                                            key={scoreData.name}
                                        >
                                            <div className="Caption">
                                                {scoreData.name}
                                            </div>
                                            {data.max &&
                                                new Array(data.max)
                                                    .fill(0)
                                                    .map((_, indx) => (
                                                        <div
                                                            className={scoreData.score -1 >= indx ? "Score" : "Score Empty"}
                                                            key={indx}
                                                        ></div>
                                                    ))}
                                        </div>
                                    ))}
                            </div>
                        ))}
                </div>
            </Container>
        </ComponentLazy>
    );
});
