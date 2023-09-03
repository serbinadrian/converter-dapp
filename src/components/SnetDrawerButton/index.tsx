import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./style.css";

export const enum drawerButtonVariants {
    OPEN = "open",
    CLOSE = "close",
}

interface Props {
    variant: string;
    onCLick: () => void;
}

const SnetDrawerButton = ({ variant, onCLick }: Props): React.ReactElement => {

    const ButtonIcon = (): React.ReactElement => {
        switch(variant) {
            case drawerButtonVariants.OPEN: {
                return (<MenuIcon />);
            }
            case drawerButtonVariants.CLOSE: {
                return (<ArrowForwardIosIcon />);
            }
            default: {
                return (<MenuIcon />);
            }
        }
    }

    return (
        <React.Fragment>
            <button onClick={onCLick} className="drawer-button">
               <ButtonIcon />
            </button>
        </React.Fragment>
    );
};

export default SnetDrawerButton;
