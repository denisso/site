import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider as Tp } from "styled-components";
import { selectTheme, switchBreakpoint } from "./reducer";
import { themeType } from "./themes/themeType";
import { GlobalStyle } from "./styles/globalStyle";
import { useResizeObserver } from "./hooks/useResizeObserver";
import { useEffect } from "react";

type Children = { children: JSX.Element | JSX.Element[] | string | string[] };

export const ThemeProvider = ({ children }: Children) => {
    const theme: themeType = useSelector(selectTheme);
    const bp = useResizeObserver();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(switchBreakpoint(bp));
    }, [bp, dispatch]);

    return (
        <Tp theme={theme}>
            <GlobalStyle />
            {children}
        </Tp>
    );
};
