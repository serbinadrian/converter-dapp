import React, { useState } from "react";
import { paths } from "../../utils/constants/constants";
import SnetWalletsButton from "../SnetWalletsButton";
import SnetConnectWallets from "../SnetConnectWallets";
import SnetModal from "../SnetModal";
import "./style.css";

const SnetNavigation = (): React.ReactElement => {

    const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);

    const closeWalletModal = (): void => {
        setIsWalletModalOpen(false);
    };
    
    return (
        <React.Fragment>
            <a href={paths.CONVERTER}>Converter</a>
            <a href={paths.TRANSACTIONS}>Transactions</a>
            <a href={paths.CONTACT}>Contact us</a>
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
