import { Outlet } from "react-router-dom";
import styled from "styled-components";
const MainWrapper = styled.main`
    padding: 2rem 0;

`;

const MainContainer = styled.div.attrs({ className: "container" })`
    border-bottom-left-radius: var(--borderRadiusBlock);
    border-bottom-right-radius: var(--borderRadiusBlock);
    min-height: 40vh;
`;

export const Main = () => {
    
    return (
        <MainWrapper>
            <MainContainer>
                <Outlet />
            </MainContainer>
        </MainWrapper>
    );
};
