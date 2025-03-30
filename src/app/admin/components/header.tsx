import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import UserProfile from "@/app/components/header/userprofile";
import CountryFlag from "@/app/components/header/CountryFlags";
import HeaderSearch from "@/app/components/header/HeaderSearch";
import HeaderTitle from "@/app/components/header/HeaderTitle";
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
            icon={
              <HomeRoundedIcon
                sx={{ fontSize: "30px" }}
                className="text-white"
              />
            }
            onToggleMenu={onToggleMenu}
            pageTitle={"Dashboard"}
          />
          <div className="flex gap-6 items-center">
            <HeaderSearch />
            <CountryFlag countryCode="US" />
            <div className="flex gap-4 items-center">
              <div className="relative flex items-center justify-center h-[45px] w-[45px] bg-white rounded-[20%]">
                <div className="absolute bg-red-400 h-2 w-2 top-2 right-2 rounded-full" />
                <NotificationsNoneOutlinedIcon
                  sx={{ fontSize: "30px" }}
                  className="text-[#FFA412]"
                />
              </div>

              <UserProfile userName="musfiq" role="admin " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
