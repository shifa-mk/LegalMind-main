import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Bell, LogOut, User2, LayoutDashboard, BookText } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant.js";
import { setUser } from "../redux/auth.slice.js";

// Helper for Cloudinary URLs
const getCloudinaryUrl = (publicId) =>
  `https://res.cloudinary.com/dihk6mdzv/image/upload/${publicId}`;

export default function Navbar() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      dispatch(setUser(null));
      localStorage.removeItem("token"); 
      localStorage.removeItem("user");
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      dispatch(setUser(null));
      localStorage.clear();
      toast.error(error?.response?.data?.message || "Logout failed");
      navigate("/");
    }
  };

  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/ask", label: "Ask AI", icon: User2 },
    { to: "/sections", label: "Sections", icon: BookText },
  ];

  return (
    <div className="bg-blue-900 text-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-16 px-4">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 hover:opacity-90">
          ⚖️ <span className="tracking-tight">LegalMind</span>
        </Link>

        {/* Navigation Links - Show if user data is present */}
        {user && user.fullname && (
          <ul className="hidden md:flex font-medium items-center gap-6">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <Link to={to} className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                  {Icon && <Icon className="w-4 h-4" />} {label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-4">
          {/* CRITICAL LOGIC FIX: 
            Only show Login/Signup if we have NEITHER a token NOR a user.
            This prevents the "swapped logic" look in image_a585c0.png.
          */}
          {!token && !user ? (
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-900">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-red-600 hover:bg-red-700 text-white border-none">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
                    <Bell className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <h4 className="font-medium border-b pb-2 mb-2 text-black">Notifications</h4>
                  <p className="text-sm text-muted-foreground text-center py-4">No new activity</p>
                </PopoverContent>
              </Popover>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-amber-400/30">
                    <Avatar className="h-10 w-10">
                      {user?.profile?.avatar ? (
                        <AvatarImage
                          src={user.profile.avatar.startsWith("http") 
                               ? user.profile.avatar 
                               : getCloudinaryUrl(user.profile.avatar)}
                          alt={user.fullname || "User"}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-amber-500 text-white font-bold">
                          {/* Fallback to first initial if no image exists */}
                          {user?.fullname?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                     
                      <p className="text-xs leading-none text-muted-foreground">{user?.username}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/profile" className="flex w-full items-center">
                      <User2 className="mr-2 h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={logoutHandler}>
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}