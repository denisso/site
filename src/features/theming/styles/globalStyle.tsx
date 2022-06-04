import { createGlobalStyle } from "styled-components";
import { base } from "./css.base";
import { variables } from "./css.variables";

export const GlobalStyle = createGlobalStyle`
    ${variables} 
    ${base}`;
