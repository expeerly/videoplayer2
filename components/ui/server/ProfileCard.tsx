import { RightArrowIcon } from "../../../assets/RightArrowIcon"; 
import { ProfileIcon } from "@/assets/Profile";

export default function ProfileCard() {
    return (
      <div className="flex items-center gap-4 py-5 bg-white  max-w-sm">
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <div className="w-full h-full object-cover"  aria-label="Profile avatar">
              <ProfileIcon />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className=" font-bold text-[#0E0E0F]">Marisa C.</h2>
            <RightArrowIcon className="w-2 h-3 text-gray-400" />
          </div>
          <p className="text-sm text-[#8D8B94]">38, Zurich (CH)</p>
        </div>
      </div>
    )
}
