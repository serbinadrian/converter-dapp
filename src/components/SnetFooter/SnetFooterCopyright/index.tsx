import React from "react";

const SnetFooterCopyright = (): React.ReactElement => {
    const year = new Date().getFullYear();
    return (
        <React.Fragment>
            <hr className="footer-divider"/>
            <h1>{year}</h1>
        </React.Fragment>
    );
};

export default SnetFooterCopyright;