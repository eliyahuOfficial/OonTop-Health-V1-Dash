///Login.tsx
import { useForm } from "react-hook-form"
import { LoginUser } from "../@types/types"
import patterns from "../validation/patterns"
import { useState } from "react"
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import auth from "../services/auth";
import dialogs, { showSuccessDialog } from "../ui/dialogs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";





const Login = () => {
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate();
    const { login } = useAuth();


    const onLogin = (data: LoginUser) => {
        auth
            .login(data)
            .then((res) => {
                login(res.data);

                showSuccessDialog("Login", "Logged in")
                    .then(() => {
                        login(res.data);
                        navigate("/dashboard");
                    })

            })
            .catch((e) => {
                dialogs.error("Login Error", e.response.data);
            });
    };
    const { register, handleSubmit, formState: { errors } } = useForm<LoginUser>()

    return (
        <div >
            <h2 className="mt-8 text-center text-2xl  leading-9 tracking-tight text-gray-900  dark:text-white" >Enter To Your Account</h2>
            <form noValidate onSubmit={handleSubmit(onLogin)}
                className="flex  flex-col justify-end items-center px-6 py-12 lg:px-8 gap-4"
            >

                <input

                    autoCapitalize="true"
                    autoCorrect="false"
                    autoComplete="email"
                    className="custom-input-reg"
                    placeholder="Email"
                    type="email"
                    {...register("email", {
                        required: "This field is mandatory",
                        pattern: patterns.email
                    })}
                />
                {errors.email && <p>{errors.email?.message}</p>}


                <div className="custom-input-container">
                    <input

                        className="custom-input-reg"
                        placeholder="Password"
                        type={showPassword ? `text` : `password`}
                        autoComplete="current-password"
                        {...register("password", {
                            required: "This field is mandatory",
                            pattern: patterns.password,

                        })}
                    />
                    <button
                        type="button"
                        onClick={() => {
                            setShowPassword((s) => !s);
                        }}
                        className="input-button"
                    >
                        {showPassword ? <VscEyeClosed /> : <VscEye />}
                    </button>

                </div>
                {errors.password && (
                    <p className="text-red-500 w-56">{errors.password?.message}</p>
                )}

                <button type="submit" className=" bg-blue-500 text-white rounded px-14 py-2 my-10">Login</button>
            </form>

        </div>
    )
}

export default Login