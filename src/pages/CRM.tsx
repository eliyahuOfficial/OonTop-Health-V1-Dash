///CRM.tsx
import React, { useState, useEffect } from "react";
import { deleteUser, getUsers } from "../services/auth";
import { RegisterUser } from "../@types/types";
import { useAuth } from "../hooks/useAuth";
import { RiDeleteBin5Line } from "react-icons/ri";
import { showErrorDialog } from "../ui/dialogs";

const CRM: React.FC = () => {
    const [users, setUsers] = useState<RegisterUser[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { isAdmin } = useAuth();
    const [userCount, setUserCount] = useState<number>(0);
    const [businessUserCount, setBusinessUserCount] = useState<number>(0);
    const [clientUserCount, setClientUserCount] = useState<number>(0);

    useEffect(() => {
        if (isAdmin) {
            getUsers()
                .then(response => {
                    setUsers(response.data);
                    calculateUserCounts(response.data);
                })
                .catch(error => {
                    setError(error.message);
                });
        }
    }, [isAdmin]);

    const calculateUserCounts = (users: RegisterUser[]) => {
        const totalUsers = users.length;
        const totalBusinessUsers = users.filter(user => user.isBusiness).length;
        const totalClientUsers = totalUsers - totalBusinessUsers;
        setUserCount(totalUsers);
        setBusinessUserCount(totalBusinessUsers);
        setClientUserCount(totalClientUsers);
    };

    if (!isAdmin) {
        return <div>You are not authorized to view this page.</div>;
    }

    const filteredUsers = users.filter(user =>
        user.name.first.toLowerCase().includes(user.name.first.toLowerCase())
    );

    const deleteCardHandler = (id: string) => {
        deleteUser(id)
            .then((res) => {
                console.log(res);
                showErrorDialog("Delete", "User deleted");
                getUsers().then((res) => {
                    setUsers(res.data);
                    calculateUserCounts(res.data);
                });
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="flex flex-col items-center gap-6 pt-3 dark:text-white">
            <div className="flex justify-center gap-4">
                <div>
                    Total Users: {userCount}
                </div>
                <div>
                    Bussiness Users: {businessUserCount}
                </div>
                <div>
                    Client Users: {clientUserCount}
                </div>
            </div>
            {error && <div>{error}</div>}
            <div className="flex flex-wrap justify-center items-center gap-6 pt-3 dark:text-white">
                {filteredUsers.map((user) => (
                    <div
                        key={user._id}
                        className="flex flex-col w-96 justify-center items-center p-5 rounded text-center drop-shadow   shadow-md dark:border hover:-translate-y-4 transition-all duration-300"
                    >

                        <div>
                            <h2 className="text-xl py-0.5  mb-2" style={{ letterSpacing: '0.2rem' }}>
                                {user.name.first} {user.name.last}
                            </h2>
                        </div>
                        <div className=" dark:text-white w-80 text-left">

                            <p className="text-sm">Business: {user.isBusiness ? 'Yes' : 'No'}</p>
                            <p className="text-sm">Mail: {user.email}</p>
                            <p className="text-sm">Phone: {user.phone}</p>
                            <p className="text-sm">City: {user.address.city}</p>
                            <p className="text-sm">Country: {user.address.country}</p>
                            <p className="text-sm">Street: {user.address.street}</p>
                            <p className="text-sm">House Number: {user.address.houseNumber}</p>
                            <p className="text-sm">State: {user.address.state}</p>
                            <p className="text-sm">Zip: {user.address.zip}</p>
                        </div>
                        <RiDeleteBin5Line
                            onClick={() => deleteCardHandler(user._id)}
                            style={{
                                cursor: "pointer",
                                fontSize: "28px",
                                position: "absolute",
                                right: 33,
                                bottom: 22,
                                color: "blue"
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CRM;
