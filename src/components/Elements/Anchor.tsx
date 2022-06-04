/**
 * Wrapper for styled anchor a[href]
 */
import styled from "styled-components";
import { themeType } from "features/theming";

export const Anchor = styled.a<{ theme?: themeType }>`
    --color: ${({ theme }) => theme.ui.link.color};
    --colorHover: ${({ theme }) => theme.ui.link.colorHover};
    &:link,
    &:visited,
    &:active {
        color: var(--color);
    }
    color: var(--color);
    transition: color var(--transition), background-color var(--transition);
    &:hover {
        color: var(--colorHover);
    }
`;

export const AnchorBox = styled(Anchor)<{ theme?: themeType }>`
    display: block;
    --colorHover: ${({ theme }) => theme.colorRoot};
    padding: 1rem 0.5rem;
    background-color: ${({ theme }) => theme.ui.link.bgColor};
    &:hover {
        background-color: ${({ theme }) => theme.ui.link.bgColorHover};
    }
`;
