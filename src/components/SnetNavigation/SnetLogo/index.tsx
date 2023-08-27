import { Link } from "@mui/material";
import { paths } from "../../../utils/constants/constants";
// import { ReactComponent as logo } from "./../../../assets/images/";
import React from "react";

const SnetLogo = (): React.ReactElement => {
    return (
        <React.Fragment>
            <Link href={paths.CONVERTER} className="nav-element">
                Logo
                {/* <img src={logo} alt="SingularityNet bridge" /> */}
            </Link>
        </React.Fragment>
    );
};

export default SnetLogo;
