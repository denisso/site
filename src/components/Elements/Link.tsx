/**
 * Wrapper for styled anchor a[href]
 */
import { Link } from "react-router-dom";
import styled from "styled-components";
import { themeType } from "features/theming";

export interface LinkProps {
    color?: string;
    colorhover?: string;
    bgColor?: string;
    bgColorHover?: string;
    theme?: themeType;
}

export const LinkStyled = styled(Link)<LinkProps>`
    &:link,
    &:visited,
    &:active {
        color: ${({ theme }) => theme.ui.link.color};
    }
    color: ${({ theme }) => theme.ui.link.color};
    transition: color var(--transition);
    &:hover {
        color: ${({ theme }) => theme.ui.link.colorHover};
    }
`;

export const LinkStyledBox = styled(LinkStyled)<LinkProps>`
    padding: 1rem 0.5rem;
    background-color: ${({ theme }) => theme.ui.link.bgColor};
    &:hover {
        background-color: ${({ theme }) => theme.ui.link.bgColorHover};
    }
`;
