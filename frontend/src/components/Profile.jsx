import { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"; // Added AvatarFallback
import { Button } from "./ui/button";
import { Phone, BadgeCheck, Building2, Globe, Shield, User as UserIcon } from "lucide-react"; 
import UpdateProfileDialog from "./UpdateProfileDialog";
import AuditLogs from "./TempLogs";

export default function Profile() {
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);

  // Directly use the avatar URL from the profile object. No default image link.
  const avatarUrl = user?.profile?.avatar;

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="max-w-5xl mx-auto mt-6 p-8 bg-white shadow-lg rounded-2xl">
        <div className="flex justify-between items-center mb-10 border-b pb-8">
          <div className="flex items-center gap-6">
            <Avatar className="h-32 w-32 border-4 border-blue-100 shadow-sm">
              <AvatarImage src={avatarUrl} alt={user?.fullname} className="object-cover" />
              {/* This shows a professional icon if there is no photo */}
              <AvatarFallback className="bg-blue-50">
                <UserIcon className="h-16 w-16 text-blue-400" />
              </AvatarFallback>
            </Avatar>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user?.fullname || "Officer Name"}</h1>
              <p className="text-blue-600 font-semibold text-lg uppercase tracking-wide">
                {user?.profile?.rank || "Police Officer"}
              </p>
              <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
                <BadgeCheck size={14} /> Badge: {user?.profile?.badgeNumber || "N/A"}
              </p>
            </div>
          </div>

          <Button variant="outline" onClick={() => setOpen(true)} className="hover:bg-blue-50 border-blue-200 text-blue-700">
            Update Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 px-4">
          <DetailItem icon={<Phone className="text-blue-600" />} label="Phone Number" value={user?.phoneNumber} />
          <DetailItem icon={<Building2 className="text-red-600" />} label="Police Station" value={user?.profile?.station} />
          <DetailItem icon={<Shield className="text-amber-600" />} label="Department" value={user?.profile?.department} />
          <DetailItem icon={<Globe className="text-green-600" />} label="Region" value={user?.profile?.region} />
          <DetailItem icon={<BadgeCheck className="text-indigo-600" />} label="Official Rank" value={user?.profile?.rank} />
          <DetailItem icon={<Shield className="text-purple-600" />} label="Experience" value={user?.profile?.yearsOfService ? `${user.profile.yearsOfService} Years` : "N/A"} />
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8">
        <AuditLogs />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors">{icon}</div>
      <div>
        <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">{label}</p>
        <span className="text-gray-700 font-semibold">{value || "N/A"}</span>
      </div>
    </div>
  );
}