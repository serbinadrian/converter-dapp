import React from "react";
import "./style.css";

const SnetFooterCopyright = (): React.ReactElement => {
    const year = new Date().getFullYear();
    return (
        <React.Fragment>
            <hr className="footer-divider" />
            <p className="copyright-text">
                Copyright © {year} SingularityNET All rights reserved.
            </p>
        </React.Fragment>
    );
};

export default SnetFooterCopyright;
