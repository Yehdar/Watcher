import React, { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "./CardComponent";

interface Card {
  id: number;
  name: string;
  email: string;
}

interface UserInterfaceProps {
  backendName: string;
}

const UserInterface: React.FC<UserInterfaceProps> = ({ backendName }) => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/";
  const [users, setUsers] = useState<User[]>([]);
  const [newUsers, setNewUsers] = useState({ name: "", email: "" });
  const [updateUsers, setUpdateUsers] = useState({
    id: "",
    name: "",
    email: "",
  });

  const backgroundColors: { [key: string]: string } = {
    flask: "bg-blue-500",
  };

  const buttonColors: { [key: string]: string } = {
    flask: "bg-blue-700 hover:bg-blue-600",
  };

  const bgColor =
    backgroundColors[backendName as keyof typeof backgroundColors] ||
    "bg-gray-200";

  const btnColor =
    backgroundColors[backendName as keyof typeof backgroundColors] ||
    "bg-gray-500 hover:bg-gray-600";

  // fetch users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/${backendName}/users`);
        setUsers(response.data.reverse());
      } catch (error) {
        console.log("where'd it all go wrong: ", error);
      }
    };
    fetchData();
  }, [backendName, apiURL]);

  return (
    <div className="card">
      <h1>{backendName}</h1>
      <CardComponent card={{ id: 1, name: "Peter Parker", email: "mail" }} />
    </div>
  );
};

export default UserInterface;
