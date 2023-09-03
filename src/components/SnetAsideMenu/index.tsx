import { Box, Drawer } from "@mui/material";
import React, { useState } from "react";
import SnetDrawerButton, { drawerButtonVariants } from "../SnetDrawerButton";
import "./style.css";

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
            <SnetDrawerButton
                onCLick={toggleDrawer}
                variant={drawerButtonVariants.OPEN}
            />
            <Drawer variant="persistent" anchor="right" open={isOpen}>
                <Box className="aside-menu">
                    <SnetDrawerButton
                        onCLick={toggleDrawer}
                        variant={drawerButtonVariants.CLOSE}
                    />
                    {children}
                </Box>
            </Drawer>
        </React.Fragment>
    );
};

export default SnetAsideMenu;
