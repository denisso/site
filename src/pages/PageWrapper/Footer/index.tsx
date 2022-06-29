/**
 *
 * @author Denis Kurochkin (mr_dramm) <blackbrain2009@gmail.com>
 * @copyright Denis Kurochkin 2022
 */

import styled from "styled-components";
import { down, up } from "styled-breakpoints";
import { Button } from "components/Elements/Button";
import { useFormModal, schemaForm } from "components/Elements/CForm";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Anchor } from "components/Elements/Anchor";

const FooterWrapper = styled.footer.attrs({ className: "container" })`
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
    padding-bottom: 1rem;
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
    const { CFormModal, openFormModal, closeFormModal } =
        useFormModal("Send message");
    const onSubmit = (values: any, { setSubmitting }: any) => {
        setTimeout(() => {
            closeFormModal();
            setSubmitting(false);
        }, 400);
    };
    return (
        <FooterWrapper>
            <div className="sendMessageContainer">
                <div className="sendMesage">
                    <p className="headerSendMesage">
                        Lorem ipsum dolor sit amet consectetur .
                    </p>
                    <div className="btnSendMesage">
                        <Button onClick={() => openFormModal()}>
                            Send message
                        </Button>
                    </div>
                </div>
            </div>
            <div className="createdBy">
                <span>Created by mr_dramm</span>
            </div>
            <div className="contactsAndSocial">
                <Anchor
                    href="https://github.com/denisso?tab=repositories&type=source"
                    className="socialIcon"
                    target="_blank"
                >
                    <FontAwesomeIcon icon={faGithub} className="Icon" />
                </Anchor>
            </div>
            <CFormModal {...{ schema, onSubmit }} />
        </FooterWrapper>
    );
};
