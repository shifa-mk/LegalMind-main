import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import api from "../utils/axios";

export default function Signup() {
  const [form, setForm] = useState({ username: "", password: "", role: "" }); // changed
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/api/auth/signup", form); // just call it
      toast.success("Signup successful! Please login.");
      navigate("/login");

    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#FFF0DD" }}
    >
      <form
        className="w-1/2 max-w-md rounded-md p-6 shadow-lg"
        style={{ backgroundColor: "#D1D3D4" }}
        onSubmit={handleSignup}
      >
        <h1
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: "#E2A16F" }}
        >
          Sign Up
        </h1>

        {/* Username */}
        <div className="mb-4">
          <Label className="block mb-1" style={{ color: "black" }}>
            Username
          </Label>
          <Input
            type="text"
            name="username"
            value={form.username}
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
            value={form.password}
            onChange={changeHandler}
            placeholder="Enter password"
            className="w-full p-2 rounded"
            style={{ border: "1px solid #86B0BD", color: "black" }}
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <Label className="block mb-1" style={{ color: "black" }}>
            Role
          </Label>
          <select
            name="role"
            value={form.role}
            onChange={changeHandler}
            className="w-full p-2 rounded"
            style={{ border: "1px solid #E2A16F", color: "black" }}
          >  <option value="">Select role</option>
            <option value="police">Police</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Button */}
        {loading ? (
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
            Sign Up
          </Button>
        )}

        {/* Link to Login */}
        <p className="text-sm text-center mt-4" style={{ color: "black" }}>
          Already have an account?{" "}
          <Link
            to="/"
            style={{
              color: "#E2A16F",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
