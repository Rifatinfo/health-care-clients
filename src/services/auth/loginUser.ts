/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";

const loginValidationZodSchema = z.object({
  email : z.email({message : "Invalid email address"}),
  password : z.string({error : "Password Is required"}).min(6,{error : "Password must be at least 6 characters"}).max(100)
})


export const loginUser = async (_currentState : any, formData : any) : Promise<any> => {
    try{

    const loginData ={
        email : formData.get("email"),
        password : formData.get("password")
    }

   const validationFields = loginValidationZodSchema.safeParse(loginData);
    if (!validationFields.success) {
      return {
        success: false,
        errors: validationFields.error.issues.map(issue => ({
          field: issue.path[0],
          message: issue.message
        }))
      };
    }
    const res = await fetch("http://localhost:5000/api/v1/auth/login", {
        method : "POST",
        body : JSON.stringify(loginData),
        headers : {
            "Content-Type" : "application/json"
        },
        
     }).then(res => res.json());

     return res;

    }catch(error){
        console.log(error);
        return {error : "Login Failed"};
    }
}