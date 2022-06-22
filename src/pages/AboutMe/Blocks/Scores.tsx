import styled from "styled-components";
import { ComponentLazy } from "../ComponentLazy";

const Container = styled.div``;

export const BlockScores = ({ data, className }: any) => {
    const { children } = data;
    return (
        <ComponentLazy className={className}>
            <Container>
                <h2 className="CategoryAndName">
                    {section} {">"} {name}
                </h2>
            </Container>
        </ComponentLazy>
    );
};
