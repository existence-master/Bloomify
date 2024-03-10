import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      Dashboard page of Bloomify
    </div>
  );
};

export default Dashboard;