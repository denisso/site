import { createTheme } from "styled-breakpoints";

type breaksNumberType = {
    [key: string]: number;
};

export const breaksNumber: breaksNumberType = {
    xs: 0,    
    xm: 400,
    sm: 580,
    md: 768,
    lg: 992,
    xl: 1300,
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
