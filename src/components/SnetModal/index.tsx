import React from "react";
import { Modal } from "@mui/material";
import "./style.css";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactElement;
}

const SnetModal = ({ children, isOpen, onClose }: Props): React.ReactElement => {
    return (
        <React.Fragment>
            <Modal open={isOpen} onClose={onClose} className="modal-container">
                {children}
            </Modal>
        </React.Fragment>
    );
};

export default SnetModal;
