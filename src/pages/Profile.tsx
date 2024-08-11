///Profile.tsx
import { useEffect, useState } from "react";
import { userDetails } from "../services/auth";
import { RegisterUser } from "../@types/types";
import { motion } from 'framer-motion';
import { fadeIn } from './veriants';
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState<RegisterUser | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/crm');
    };

    useEffect(() => {
        const userId = localStorage.getItem("user_id");

        if (userId) {
            userDetails(userId)
                .then((res) => {
                    setUser(res.data);
                    setError(null);
                })
                .catch((e) => {
                    console.error(e);
                    setError("Failed to fetch user details.");
                });
        } else {
            setError("User ID not found in local storage.");
        }
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>Loading user data...</div>;
    }

    return (
        <motion.div
            variants={fadeIn("up", 0.25)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className="shadow-md rounded mb-5 flex flex-col md:flex-row md:px-28  md:gap-44  mt-5 dark:border">
            <div>
                <h2 className="mt-8  text-2xl leading-9 tracking-tight text-gray-900 dark:text-white">
                    User Profile
                </h2>
                <div className="flex flex-col justify-end items-center px-6 py-8 lg:px-8 gap-4">
                    <p className="dark:text-white">
                        {user.name.first} {user.name.middle} {user.name.last}
                    </p>

                    <div className="dark:text-white w-80 text-left p-6 my-4">
                        <p>Phone: {user.phone}</p>
                        <p>Mail: {user.email}</p>
                        <p>State: {user.address.state}</p>
                        <p>Country: {user.address.country}</p>
                        <p>City: {user.address.city}</p>
                        <p>Street: {user.address.street}</p>
                        <p>House Number: {user.address.houseNumber}</p>
                        <p>Zip: {user.address.zip}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center mt-3">
                <p className="my-6 text-center text-2xl font-mono leading-9 tracking-tight text-gray-900 dark:text-white">
                    Ready To Get Access
                </p>
                <p className="text-center text-sm text-gray-500 mb-5 dark:text-white">
                    Data, Driven, Workflows{' '}
                </p>
                {isAdmin && (
                    <button
                        className='my-10 py-2 px-10 bg-blue-500 text-white rounded hover:bg-blue-400'
                        onClick={handleNavigate}
                    >
                        CRM Dashboard
                    </button>
                )}
                <button
                    className="mb-4 py-2 px-14 bg-blue-500 text-white rounded hover:bg-blue-400"
                    onClick={() => navigate(`/profile/${user._id}`, { state: { user } })}
                >
                    Update User
                </button>
            </div>
        </motion.div>
    );
};

export default Profile;
