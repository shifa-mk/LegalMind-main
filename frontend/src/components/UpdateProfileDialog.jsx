import { useState } from "react";
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

// Use your existing constant
const USER_API_END_POINT = "/api/auth"; 

export default function UpdateProfileDialog({ open, setOpen }) {
  const { user, token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  
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

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files?.[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Prevent double-clicking
    
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (file) data.append("file", file);

   try {
  const res = await axios.put(`${USER_API_END_POINT}/update-profile`, data, {
    headers: { 
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}` 
    },
    withCredentials: true,
  });

  console.log("Full Server Response:", res.data); // DEBUG LOG

  if (res.data.success) {
    dispatch(setUser(res.data.user));
    setOpen(false);
    toast.success("Update successful!");
  } else {
    // If the server returns success: false, the button will just revert
    console.error("Server rejected update:", res.data.message);
    toast.error(res.data.message);
  }
} catch (error) {
  // This will catch the 400/500 errors
  console.error("Axios Error:", error.response?.data || error.message);
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[450px] bg-white">
        <DialogHeader>
          <DialogTitle>Update Police Profile</DialogTitle>
          {/* CRITICAL: Adding this fixes the console error blocking your click */}
          <DialogDescription>
            Enter your updated credentials below.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <input name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Full Name" className="border p-2 rounded text-black" />
            <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone" className="border p-2 rounded text-black" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input name="rank" value={formData.rank} onChange={handleChange} placeholder="Rank" className="border p-2 rounded text-black" />
            <input name="badgeNumber" value={formData.badgeNumber} onChange={handleChange} placeholder="Badge" className="border p-2 rounded text-black" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input name="department" value={formData.department} onChange={handleChange} placeholder="Department" className="border p-2 rounded text-black" />
            <input name="station" value={formData.station} onChange={handleChange} placeholder="Station" className="border p-2 rounded text-black" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input name="region" value={formData.region} onChange={handleChange} placeholder="Region" className="border p-2 rounded text-black" />
            <input name="yearsOfService" value={formData.yearsOfService} onChange={handleChange} placeholder="Years" className="border p-2 rounded text-black" />
          </div>
          <input type="file" accept="image/*" onChange={handleFileChange} className="border p-1 text-sm rounded" />
          
          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
