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
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [updateUser, setUpdateUser] = useState({
    id: "",
    name: "",
    email: "",
  });

  const backgroundColors: { [key: string]: string } = {
    springboot: "bg-blue-500",
  };

  const buttonColors: { [key: string]: string } = {
    springboot: "bg-blue-700 hover:bg-blue-600",
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
    <div
      className={`user-interface ${bgColor} ${backendName} w-full max-w-md p-4 my-4 rounded shadow`}
    >
      <img
        src={`/${backendName}logo.svg`}
        alt={`${backendName} Logo`}
        className="w-20 h-20 mb-6 mx-auto"
      />
      <h2 className="text-xl front-bold text-center text-black mb-6">{`${
        backendName.charAt(0).toUpperCase() + backendName.slice(1)
      } Backend`}</h2>
      {/* display em */}
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-whtie p-4 rounded-lg shadow"
          >
            <CardComponent card={user} />
          </div>
        ))}
      </div>
    </div>
    // <div className="card">
    //   <h1>{backendName}</h1>
    //   <CardComponent card={{ id: 1, name: "John Doe", email: "mail" }} />
    // </div>
  );
};

export default UserInterface;
