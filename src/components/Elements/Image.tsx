/**
 * 
 */
import React from "react"

export const Image = ({ src, ...props }: any) => {
    const [uri, setUri] = React.useState(src);
    const errorLoading = React.useRef(false);
    const onError = () => {
        if (errorLoading.current) return;
        setUri("/asset/imageLoadingProblem.svg");
        errorLoading.current = true;
    };
    return <img src={uri} {...props} onError={onError} />;
};