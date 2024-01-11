import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { UserRegisterSchema } from "../types/user.types";

const Register: React.FC = () => {
  const navigate = useNavigate();
  type RegisterParams = z.infer<typeof UserRegisterSchema>;

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<RegisterParams>({ resolver: zodResolver(UserRegisterSchema) });

  const onSubmit: SubmitHandler<RegisterParams> = async (
    data: RegisterParams
  ) => {
    await axios
      .post("http://localhost:7000/api/register", data)
      .then((res) => {
        console.log(res.data);
        toast.success("Register Successful");
        navigate("/login");
        reset();
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.name, {
          message: error.response.data.message,
        });
      });
  };

  return (
    <div className=" fixed h-screen w-full flex justify-center items-center">
      <div className="px-10 w-full sm:w-[75%] rounded-md">
        <div className="flex justify-center items-center h-[600px]  shadow-2xl shadow-[#555555] rounded-xl">
          <div className="hidden md:block w-[60%] h-full rounded-md sm:rounded-l-xl">
            <div
              className={`w-full h-full bg-[#232323] text-white sm:rounded-l-xl flex justify-center items-center relative`}
            >
              <img src="https://www.chicmic.in/wp-content/uploads/2023/01/App_illustration.png" />
            </div>
          </div>
          <div
            className={`w-full md:w-[40%] sm:rounded-r-md bg-transparent h-full flex justify-center items-center relative`}
          >
            <div className=" absolute top-0 left-0 bottom-0 right-0 w-full h-full -z-10 bg-gradient-to-r to-[#aa77f0] via-[#aa77f0] from-[#bdb7f0] overflow-hidden sm:rounded-r-xl">
              <div
                className={`absolute -top-[5%] right-[65%] md:right-[80%] md:-top-[7%] lg:right-[70%] lg:-top-[1%] h-[95%] w-[115%] rounded-tr-[72px] rotate-45`}
              ></div>
            </div>
            <div className="w-[85%]">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4 w-full h-full bg-transparent"
              >
                <p className="text-transparent font-semibold text-2xl bg-gradient-to-b from-[#232323] via-[#3e3e3e]  to-[#414141] bg-clip-text">
                  SIGN UP
                </p>
                <div>
                  <label className="text-[#3c3c3c]">Email</label>
                  <input
                    placeholder="Email"
                    {...register("email")}
                    className={`mb-2 py-2 px-2 bg-opacity-10 border-0 border-b-2 border-[#888787]  focus:border-[#483366] focus:border-b-2 focus:outline-none  bg-black w-full`}
                  />
                  {errors.email && (
                    <span className="text-[#f34242] ">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="text-[#3c3c3c]">Full Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("fullName")}
                    className={`mb-2 py-2 px-2 bg-opacity-10 border-0 border-b-2 border-[#888787]  focus:border-[#483366] focus:border-b-2 focus:outline-none  bg-black w-full`}
                  />
                  {errors.fullName && (
                    <p className="text-red-400">{errors.fullName.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-[#3c3c3c]">Username</label>
                  <input
                    type="text"
                    placeholder="Username"
                    {...register("userName")}
                    className={`mb-2 py-2 px-2 bg-opacity-10 border-0 border-b-2 border-[#888787]  focus:border-[#483366] focus:border-b-2 focus:outline-none  bg-black w-full`}
                  />
                  {errors.userName && (
                    <p className="text-red-400">{errors.userName.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-[#3c3c3c]">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password")}
                    className={`mb-3 py-2 px-2 bg-opacity-10 border-0 border-b-2 border-[#888787]  focus:border-[#483366] focus:border-b-2 focus:outline-none bg-black w-full`}
                  />
                  {errors.password && (
                    <p className="text-red-400">{errors.password.message}</p>
                  )}
                </div>
                <div className="flex justify-center w-full">
                  <button
                    type="submit"
                    className="w-[90%] px-2 py-[10px] border-2 border-[#b3b3b3] bg-[#1a1919] bg-opacity-5 hover:bg-[#e9ebee] hover:bg-opacity-60  text-[#232323] rounded-md hover:shadow-lg hover:shadow-[#24243b]  hover:border-0 text-center"
                  >
                    SIGN UP NOW{" "}
                  </button>
                </div>
              </form>
              <div className="h-full text-center font-serif">
                <p className="py-7">
                  Already have an accout?
                  <span className="underline">
                    <Link to="/login">Sign in</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
