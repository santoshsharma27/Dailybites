import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;

    dispatch(updateName(username));
    navigate("/restaurants");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 flex flex-col items-center space-y-6"
    >
      <p className="text-center text-base leading-relaxed text-gray-700 md:text-lg">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-72 rounded-full border border-gray-300 px-6 py-3 text-base shadow-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      {username && (
        <button
          type="submit"
          className="rounded-full bg-orange-500 px-6 py-3 font-semibold uppercase text-white shadow-md transition duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          Start ordering
        </button>
      )}
    </form>
  );
}

export default CreateUser;
