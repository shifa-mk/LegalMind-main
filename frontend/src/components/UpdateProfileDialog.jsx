import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/auth.slice"; 
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle} from "./ui/dialog";

// FIXED: Changed from /api/v1/user to /api/auth to match your backend router
const USER_API_END_POINT = "/api/auth"; 

// ... (imports remain the same)

export default function UpdateProfileDialog({ open, setOpen }) {
  const { user, token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  
  // 1. Keep this as 'fullname' to match your backend destructing
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
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (file) data.append("file", file);

    try {
      const res = await axios.put(`${USER_API_END_POINT}/update-profile`, data, {
        headers: { 
          "Authorization": `Bearer ${token}` 
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        setOpen(false);
      }
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader><DialogTitle>Update Police Profile</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            {/* FIXED: name must be 'fullname' exactly to match the state key */}
            <input 
              name="fullname" 
              value={formData.fullname} 
              onChange={handleChange} 
              placeholder="Full Name" 
              className="border p-2 rounded" 
            />
            <input 
              name="phoneNumber" 
              value={formData.phoneNumber} 
              onChange={handleChange} 
              placeholder="Phone Number" 
              className="border p-2 rounded" 
            />
          </div>
          {/* ... other inputs (ensure names match state keys) ... */}
          <div className="grid grid-cols-2 gap-4">
            <input name="rank" value={formData.rank} onChange={handleChange} placeholder="Rank" className="border p-2 rounded" />
            <input name="badgeNumber" value={formData.badgeNumber} onChange={handleChange} placeholder="Badge Number" className="border p-2 rounded" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input name="department" value={formData.department} onChange={handleChange} placeholder="Department" className="border p-2 rounded" />
            <input name="station" value={formData.station} onChange={handleChange} placeholder="Station" className="border p-2 rounded" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input name="region" value={formData.region} onChange={handleChange} placeholder="Region" className="border p-2 rounded" />
            <input name="yearsOfService" value={formData.yearsOfService} onChange={handleChange} placeholder="Years of Service" className="border p-2 rounded" />
          </div>
          <input type="file" accept="image/*" onChange={handleFileChange} className="border p-1 text-sm rounded" />
          <Button type="submit" className="w-full bg-blue-600">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}