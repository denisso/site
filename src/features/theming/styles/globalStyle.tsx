/**
 * @description 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import { createGlobalStyle } from "styled-components";
import { base } from "./css.base";
import { variables } from "./css.variables";

export const GlobalStyle = createGlobalStyle`
    ${variables} 
    ${base}`;
