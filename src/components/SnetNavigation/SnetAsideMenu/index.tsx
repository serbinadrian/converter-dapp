import { Drawer } from "@mui/material";
import React, { useState } from "react";
import SnetDrawerButton from "./SnetDrawerButton";

interface Props {
    children: React.ReactElement;
}

const SnetAsideMenu = ({ children }: Props): React.ReactElement => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDrawer = (): void => {
        setIsOpen(!isOpen);
    };

    return (
        <React.Fragment>
            <SnetDrawerButton onCLick={toggleDrawer} />
            <Drawer variant="persistent" anchor="right" open={isOpen}>
                {children}
            </Drawer>
        </React.Fragment>
    );
};

export default SnetAsideMenu;
