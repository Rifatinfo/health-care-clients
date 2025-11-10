"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const LoginSuccessToast = () => {
    const searchParams = useSearchParams();
    const router = useRouter()
    useEffect(() => {
       if(searchParams.get("loggedIng") === "true"){
          toast.success("logging out successfully");
           const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete("loggedIng");
          router.replace(newUrl.toString());
       } 
    },[searchParams, router]);
    return null;
};

export default LoginSuccessToast;