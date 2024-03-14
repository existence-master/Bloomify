import User from "@/models/User";
import Details from "@/models/Details";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request : any) => {
    const {username, university} = await request.json();

    await connect();
    const existingUsername = await User.findOne({username});
    if(existingUsername){
        return new NextResponse("This username is already taken", {status: 400});
    }

    // const hashedPassword = await bcrypt.hash(password, 5);
    const newUsername = new Details({
        username,
        university,
    }) 

    try{
        await newUsername.save();
        return new NextResponse("Username Registered", {status : 200});
    } catch (err:any) {
         return new NextResponse(err, {
            status: 500,
         });
    }
};
