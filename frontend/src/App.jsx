import React, { useEffect, useState } from "react";
import axios from "./axios";

const App = () => {
    const [value, setValue] = useState([]);
    const [error, SetError] = useState("");
    const [sucess, setSucess] = useState("");
    const [valueTwo, setSetValueTwo] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUserId, setCurrentUserId] = useState(null); 
    const [regNumber, setRegNumber] = useState(""); 
    const [name, setName] = useState(""); 
    const [course, setCourse] = useState("");
    const [department, setDepartment] = useState("");

    useEffect(() => {
        getFunction();
        setSetValueTwo(false);
    }, [valueTwo]);
    const getFunction = async () => {
        try {
            const response = await axios.get("/user");
            setValue(response.data);
        } catch (err) {
            SetError("Error fetching data");
        }
    };
    const handleChange = async (event) => {
        event.preventDefault();
        const data = { regNumber, name, course, department };
        if (isEditing && currentUserId) {
            try {
                await axios.put(`/user/${currentUserId}`, data);
                setSucess("User updated successfully");
                setIsEditing(false); 
                setCurrentUserId(null); 
                setSetValueTwo(true)
            } catch (error) {
                SetError("Error updating user");
            }
        } else {
            if (regNumber > 0 && name && course && department) {
                try {
                    await axios.post("/user", data);
                    setSucess("User added successfully");
                    setSetValueTwo(true)
                } catch (error) {
                    SetError("Error adding user");
                }
            } else {
                SetError("Fill the required fields");
            }
        }
        setRegNumber("");
        setName("");
        setCourse("");
        setDepartment("");
        setTimeout(() => {
            SetError("");
            setSucess("");
        }, 1000);
    };
    const handleEdit = (user) => {
        setIsEditing(true);
        setCurrentUserId(user._id);
        setRegNumber(user.regNumber);
        setName(user.name);
        setCourse(user.course);
        setDepartment(user.department);
    };
    const handleDelect = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this user?");
        if (isConfirmed) {
            try {
                await axios.delete(`/user/${id}`);
                setSetValueTwo(true);
            } catch (error) {
                SetError("Student not deleted");
            }
        }
    };
    return (
        <div className="container mx-auto p-5 flex flex-col justify-center items-center">
            <h1 className="text-center font-serif text-2xl">Student List</h1>
            <div className="rounded-2xl bg-white p-10 w-full max-w-md shadow-lg mt-5 flex flex-col justify-center items-center">
                <form className="flex flex-col" onSubmit={handleChange}>
                    <input
                        type="number"
                        className="border border-blue-200 px-5 py-2 my-2 rounded outline-none"
                        placeholder="Reg Number"
                        required
                        value={regNumber}
                        onChange={(event) => setRegNumber(event.target.value)}
                    />
                    <input
                        type="text"
                        className="border border-blue-200 px-5 py-2 my-2 rounded outline-none"
                        placeholder="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <input
                        type="text"
                        className="border border-blue-200 px-5 py-2 my-2 rounded outline-none"
                        placeholder="Course"
                        value={course}
                        onChange={(event) => setCourse(event.target.value)}
                    />
                    <input
                        type="text"
                        className="border border-blue-200 px-5 py-2 my-2 rounded outline-none"
                        placeholder="Department"
                        value={department}
                        onChange={(event) => setDepartment(event.target.value)}
                    />
                    {error && <h1 className="text-red-500 text-lg mt-2">{error}</h1>}
                    {sucess && <h1 className="text-green-500 text-lg mt-2">{sucess}</h1>}
                    <button
                        type="submit"
                        className="border w-fit px-4 py-2 rounded mt-5 bg-green-600 text-white"
                    >
                        {isEditing ? "Update User" : "Add User"}
                    </button>
                </form>
            </div>
            <div className="mt-10 text-center shadow-md w-full max-w-3xl">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="border border-blue-100 px-2 py-2">Reg Number</th>
                            <th className="border border-blue-100 px-2 py-2">Name</th>
                            <th className="border border-blue-100 px-2 py-2">Course</th>
                            <th className="border border-blue-100 px-2 py-2">Department</th>
                            <th className="border border-blue-100 px-2 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {value.map((user) => (
                            <tr key={user._id}>
                                <td className="border border-blue-100 px-2 py-2">{user.regNumber}</td>
                                <td className="border border-blue-100 px-2 py-2">{user.name}</td>
                                <td className="border border-blue-100 px-2 py-2">{user.course}</td>
                                <td className="border border-blue-100 px-2 py-2">{user.department}</td>
                                <td className="border border-blue-100 px-2 py-2">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="border border-blue-100 rounded px-2 py-1 mx-2 my-1 bg-green-600 text-white"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelect(user._id)}
                                        className="border border-blue-100 rounded px-2 py-1 mx-2 my-1 bg-red-600 text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default App;
