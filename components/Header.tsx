import Image from "next/image";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { SettingsToggle } from "./Settings";

const Header = () => {
  return (
    <header className=" bg-[#ffd924]">
      <div className="flex items-center justify-between max-w-3xl mx-auto p-2">
        <Image src="/bee.png" alt="Bee Icon" width={40} height={40} />
        <div className="flex items-center justify-center space-x-3">
          <SettingsToggle />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
