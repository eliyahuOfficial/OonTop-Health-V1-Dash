import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RegisterUser } from "../@types/types";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { userDetails, editUser } from "../services/auth";
import dialogs from "../ui/dialogs";
import patterns from "../validation/patterns";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { fadeIn } from './veriants';


const UserEdit = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<RegisterUser>();

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [isBusiness, setIsBusiness] = useState(false);
    const userId = localStorage.getItem("user_id");
    const onEdit = (data: RegisterUser) => {
        if (userId) {
            editUser(data, userId)
                .then((res) => {
                    localStorage.setItem("user_id", res.data._id);
                    setIsBusiness(res.data.isBusiness);
                    dialogs.create("Success", "User edited successfully").then(() => {
                        navigate("/profile");
                    });
                })
                .catch((e) => {
                    dialogs.error("Error", e.response.data);
                });
        } else {
            dialogs.error("Error", "User ID is missing");
        }
    };

    useEffect(() => {
        if (userId) {
            //@ts-ignore
            userDetails(userId)
                .then((res) => {
                    setValue("name.first", res.data.name.first);
                    setValue("name.middle", res.data.name.middle);
                    setValue("name.last", res.data.name.last);
                    setValue("phone", res.data.phone);
                    setValue("email", res.data.email);
                    setValue("password", res.data.password);
                    setValue("address.state", res.data.address.state);
                    setValue("address.country", res.data.address.country);
                    setValue("address.city", res.data.address.city);
                    setValue("address.street", res.data.address.street);
                    setValue("address.houseNumber", res.data.address.houseNumber);
                    setValue("address.zip", res.data.address.zip);
                    setValue("isBusiness", res.data.isBusiness);
                })
                .catch((err) => console.log(err));
        } else {
            dialogs.error("Error", "User ID is missing");
        }
    }, [userId, setValue]);

    const handleBusinessCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsBusiness(e.target.checked);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl  mb-4 dark:text-white">
                Update User
            </h2>
            <motion.div
                variants={fadeIn("up", 0.25)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.3 }}
                className="shadow-md rounded mb-5 dark:bg-slate-700 dark:border"
            >
                <div>

                    <form noValidate onSubmit={handleSubmit(onEdit)} className="flex flex-col justify-end items-center px-6 py-12 lg:px-8 gap-8">
                        <input
                            className="custom-input-reg"
                            placeholder="First Name"
                            type="text"
                            {...register("name.first", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 20, message: "Too long" },
                            })}
                        />
                        {errors.name?.first && (
                            <p className="text-red-500">{errors.name.first.message}</p>
                        )}
                        <input
                            className="custom-input-reg"
                            placeholder="Middle Name"
                            type="text"
                            {...register("name.middle", {
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 20, message: "Too long" },
                            })}
                        />
                        {errors.name?.middle && (
                            <p className="text-red-500">{errors.name.middle.message}</p>
                        )}
                        <input
                            className="custom-input-reg"
                            placeholder="Last Name"
                            type="text"
                            {...register("name.last", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                        />
                        {errors.name?.last && (
                            <p className="text-red-500">{errors.name.last.message}</p>
                        )}
                        <input
                            className="custom-input-reg"
                            placeholder="Phone"
                            type="tel"
                            {...register("phone", {
                                required: "This field is mandatory",
                                minLength: { value: 9, message: "Too short" },
                                maxLength: { value: 11, message: "Too long" },
                            })}
                        />
                        {errors.phone && (
                            <p className="text-red-500">{errors.phone.message}</p>
                        )}
                        <input
                            className="custom-input-reg"
                            placeholder="Email"
                            type="email"
                            autoComplete="current-email"
                            {...register("email", {
                                required: "This field is mandatory",
                                pattern: {
                                    value: patterns.email,
                                    message: "Invalid email",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500">{errors.email.message}</p>
                        )}
                        <div className="custom-input-container">
                            <input
                                className="custom-input-reg"
                                placeholder="Password"
                                type={showPassword ? `text` : `password`}
                                autoComplete="current-password"
                                {...register("password", {
                                    required: "This field is mandatory",
                                    pattern: {
                                        value: patterns.password,
                                        message:
                                            "Password must be at least 9 characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-",
                                    },
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
                            <p className="text-red-500">{errors.password.message}</p>
                        )}

                        <input
                            className="custom-input-reg"
                            placeholder="State"
                            type="text"
                            {...register("address.state", {
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                        />
                        {errors.address?.state && (
                            <p className="text-red-500">{errors.address.state.message}</p>
                        )}
                        <input
                            className="custom-input-reg"
                            placeholder="Country"
                            type="text"
                            {...register("address.country", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                        />
                        {errors.address?.country && (
                            <p className="text-red-500">{errors.address.country.message}</p>
                        )}
                        <input
                            className="custom-input-reg"
                            placeholder="City"
                            type="text"
                            {...register("address.city", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                        />
                        {errors.address?.city && (
                            <p className="text-red-500">{errors.address.city.message}</p>
                        )}
                        <input
                            className="custom-input-reg"
                            placeholder="Street"
                            type="text"
                            {...register("address.street", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                        />
                        {errors.address?.street && (
                            <p className="text-red-500">{errors.address.street.message}</p>
                        )}
                        <input
                            className="custom-input-reg"
                            placeholder="House Number"
                            type="text"
                            {...register("address.houseNumber", {
                                required: "This field is mandatory",
                                minLength: { value: 1, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                        />
                        {errors.address?.houseNumber && (
                            <p className="text-red-500">{errors.address.houseNumber.message}</p>
                        )}
                        <input
                            className="custom-input-reg"
                            placeholder="ZIP"
                            type="text"
                            {...register("address.zip", {
                                required: "This field is mandatory",
                                minLength: { value: 2, message: "Too short" },
                                maxLength: { value: 255, message: "Too long" },
                            })}
                        />
                        {errors.address?.zip && (
                            <p className="text-red-500">{errors.address.zip.message}</p>
                        )}
                        <div className="checkbox-field dark:text-white">
                            <label htmlFor="business-checkbox">Business User : </label>
                            <input
                                id="business-checkbox"
                                type="checkbox"
                                checked={isBusiness}
                                {...register("isBusiness")}
                                onChange={handleBusinessCheckboxChange}
                            />
                        </div>
                        <button type="submit" className=" bg-blue-500 hover:bg-blue-400 text-white rounded px-14 py-2 my-10">Edit</button>
                    </form>
                </div>

            </motion.div>
        </div>
    );
};

export default UserEdit;
