import { capitalizeFirstChar } from "@/utils/utils";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import Image from "next/image";

interface UserProps {
  userName: string;
  role: string;
}
const UserProfile = (props: UserProps) => {
  const { userName, role } = props;
  const updatedUserName = capitalizeFirstChar(userName);
  const updatedRole = capitalizeFirstChar(role);
  return (
    <div className="flex items-center gap-4">
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
            {updatedUserName}
          </div>
          <div className="text-[14px] font-normal text-center leading-[20px]">
            {updatedRole}
          </div>
        </div>
        <KeyboardArrowDownRoundedIcon
          className="text-[#A098AE]"
          sx={{ fontSize: "30px", padding: "0px" }}
        />
      </div>
    </div>
  );
};

export default UserProfile;
