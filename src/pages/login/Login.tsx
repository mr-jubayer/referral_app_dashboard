import { Button } from "@/components/ui/button";
import axios from "axios";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "../../components/ui/input";
import useAuth from "../../hooks/useAuth";

interface FormDataType {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChangeData = (name: "string", e: React.ChangeEvent) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const loginResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`,
        { ...formData }
      );

      const data = loginResponse.data.data;

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.accessToken));

      setUser(data.user);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex items-center justify-center  p-4 min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md p-6">
        <div className="">
          <h2 className="text-3xl  text-center text-gray-900 mb-2 font-semibold">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Please log in to Manage <span className="font-medium">Refero</span>
          </p>

          <form onSubmit={handleSubmitLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative ">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  onChange={(e) => handleChangeData("email", e)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => handleChangeData("password", e)}
                />
              </div>
            </div>

            <div>
              <Button className="w-full cursor-pointer"> Sign In </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
