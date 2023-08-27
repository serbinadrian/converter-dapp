import React, { useState } from "react";
import SnetWalletsButton from "../SnetWalletsButton";
import SnetConnectWallets from "../SnetConnectWallets";
import SnetModal from "../SnetModal";
import "./style.css";
import SnetLogo from "./SnetLogo";
import SnetNavigationLinks from "./SnetNavigationLinks";

const SnetNavigation = (): React.ReactElement => {

    const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);

    const closeWalletModal = (): void => {
        setIsWalletModalOpen(false);
    };
    
    return (
        <React.Fragment>
            <SnetLogo />
            <SnetNavigationLinks />
            <div onClick={() => setIsWalletModalOpen(true)}>
                <SnetWalletsButton />
            </div>
            <SnetModal isOpen={isWalletModalOpen} onClose={closeWalletModal}>
                <SnetConnectWallets />
            </SnetModal>
        </React.Fragment>
    );
};

export default SnetNavigation;
