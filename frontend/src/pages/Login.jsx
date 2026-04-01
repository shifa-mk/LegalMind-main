import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// FIX: Corrected relative import paths. Assuming direct access for now.
import { Label } from "../components/ui/label"; 
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
// FIX: Corrected relative import paths.
import api, { setAuthToken } from "../utils/axios"; 
import { setUser, setLoading } from "../redux/auth.slice";
// FIX: Added useSelector to retrieve Redux loading state, which was missing.
import { useDispatch, useSelector } from "react-redux"; 

export default function Login() {
  const [input, setInput] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve Redux loading state here
  const { loading: isLoadingRedux } = useSelector((state) => state.auth); 

  const changeHandler = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));

      const { data } = await api.post("/api/auth/login", input);

      const userPayload = data.user || (data.username ? { _id: data._id, username: data.username, role: data.role } : null);

     if (data.token && userPayload) {
  setAuthToken(data.token);
  
  // Pass BOTH the user and the token to Redux
  dispatch(setUser({
    user: userPayload,
    token: data.token
  }));
  
  toast.success("✅ Successfully logged in!");
  navigate("/dashboard");
}
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#FFF0DD" }}>
      <form
        className="w-1/2 max-w-md rounded-md p-6 shadow-lg"
        style={{ backgroundColor: "#D1D3D4" }}
        onSubmit={handleLogin}
      >
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: "#E2A16F" }}>
          Login
        </h1>

        {/* Username */}
        <div className="mb-4">
          <Label className="block mb-1" style={{ color: "black" }}>
            Username
          </Label>
          <Input
            type="text"
            name="username"
            value={input.username}
            onChange={changeHandler}
            placeholder="Enter username"
            className="w-full p-2 rounded"
            style={{ border: "1px solid #86B0BD", color: "black" }}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <Label className="block mb-1" style={{ color: "black" }}>
            Password
          </Label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeHandler}
            placeholder="Enter password"
            className="w-full p-2 rounded"
            style={{ border: "1px solid #86B0BD", color: "black" }}
          />
        </div>

        {/* Button */}
        {isLoadingRedux ? ( 
          <Button
            className="w-full my-4 font-bold"
            style={{ backgroundColor: "#E2A16F", color: "#FFF0DD" }}
            disabled
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full my-4 font-bold"
            style={{ backgroundColor: "#E2A16F", color: "#FFF0DD" }}
          >
            Login
          </Button>
        )}

        <p className="text-sm text-center mt-4" style={{ color: "black" }}>
          Don’t have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#E2A16F",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
