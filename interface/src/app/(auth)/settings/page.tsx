"use client" ;
import React, { useEffect, useState } from "react";
import Link from "next/link";
import{signIn,useSession} from "next-auth/react";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";


const Settings = () => {
   return <div><h1>This is settings page</h1></div>


}


export default Settings;