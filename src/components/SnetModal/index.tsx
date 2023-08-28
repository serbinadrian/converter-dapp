import React from "react";
import { Box, Modal } from "@mui/material";
import "./style.css";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: JSX.Element;
}

const SnetModal = ({ children, isOpen, onClose }: Props): React.ReactElement => {
    return (
        <React.Fragment>
            <Modal open={isOpen} onClose={onClose} className="modal-container">
                <Box>
                    {children}
                </Box>
            </Modal>
        </React.Fragment>
    );
};

export default SnetModal;
