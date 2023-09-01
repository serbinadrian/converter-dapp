import React from "react";
import SnetFooterColumns from "./SnetFooterColumns";
import SnetFooterCopyright from "./SnetFooterCopyright";

const SnetFooter = (): React.ReactElement => {
    return (
        <React.Fragment>
            <SnetFooterColumns />
            <SnetFooterCopyright />
        </React.Fragment>
    );
};

export default SnetFooter;
