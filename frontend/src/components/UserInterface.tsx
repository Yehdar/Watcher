import React, { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "./CardComponent";

interface User {
  id: number;
  name: string;
  clockin: string;
}

interface UserInterfaceProps {
  backendName: string;
}

const UserInterface: React.FC<UserInterfaceProps> = ({ backendName }) => {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/";
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", clockin: "" });
  const [updateUser, setUpdateUser] = useState({
    id: "",
    name: "",
    clockin: "",
  });

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

  // create user
  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiURL}/api/${backendName}/users`,
        newUser
      );
      setUsers([response.data, ...users]);
      setNewUser({ name: "", clockin: "" });
    } catch (error) {
      console.error("erro making user: ", error);
    }
  };

  // update user
  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(`${apiURL}/api/${backendName}/users/${updateUser.id}`, {
        name: updateUser.name,
        clockin: updateUser.clockin,
      });
      setUpdateUser({ id: "", name: "", clockin: "" });
      setUsers(
        users.map((user) => {
          if (user.id === parseInt(updateUser.id)) {
            return {
              ...user,
              name: updateUser.name,
              clockin: updateUser.clockin,
            };
          }
          return user;
        })
      );
    } catch (error) {
      console.error("error updating user: ", error);
    }
  };

  // delete user
  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`${apiURL}/api/${backendName}/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("error deleting user: ", error);
    }
  };

  return (
    <div
      className="min-h-screen  p-8 rounded-lg shadow-lg bg-gradient-to-br from-navy-600 to-navy-800 text-white"
      style={{
        backgroundImage:
          "linear-gradient(to bottom right, #FF8C00, #FFA500, #FFD700)",
      }}
    >
      <h1 className="text-3xl font-bold mb-6"> Staff Management System </h1>

      {/* create em */}
      <form onSubmit={createUser} className="mb-6">
        <input
          placeholder="Employee Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="mb-2 p-2 rounded w-full text-black"
        />
        <input
          placeholder="Clock-In Time"
          value={newUser.clockin}
          onChange={(e) => setNewUser({ ...newUser, clockin: e.target.value })}
          className="mb-2 p-2 rounded w-full text-black"
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Add User
        </button>
      </form>

      {/* update em */}
      <form onSubmit={handleUpdateUser} className="mb-6">
        <input
          placeholder="Ticket ID"
          value={updateUser.id}
          onChange={(e) => setUpdateUser({ ...updateUser, id: e.target.value })}
          className="mb-2 p-2 rounded w-full text-black"
        />
        <input
          placeholder="Employee Name"
          value={updateUser.name}
          onChange={(e) =>
            setUpdateUser({ ...updateUser, name: e.target.value })
          }
          className="mb-2 p-2 rounded w-full text-black"
        />
        <input
          placeholder="Clock-Out Time"
          value={updateUser.clockin}
          onChange={(e) =>
            setUpdateUser({ ...updateUser, clockin: e.target.value })
          }
          className="mb-2 p-2 rounded w-full text-black"
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Update User
        </button>
      </form>

      {/* display em */}
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg p-4 shadow">
            <CardComponent card={user} />
            <button
              onClick={() => deleteUser(user.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Delete User
            </button>
          </div>
        ))}
      </div>
    </div>
    // <div className="card">
    //   <h1>{backendName}</h1>
    //   <CardComponent card={{ id: 1, name: "John Doe", clockin: "mail" }} />
    // </div>
  );
};

export default UserInterface;
