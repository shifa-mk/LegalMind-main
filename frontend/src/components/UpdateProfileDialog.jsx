import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/auth.slice"; 
import { Button } from "./ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "./ui/dialog";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../utils/constant";

export default function UpdateProfileDialog({ open, setOpen }) {
  const { user, token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  
  // Initialize state with existing user data
  const [formData, setFormData] = useState({
    fullname: user?.fullname || "", 
    phoneNumber: user?.phoneNumber || "",
    rank: user?.profile?.rank || "",
    badgeNumber: user?.profile?.badgeNumber || "",
    department: user?.profile?.department || "",
    station: user?.profile?.station || "",
    region: user?.profile?.region || "",
    yearsOfService: user?.profile?.yearsOfService || "",
  });

  // Sync state if user object updates
  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || "",
        phoneNumber: user.phoneNumber || "",
        rank: user.profile?.rank || "",
        badgeNumber: user.profile?.badgeNumber || "",
        department: user.profile?.department || "",
        station: user.profile?.station || "",
        region: user.profile?.region || "",
        yearsOfService: user.profile?.yearsOfService || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files?.[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("fullname", formData.fullname);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("rank", formData.rank);
    data.append("badgeNumber", formData.badgeNumber);
    data.append("department", formData.department);
    data.append("station", formData.station);
    data.append("region", formData.region);
    data.append("yearsOfService", formData.yearsOfService);
    
    if (file) {
      data.append("file", file);
    }

    try {
      // Note: Ensure USER_API_END_POINT is "/api/auth" or similar
      const res = await axios.put(`${USER_API_END_POINT}/update-profile`, data, {
        headers: { 
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}` 
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message || "Profile updated!");
        setOpen(false);
      }
    } catch (error) {
      console.error("Update Error Details:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[450px] bg-white" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Update Police Profile</DialogTitle>
          <DialogDescription>
            Modify your official credentials. Click save to apply changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-black">Full Name</label>
              <input 
                name="fullname" 
                value={formData.fullname} 
                onChange={handleChange} 
                className="w-full border p-2 rounded text-black text-sm" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-black">Phone Number</label>
              <input 
                name="phoneNumber" 
                value={formData.phoneNumber} 
                onChange={handleChange} 
                className="w-full border p-2 rounded text-black text-sm" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-black">Rank</label>
              <input name="rank" value={formData.rank} onChange={handleChange} className="w-full border p-2 rounded text-black text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-black">Badge Number</label>
              <input name="badgeNumber" value={formData.badgeNumber} onChange={handleChange} className="w-full border p-2 rounded text-black text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-black">Department</label>
              <input name="department" value={formData.department} onChange={handleChange} className="w-full border p-2 rounded text-black text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-black">Station</label>
              <input name="station" value={formData.station} onChange={handleChange} className="w-full border p-2 rounded text-black text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-black">Region</label>
              <input name="region" value={formData.region} onChange={handleChange} className="w-full border p-2 rounded text-black text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-black">Experience (Years)</label>
              <input name="yearsOfService" value={formData.yearsOfService} onChange={handleChange} className="w-full border p-2 rounded text-black text-sm" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-black">Profile Picture</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border p-1 text-sm rounded cursor-pointer" />
          </div>

          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-blue-700 hover:bg-blue-800 text-white mt-4"
          >
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</> : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
