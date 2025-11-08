/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { parse } from "cookie";
import { cookies } from "next/headers";
import z from "zod";


const loginValidationZodSchema = z.object({
  email: z.email({
    message: "Email is required",
  }),
  password: z.string("Password is required").min(6, {
    error: "Password is required and must be at least 6 characters long",
  }).max(100, {
    error: "Password must be at most 100 characters long",
  }),
});


export const loginUser = async (_currentState: any, formData: any): Promise<any> => {
  try {
    let accessTokenObject : null | any = null;
    let refreshTokenObject : null | any = null;
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password")
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
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json"
      },

    })

    const result = await res.json();

    const setCookieHeaders = res.headers.getSetCookie();
    // console.log(setCookieHeaders);

    if(setCookieHeaders && setCookieHeaders.length > 0){
      setCookieHeaders.forEach((cookie : string) => {

        const parsedCookie = parse(cookie) 
        // console.log("cookie", cookie , "parsedCookie", parsedCookie);

        if(parsedCookie['accessToken']){
          accessTokenObject = parsedCookie;
        } 
        if(parsedCookie['refreshToken']){
          refreshTokenObject = parsedCookie;
        }
      })

    }else{
      throw new Error("No Set-cookies Header found");
    }

    if(!accessTokenObject){
      throw new Error("Token not Found in Cookies");
    }
    if(!refreshTokenObject){
      throw new Error("Token not Found in Cookies");
    }
    // console.log(accessTokenObject, refreshTokenObject);

    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessTokenObject.accessToken, {
      httpOnly : true,
      maxAge : parseInt(accessTokenObject["max-Age"] || 1000 * 60 * 60) ,
      path : accessTokenObject.Path || "/",
      sameSite : accessTokenObject["SameSite"] || "none", 
      secure : true
    });
    cookieStore.set("refreshToken", refreshTokenObject.refreshToken, {
      httpOnly : true,
      maxAge : parseInt(refreshTokenObject["max-Age"] || 1000 * 60 * 60) ,
      path : refreshTokenObject.Path || "/",
      sameSite : refreshTokenObject["SameSite"]  || "none", 
      secure : true
    });
    return result;

  } catch (error) {
    console.log(error);
    return { error: "Login Failed" };
  }
}