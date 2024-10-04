import { UserButton } from "@clerk/nextjs";
import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  return (
    <div
      className="
      flex 
      items-center
      justify-between
      px-8
      h-[80px]
      "
    >
      <h3 className="font-extrabold text-transparent bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-xl">RemindMe</h3>
      <ul className="flex gap-x-3 items-center">
        <UserButton signInUrl="/sign-in"></UserButton>
        <ThemeSwitcher></ThemeSwitcher>
      </ul>
    </div>
  );
};

export default Navbar;
