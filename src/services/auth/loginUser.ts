"use server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginUser = async (_currentState : any, formData : any) : Promise<any> => {
    try{
    const loginData ={
        email : formData.get("email"),
        password : formData.get("password")
    }

    
    }catch(error){
        console.log(error);
        return {error : "Login Failed"};
    }
}