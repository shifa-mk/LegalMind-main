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

const USER_API_END_POINT = "/api/auth"; 

export default function UpdateProfileDialog({ open, setOpen }) {
  const { user, token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  
  const [formData, setFormData] = useState({
    fullname: "", 
    phoneNumber: "",
    rank: "",
    badgeNumber: "",
    department: "",
    station: "",
    region: "",
    yearsOfService: "",
  });

  // Update form data only when the dialog opens or user data is finally fetched
  useEffect(() => {
    if (open && user) {
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
  }, [open, user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => setFile(e.target.files?.[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // FORCED LOGGING - If this doesn't show in console, look for the Alert
    console.log("%c SUBMIT EVENT TRIGGERED", "color: blue; font-size: 20px");
    if (process.env.NODE_ENV === "development") window.alert("Submit Started!");

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
    if (file) data.append("file", file);

    try {
      const res = await axios.put(`${USER_API_END_POINT}/update-profile`, data, {
        headers: { 
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}` 
        },
        withCredentials: true,
      });

      console.log("SUCCESS LOG:", res.data);

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("Profile updated successfully");
        setOpen(false);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Internal Server Error";
      console.error("CATCH LOG ERROR:", error.response?.data || error.message);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
      console.log("SUBMIT FINISHED");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[450px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-black">Update Police Profile</DialogTitle>
          <DialogDescription>
            Provide your updated official details below.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <input name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Full Name" className="border p-2 rounded text-black border-gray-300" required />
            <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone" className="border p-2 rounded text-black border-gray-300" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input name="rank" value={formData.rank} onChange={handleChange} placeholder="Rank" className="border p-2 rounded text-black border-gray-300" />
            <input name="badgeNumber" value={formData.badgeNumber} onChange={handleChange} placeholder="Badge" className="border p-2 rounded text-black border-gray-300" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input name="department" value={formData.department} onChange={handleChange} placeholder="Department" className="border p-2 rounded text-black border-gray-300" />
            <input name="station" value={formData.station} onChange={handleChange} placeholder="Station" className="border p-2 rounded text-black border-gray-300" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input name="region" value={formData.region} onChange={handleChange} placeholder="Region" className="border p-2 rounded text-black border-gray-300" />
            <input name="yearsOfService" value={formData.yearsOfService} onChange={handleChange} placeholder="Years" className="border p-2 rounded text-black border-gray-300" />
          </div>
          
          <input type="file" accept="image/*" onChange={handleFileChange} className="border p-1 text-sm rounded text-black" />
          
          <Button type="submit" disabled={loading} className="w-full bg-blue-700 hover:bg-blue-800 text-white">
            {loading ? <><Loader2 className="animate-spin h-4 w-4 mr-2" /> Updating...</> : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
