import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { US, IN, NP } from "country-flag-icons/react/3x2";
import HeaderSearch from "./HeaderSearch";
import { Component } from "react";
import CountryFlag from "./CountryFlags";
import HeaderTitle from "./HeaderTitle";
import Image from "next/image";
interface HeaderProps {
  icon: React.ReactNode;
  pageTitle: string;
  onToggleMenu: () => void;
}

const Header = (props: HeaderProps) => {
  const { icon, pageTitle, onToggleMenu } = props;
  return (
    <div className="relative min-h-[376px] bg-[#287AFF] rounded-b-[12px] w-full">
      <div className="flex flex-col absolute top-4 right-0  min-w-[calc(100vw-285px)] pl-4 pr-12">
        <div className="flex h-[60px] w-full items-center justify-between">
          <HeaderTitle
            icon={<HomeRoundedIcon className="text-white" />}
            onToggleMenu={onToggleMenu}
            pageTitle={"Dashboard"}
          />
          <div className="flex gap-4">
            <HeaderSearch />
            <CountryFlag countryCode="US" />
            <div className="flex gap-4 items-center">
              <div className="relative flex items-center justify-center h-[48px] w-[48px] bg-white rounded-[20%]">
                <div className="absolute bg-red-400 h-2 w-2 top-2 right-2 rounded-full" />
                <NotificationsNoneOutlinedIcon
                  sx={{ fontSize: "30px" }}
                  className="text-[#FFA412]"
                />
              </div>

              <div className="flex items-center gap-5">
                <Image
                  className="rounded-2xl"
                  src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                  alt="Musfiq"
                  width={60}
                  height={60}
                />
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col text-white justify-center">
                    <div className="text-[16px] font-medium text-center leading-[24px]">
                      Musfiq
                    </div>
                    <div className="text-[14px] font-normal text-center leading-[20px]">
                      Admin
                    </div>
                  </div>
                  <KeyboardArrowDownRoundedIcon
                    className="text-[#A098AE]"
                    sx={{ fontSize: "30px", padding: "0px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
