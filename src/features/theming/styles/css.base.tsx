/**
 * @description 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import { css } from "styled-components";
import { up, down, between } from "styled-breakpoints";
import { themeType } from "../themes/themeType";

export const base = css<{ theme: themeType }>`
    * {
        margin: 0;
        padding: 0;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    body {
        width: var(--width);
        background-color: ${({ theme }) => theme.colorBackground};
        color: ${({ theme }) => theme.colorText};
        transition: color var(--transition), background-color var(--transition);
        font-size: 16px;
        font-family: ${({ theme }) => theme.fontFamily};
        /* for position sticky */
        overflow-x: hidden;
    }

    a,
    a:link,
    a:visited,
    a:active {
        text-decoration: none;
        color: ${({ theme }) => theme.colorText};
        user-select: none;
        cursor: pointer;
    }
    button {
        user-select: none;
        cursor: pointer;
    }
    .container {
        padding: 0 var(--padding);
    }
    #root {
        background-color: ${({ theme }) => theme.colorRoot};
        transition: width var(--transition), margin var(--transition);
        margin: 50px auto 100px;
        box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06),
            0 22.3px 17.9px rgba(0, 0, 0, 0.072),
            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
            0 100px 80px rgba(0, 0, 0, 0.12);

        ${down("md")} {
            width: 100%;
            margin: 0;
        }
        ${up("md")} {
            border-radius: var(--borderRadiusBlock);
        }
        ${between("md", "lg")} {
            width: 95%;
        }
        ${between("lg", "xl")} {
            width: 90%;
        }
        ${up("xl")} {
            width: 1400px;
        }
    }
`;
