import styled from "styled-components";
import { themeType } from "features/theming";

const Svg = styled.svg.attrs({
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
})`
    stroke: ${({ theme }: { theme: themeType }) => theme.header.colorTextMenu};
    transition: stroke var(--transition);
    &:hover {
        stroke: ${({ theme }: { theme: themeType }) =>
            theme.header.colorTextMenuHover};
    }
`;

export const Icon = () => {
    return (
        <Svg viewBox="0 0 100.18 100.18">
            <path
                fill="#fff"
                strokeMiterlimit="10"
                strokeWidth="8.178"
                d="M4.09 4.09H96.09V96.09H4.09z"
            ></path>
            <path
                fill="none"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="8"
                d="M22.44 46.61l20.7 20.78 34.6-34.6"
            ></path>
        </Svg>
    );
};

const LogoContainer = styled.div<{ size: string }>`
    display: flex;
    align-items: center;
    width: ${(props) => props.size};
    height: ${(props) => props.size};
`;

export const Logo = ({ size = "30px" }: { size: string }) => {
    return (
        <LogoContainer size={size}>
            <Icon />
        </LogoContainer>
    );
};
