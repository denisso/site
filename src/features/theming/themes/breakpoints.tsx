/**
 * @description 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import { createTheme } from "styled-breakpoints";

type breaksNumberType = {
    [key: string]: number;
};

export const breaksNumber: breaksNumberType = {
    xs: 0,    
    xm: 400,
    sm: 600,
    md: 820,
    lg: 1040,
    xl: 1500,
};

type breaksNumberPXType = {
    [key: string]: string;
};

const breaksNumberPX: breaksNumberPXType = {};
Object.assign(breaksNumberPX, breaksNumber);

Object.keys(breaksNumberPX).forEach((key: any) => {
    breaksNumberPX[key] += "px";
});

export const breaksPx = createTheme(breaksNumberPX);

export const mDown = (media: string, currentBp: any) => {
    return breaksNumber[media] > breaksNumber[currentBp] ? true : false;
};

export const mUp = (media: string, currentBp: any) => {
    return breaksNumber[media] <= breaksNumber[currentBp] ? true : false;
};

export const mOnly = (media: string, currentBp: any) => {
    return breaksNumber[media] === breaksNumber[currentBp] ? true : false;
};
