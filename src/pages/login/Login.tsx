import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Lock, Mail, XIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "../../components/ui/input";

export default function Login() {
  return (
    <AlertDialog className="relative">
      <AlertDialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <InputFields /> {/** mine */}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="absolute top-2 right-2 cursor-pointer rounded-full h-7 w-7">
            <XIcon />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface FormDataType {
  email: string;
  password: string;
}

function InputFields() {
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
  });

  const handleChangeData = (name: "sting", e: React.ChangeEvent) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const loginResponse = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`,
      { ...formData }
    );

    console.log(loginResponse);
  };

  return (
    <div className=" flex items-center justify-center  p-4">
      <div className="w-full max-w-md">
        <div className="">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Please log in to continue.
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
