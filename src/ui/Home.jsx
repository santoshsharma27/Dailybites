import { useSelector } from "react-redux";
import CreateUser from "../components/user/CreateUser";
import { useNavigate } from "react-router-dom";

function Home() {
  const userName = useSelector((state) => state.user.userName);
  const navigate = useNavigate();

  return (
    <div className="px-4 pb-16 pt-24 text-center sm:pb-24 sm:pt-32">
      <h1 className="mb-10 text-3xl font-bold leading-relaxed text-gray-800 md:text-5xl md:leading-snug">
        The best gradient.
        <br />
        <span className="mt-2 block text-orange-500">
          Fresh, hot, and fast to your door.
        </span>
      </h1>

      {userName === "" ? (
        <CreateUser />
      ) : (
        <button
          onClick={() => {
            navigate("/restaurants");
          }}
          className="mt-10 inline-block rounded-full bg-orange-500 px-8 py-3 text-lg font-semibold uppercase text-white shadow-md transition duration-300 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          Continue ordering, {userName}
        </button>
      )}
    </div>
  );
}

export default Home;
