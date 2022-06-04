import { LinkStyled } from "components/Elements/Link";
import styled, { withTheme } from "styled-components";
import { themeType, mUp } from "features/theming";
import { AnimateItem } from "components/Tools/Animation";

const Nav = styled.nav.attrs({ className: "nav" })`
    display: flex;
    margin-left: 1rem;
    & > * + * {
        margin-left: 1rem;
    }
`;

const links = { aboutme: "About Me", notes: "Notes" };

export const MainMenu = withTheme(({ theme }: { theme: themeType }) => {
    return (
        <Nav>
            {Object.entries(links).map(([anchor, text], i) => (
                <AnimateItem key={i} isVisible={mUp("md", theme.breakpoint)}>
                    <LinkStyled to={`/${anchor}`}>{text}</LinkStyled>
                </AnimateItem>
            ))}
        </Nav>
    );
});
