import React from "react"
import { motion } from "framer-motion";
import styled from "styled-components";

const Path = (props: any) => (
    <motion.path
        fill="transparent "
        strokeWidth="3"
        strokeLinecap="round"
        {...props}
    />
);

const Button = styled.button`
    outline: none;
    border: none;
    user-select: none;
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity var(--transition);
    svg {
        display: block;
    }
    &:hover {
        opacity: var(--opacityFadeOut);
    }
    .Path{
        stroke: ${({ theme }) => theme.colors.first};
    }
`;

export const ButtonHamburger = ({
    toggleOpen,
    isOpen,
}: {
    toggleOpen: any;
    isOpen: boolean;
}) => {

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.5 }}
            className={"ButtonHamburger"}
        >
            <Button onClick={() => toggleOpen()}>
                <svg width="30" height="30" viewBox="0 0 30 30">
                    <Path className="Path"
                        variants={{
                            closed: { d: "M 0 4 L 30 4" },
                            open: { d: "M 4.39 4.39 L 25.61 25.6 " },
                        }}
                    />
                    <Path className="Path"
                        d="M 0 15 L 30 15"
                        variants={{
                            closed: { opacity: 1 },
                            open: { opacity: 0 },
                        }}
                    />
                    <Path className="Path"
                        variants={{
                            closed: { d: "M 0 26 L 30 26" },
                            open: { d: "M 25.57 4.39 L 4.36 25.6" },
                        }}
                    />
                </svg>
            </Button>
        </motion.nav>
    );
};
