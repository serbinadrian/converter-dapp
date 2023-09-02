import React from "react";
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
    onCLick: () => void;
}

const SnetDrawerButton = ({ onCLick }: Props): React.ReactElement => {
    return (
        <React.Fragment>
            <button onClick={onCLick} className="drawer-button">
                <MenuIcon />
            </button>
        </React.Fragment>
    );
};

export default SnetDrawerButton;
