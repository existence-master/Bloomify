"use client";

import { useState } from 'react';
import { FaUser, FaPlusCircle } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import DialogBox from '@components/DialogBox';

const Dashboard = () => {
  const { data: session, status } = useSession()
  const [chatHistory, setChatHistory] = useState({})

  // useEffect(() => {
  //   setChatHistory()
  // }, [])

  // getChatHistory(session)
  // console.log(chatHistory)
  
  if (status === "loading") {
    return <p>Loading...</p>
  }
  
  if (status !== "authenticated") {
    return <p>Access Denied</p>
  }

  return (
    <div className="h-screen w-screen bg-amber-100 flex">
      <div className="h-full w-1/4 bg-blue-200 ">
      <div id="top" className="flex gap-3">
          <img className="h-16 w-16 ml-7 mt-5  "src="\bloomify logo.png" alt="bloomify-logo" />
          <h1 className="text-cyan-600 ml-70 mt-7 text-5xl font-medium mb-10 text-center">Bloomify</h1>
      </div>  
      <div id="selection1" className="flex justify-center gap-20 mb-1">
      <select name="Degree " className="text-black pt-2 pb-2 pl-2 w-1/3 pr-2 rounded-lg bg-amber-100 border-2 border-black mb-5" required>
                                <option value="BTech">BTech</option>
                                <option value="BSc">BSc</option>
      </select>
      <select name="Branch" className="text-black pt-2 pb-2 pl-2 pr-2 w-1/3 rounded-lg bg-amber-100 border-2 border-black mb-5" required>
                                <option value="AIDS">AIDS</option>
                                <option value="CS">CS</option>
      </select>
      </div> 
      <div id="selection2" className="flex justify-center gap-20 mb-5 ">
      <select name="Year" className="text-black pt-2 pb-2 pl-2 pr-2 w-1/3 rounded-lg bg-amber-100 border-2 border-black mb-5" required>
                                <option value="2019">SE</option>
                                <option value="2015">TE</option>
      </select>
      <select name="Subject" className="text-black pt-2 pb-2 pl-2 pr-2 w-1/3 rounded-lg bg-amber-100 border-2 border-black mb-5" required>
                                <option value="ANN">ANN</option>
                                <option value="FDS">FDS</option>
      </select>
      </div>
      <div id="bottom" className="flex mt-[400px] ml-5">
          <div id="icon-user" className=""><FaUser size={30}/></div>
          <div id="username"className="text-black mt-1 ml-5 mr-[180px]"><h4>Username</h4></div>
          <div id="icon-create"><FaPlusCircle size={30} /></div>
      </div>    
      </div>
      <div className="h-full w-3/4 bg-red-200">
        <button className="whitespace-nowrap mt-[640px] pt-2 pb-2 pl-2 pr-2 w-30 text-center ml-[1000px] rounded-lg border-black border-5 h-10 bg-amber-100 text-black">
        </button>
        <div id="msg-btn" className="whitespace-nowrap mt-[-400px] pt-2 pb-2 pl-2 pr-2 w-30 text-center ml-[900px] rounded-lg border-black border-5 h-10 bg-amber-100 text-black">
          <DialogBox mode = "suggestion"/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;