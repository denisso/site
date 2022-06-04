/**
 * Modal with fadeIn/Out effect
 */
import React from "react";
import styled from "styled-components";
import { up, only, down } from "styled-breakpoints";

const ModalStyled = styled.div<{ fadeInOut: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: var(--zIndexModal);
    display: grid;
    place-items: center;
    background-color: ${({ theme }) => theme.ui.modal.overlay};
    animation: ${({ fadeInOut }) => (fadeInOut ? "fadeIn" : "fadeOut")}
        var(--transition);

    .modalBox {
        display: flex;
        flex-direction: column;
        ${down("xm")} {
            width: 100%;
        }
        ${only("xm")} {
            width: 90%;
        }
        ${only("sm")} {
            width: 80%;
        }
        ${down("sm")} {
            padding: 1rem;
        }
        ${up("md")} {
            width: 600px;
        }
        padding: 1rem;
        border: solid;
        border-color: ${({ theme }) => theme.ui.modal.borderColor};
        border-radius: var(--borderRadiusBlock);
        background-color: ${({ theme }) => theme.colorRoot};

        transition: width var(--transition);
        & > * + * {
            margin-top: 1rem;
        }
        .modalHeader {
            text-align: right;
            display: flex;
            .modalTitle {
                flex-grow: 1;
                text-align: center;
                font-weight: bold;
                font-size: 1.2rem;
            }
        }
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;
export const useModal = (title?: string) => {
    const [show, setShow] = React.useState(false);
    const refModal = React.useRef<any>(null);
    const openModal = React.useCallback((e?: any) => {
        if (e) e.preventDefault();
        setShow(true);
    }, []);
    const closeModal = React.useCallback((e?: any) => {
        if (e) e.preventDefault();
        setShow(false);
    }, []);
    React.useEffect(() => {
        const event: any = new Event("showModal");
        event.showModal = { value: show };
        if (refModal.current) refModal.current.dispatchEvent(event);
    }, [show]);
    const Modal = React.useMemo(() => {
        const ComponentConstructor = ({ children }: { children?: any }) => {
            const [show, setShow] = React.useState(false);
            React.useEffect(() => {
                const handleSetNewState = function (event: any) {
                    event.stopPropagation();
                    setShow(event.showModal.value);
                };
                refModal.current.addEventListener(
                    "showModal",
                    handleSetNewState
                );
                return () => {
                    if (!refModal.current) return;
                    refModal.current.removeEventListener(
                        "showModal",
                        handleSetNewState
                    );
                };
            }, []);
            return (
                <>
                    <div ref={refModal} />
                    <CModal {...{ show, title }}>{children}</CModal>
                </>
            );
        };
        return ComponentConstructor;
    }, []);
    return {
        Modal,
        openModal,
        closeModal,
    };
};

export const CModal = ({
    title,
    show,
    children,
    className,
}: {
    title?: string;
    className?: string;
    show: boolean;
    children?: any;
}) => {
    const [display, setDisplay] = React.useState(false);
    const clickedClose = React.useRef(false);

    const onAnimationEnd = () => {
        if (!show) setDisplay(false);
    };

    React.useEffect(() => {
        // initialize modal window and start animation fadeIn
        if (show) {
            setDisplay(true);
            clickedClose.current = false;
        }
    }, [show]);

    return (
        <>
            {display && (
                <ModalStyled
                    fadeInOut={show}
                    className="modalOverlay"
                    {...{ onAnimationEnd }}
                    
                >
                    <div className="modalBox">
                        <header className="modalHeader">
                            {title && <div className="modalTitle">{title}</div>}
                        </header>

                        <div {...{ className }}>{children}</div>
                    </div>
                </ModalStyled>
            )}
        </>
    );
};
