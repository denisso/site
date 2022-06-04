import React from "react";
import { CForm, CFormProps } from ".";
import { useModal } from "../CModal";

export const useFormModal = (title?: string) => {
    const { Modal, openModal, closeModal } = useModal(title);
    const CFormModal = React.useMemo(() => {
        return ({ schema, onSubmit }: CFormProps) => {
            return (
                <Modal>
                    <CForm
                        {...{
                            schema,
                            onSubmit,
                            onCancel: (e) => {
                                closeModal(e);
                            },
                        }}
                    />
                </Modal>
            );
        };
    }, []);
    return {
        CFormModal,
        openFormModal: openModal,
        closeFormModal: closeModal,
    };
};
