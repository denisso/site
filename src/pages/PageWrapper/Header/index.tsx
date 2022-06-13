import React from "react";
import { up } from "styled-breakpoints";
import styled, { withTheme, css } from "styled-components";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useCycle } from "framer-motion";

import { Logo } from "assets/img/LogoIcon";
import { themeType, mDown, mUp, switchTheme } from "features/theming";
import { AnimateItem } from "components/Tools/Animation";

import { MobileMenu } from "./Elements/MobileMenu";
import { MainMenu } from "./Elements/MainMenu";
import { Button } from "components/Elements/Button";
import { ButtonHamburger } from "./Elements/ButtonHamburger";
import { AccountComponent } from "features/accounts/Component";

const HeaderLine = styled.div.attrs({ className: "container" })`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    height: 3rem;
`;

const flex = css`
    display: flex;
    align-items: center;
`;
const HeaderWrapper = styled.header`
    ${flex};
    position: sticky;
    z-index: 9999;
    top: 0px;
    background-color: white;
    ${up("sm")} {
        border-top-left-radius: var(--borderRadiusBlock);
        border-top-right-radius: var(--borderRadiusBlock);
    }
    box-shadow: var(--boxShadowHorizontal)
        ${({ theme }) => theme.colorBoxShadow};
`;
const HeaderLeftSide = styled.div`
    ${flex}
`;
const HeaderRightSide = styled.div`
    ${flex}
    & > * +*{
        margin-left: 1rem;
    }
`;

export const Header = withTheme(({ theme }: { theme: themeType }) => {
    const dispatch = useDispatch();
    const [isOpen, toggleOpen] = useCycle(false, true);
    React.useEffect(() => {
        // mobile menu must be close in desktop mode
        if (mUp("md", theme.breakpoint) && isOpen) toggleOpen();
    }, [theme.breakpoint]);

    return (
        <>
            <HeaderWrapper>
                <HeaderLine>
                    <HeaderLeftSide>
                        <AnimateItem
                            key={0}
                            isVisible={mDown("md", theme.breakpoint)}
                        >
                            <ButtonHamburger
                                toggleOpen={() => toggleOpen()}
                                isOpen={isOpen}
                            />
                        </AnimateItem>
                        <AnimateItem
                            key={"MobileMenu"}
                            isVisible={mUp("md", theme.breakpoint)}
                        >
                            <Link to="/">
                                <Logo size="30px" />
                            </Link>
                        </AnimateItem>

                        <MainMenu key={"DesktopMenu"} />
                    </HeaderLeftSide>
                    <HeaderRightSide>
                        <Button onClick={() => dispatch(switchTheme())}>
                            Switch
                        </Button>
                        <AccountComponent/>
                    </HeaderRightSide>
                </HeaderLine>
            </HeaderWrapper>
            <MobileMenu isOpen={isOpen} toggleOpen={toggleOpen} />
        </>
    );
});