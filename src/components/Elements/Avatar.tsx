/**
 * for more info about Fontawesome icons see:
 * https://fontawesome.com/v5/docs/apis/javascript/get-started
 */
import React from "react";
import { faGhost } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Avatar = ({ picture, className }: any) => {
    const [error, setError] = React.useState(false);

    const Image =
        picture && picture !== "guest" && error === false ? (
            React.createElement("img", {
                className,
                src: picture,
                alt: "user avatar",
                onError: () => {
                    setError(true);
                },
            })
        ) : error ? (
            <FontAwesomeIcon {...{ className }} icon={faImage} />
        ) : (
            <FontAwesomeIcon {...{ className }} icon={faGhost} />
        );

    return Image;
};
