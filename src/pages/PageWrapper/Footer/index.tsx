/**
 *
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */
import React from "react";
import styled from "styled-components";
import { down, up } from "styled-breakpoints";
import { Button } from "components/Elements/Button";
import { useFormModal, schemaForm, modalEnum } from "components/Elements/CForm";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Anchor } from "components/Elements/Anchor";
import { ReactComponent as LogoGuest } from "assets/codesandbox.svg";

const FooterWrapper = styled.footer.attrs({ className: "container" })`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 200px;
    position: relative;
    margin-top: 4rem;
    box-shadow: inset var(--boxShadowHorizontal)
        ${({ theme }) => theme.colorBoxShadow};

    .sendMessageContainer {
        ${up("xm")} {
            top: -3rem;
            left: 50%;
            width: 385px;
            transform: translateX(-50%);
            position: absolute;
            display: flex;
            justify-content: center;
        }
        ${down("xm")} {
            width: 100%;
        }

        .sendMesage {
            display: inline-block;
            background: ${({ theme }) => theme.colors.firstLightMore};
            padding: 1rem 3rem;
            position: relative;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
            color: ${({ theme }) => theme.colors.first};
            box-shadow: -4px 8px 7px -1px ${({ theme }) => theme.colorBoxShadow};
        }
        ${up("sm")} {
            .sendMesage {
                width: 300px;
            }
        }
        ${down("sm")} {
            .sendMesage {
                width: 100%;
            }
        }
        ${up("xm")} {
            .sendMesage::after {
                content: "";
                position: absolute;
                top: 0;
                right: 100%;
                width: 1rem;
                height: calc(3rem + 1px);
                background: ${({ theme }) => theme.colors.firstLight};
                -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%);
                clip-path: polygon(100% 0, 100% 100%, 0 100%);
            }
        }
        .headerSendMesage {
            text-align: center;
            font-weight: bold;
        }
        .btnSendMesage {
            margin-top: 1rem;
            text-align: center;
        }
    }

    .createdBy {
        margin-top: 4rem;
        ${down("xm")} {
            margin-top: 1rem;
        }
        text-align: center;
        margin-bottom: 1rem;
    }
    .contactsAndSocial {
        display: flex;
        justify-content: center;
        & > * {
            margin-left: 1rem;
        }
        ${down("xm")} {
            flex-wrap: wrap;
        }
        .socialIcon {
            ${down("xm")} {
                margin-bottom: 1rem;
            }
            .Icon {
                width: 100%;
                height: auto;
                display: block;
            }
            width: 2rem;
            height: 2rem;
        }
    }
`;

const schema: schemaForm = [
    {
        name: "name",
        label: "Name",
        type: "text",
        required: true,
        options: { placeholder: "Name" },
    },
    {
        name: "email",
        label: "EMail",
        type: "email",
        required: true,
        options: { placeholder: "example@mail.com" },
    },
    {
        name: "message",
        label: "Message",
        type: "textarea",
        required: true,
        options: { placeholder: "Your message..." },
    },
];

export const Footer = () => {
    const { CFormModal, openFormModal, closeFormModal, processFormModal } =
        useFormModal("Send message", { middleware: true });
    const onSubmit = React.useCallback(
        (values: any, { setSubmitting }: any) => {
            processFormModal({ payload: modalEnum.loading });
            setTimeout(() => {
                // closeFormModal();
                processFormModal({ payload: modalEnum.fulfilled });
                setSubmitting(false);
            }, 1400);
        },
        []
    );
    return (
        <FooterWrapper>
            <div className="sendMessageContainer">
                <div className="sendMesage">
                    <div className="headerSendMesage">Denis in touch</div>
                    <div className="btnSendMesage">
                        <Button onClick={() => openFormModal()}>
                            Send message
                        </Button>
                    </div>
                </div>
            </div>
            <div className="createdBy">
                <span>
                    Created by <b>Denis Kurochkin</b> aka <b>mr_dramm</b>
                </span>
            </div>
            <div className="contactsAndSocial">
                <Anchor
                    href="https://github.com/denisso?tab=repositories&type=source"
                    className="socialIcon"
                    target="_blank"
                >
                    <FontAwesomeIcon icon={faGithub} className="Icon" />
                </Anchor>
                <Anchor
                    href="https://codesandbox.io/u/blackbrain2009"
                    className="socialIcon"
                    target="_blank"
                >
                    <LogoGuest className="Icon" />
                </Anchor>
            </div>
            <CFormModal {...{ schema, onSubmit }} />
        </FooterWrapper>
    );
};
