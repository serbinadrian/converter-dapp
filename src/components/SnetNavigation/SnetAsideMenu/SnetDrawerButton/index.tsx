import React from "react";

interface Props {
    onCLick: () => void;
}

const SnetDrawerButton = ({ onCLick }: Props): React.ReactElement => {
    return (
        <React.Fragment>
            <button onClick={onCLick}>
                toggle
            </button>
        </React.Fragment>
    );
};

export default SnetDrawerButton;
