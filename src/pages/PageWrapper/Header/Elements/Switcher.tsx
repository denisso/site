import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { themeType } from "features/theming";

const Component = styled.div<{
    theme?: themeType;
    size?: string;
}>`
    --size: calc(${({ size }) => size} / 10 * 16);
    width: var(--size);
    display: flex;
    justify-content: flex-start;
    border-radius: calc(var(--size) / 4 + var(--size) / 8);
    border: solid;
    padding: calc(var(--size) / 16);
    user-select: none;
    cursor: pointer;
    &[data-isOn="true"] {
        justify-content: flex-end;
        .Icon.Light {
            opacity: 1;
        }
        .Icon.Dark {
            opacity: 0;
        }
    }
    &[data-isOn="false"] {
        .Icon.Light {
            opacity: 0;
        }
        .Icon.Dark {
            opacity: 1;
        }
    }
    .handle {
        width: calc(var(--size) / 2);
        height: calc(var(--size) / 2);
        border-radius: calc(var(--width) / 4);
        position: relative;
        .Icon {
            position: absolute;
            width: 100%;
            height: auto;
            transition: opacity 0.5s;
        }
    }
`;
const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
};
export const ThemeSwitcher = ({ trigger, size }: any) => {
    const [isOn, setOn] = React.useState(false);
    const toggleSwitch = () => {
        setOn(!isOn);
        trigger();
    };
    return (
        <Component data-ison={isOn} onClick={toggleSwitch} size={size}>
            <motion.div className="handle" layout transition={spring}>
                <FontAwesomeIcon className="Icon Light" icon={faMoon} />
                <FontAwesomeIcon className="Icon Dark" icon={faSun} />
            </motion.div>
        </Component>
    );
};
