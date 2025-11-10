"use client"

import { logoutUser } from "@/services/auth/logoutUser";
import { Button } from "../ui/button";

const logoutButton = () => {
    const handleLogout = async () => {
        await logoutUser();
    }
    return (
        <div>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
};

export default logoutButton;