import React, { useState } from "react";
import { Box } from "@mui/material";
import SnetLogo, { logoVariants } from "./SnetLogo";
import SnetModal from "../SnetModal";
import SnetAsideMenu from "./SnetAsideMenu";
import SnetWalletsButton from "../SnetWalletsButton";
import SnetConnectWallets from "../SnetConnectWallets";
import SnetNavigationLinks from "./SnetNavigationLinks";
import "./style.css";
import { useResize } from "../../hooks/ResizeHook/ResizeHook";
import { windowSizes } from "../../utils/constants/constants";

const SnetNavigation = (): React.ReactElement => {
    
    const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);

    const { windowWidth } = useResize();

    const isMobile = windowWidth < windowSizes.MIDDLE;

    const closeWalletModal = (): void => {
        setIsWalletModalOpen(false);
    };

    const openWalletsModal = (): void => {
        setIsWalletModalOpen(true);
    };

    const RegularNavigation = (): React.ReactElement => {
        return (
            <React.Fragment>
                <SnetNavigationLinks />
                <SnetWalletsButton onClick={openWalletsModal} />
            </React.Fragment>
        );
    };

    const MobileNavigation = (): React.ReactElement => {
        return (
            <React.Fragment>
                <SnetAsideMenu>
                    <Box className="aside-menu">
                        <SnetNavigationLinks />
                        <SnetWalletsButton onClick={openWalletsModal} />
                    </Box>
                </SnetAsideMenu>
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <SnetLogo variant={logoVariants.DARK}/>
            {isMobile ? <MobileNavigation /> : <RegularNavigation />}
            <SnetModal isOpen={isWalletModalOpen} onClose={closeWalletModal}>
                <SnetConnectWallets />
            </SnetModal>
        </React.Fragment>
    );
};

export default SnetNavigation;
