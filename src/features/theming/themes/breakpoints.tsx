/**
 * @description 
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import { createTheme } from "styled-breakpoints";
import {breakpoints} from "settings-demo-project"

type breaksNumberType = {
    [key: string]: number;
};

export const breaksNumber: breaksNumberType = breakpoints

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
