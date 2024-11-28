import React from "react";
import Logo from "../icons/Logo";

type Props = {};

const CompanyLogo = (props: Props) => {
  return (
    <div className="h-12 w-12 flex justify-center items-center">
      <Logo />
    </div>
  );
};

export default CompanyLogo;
