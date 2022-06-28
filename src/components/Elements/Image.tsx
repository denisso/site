/**
 * @description Image without Lazy Loading
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react";

export const Image = ({ src, ...props }: any) => {
    const [uri, setUri] = React.useState(src);
    const errorLoading = React.useRef(false);
    const onError = () => {
        if (errorLoading.current) return;
        setUri("/asset/imageLoadingProblem2.svg");
        errorLoading.current = true;
    };
    React.useEffect(() => {
        if (!src) setUri("/asset/imageLoadingProblem2.svg");
    }, []);
    return <img src={uri} {...props} onError={onError} />;
};
