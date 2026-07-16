import { useAuth, useUser } from "@clerk/react";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      const { data } = await axios.get("/api/user/get-published-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (id) => {
    try {
      const { data } = await axios.post(
        "/api/user/toggle-like-creation",
        { id },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        setCreations((prev) =>
          prev.map((c) => {
            if (c.id === id) {
              const liked = c.likes.includes(user.id);
              return {
                ...c,
                likes: liked
                  ? c.likes.filter((uid) => uid !== user.id)
                  : [...c.likes, user.id],
              };
            }
            return c;
          })
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <h1 className="text-xl font-semibold text-white">Community Creations</h1>
      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : creations.length === 0 ? (
          <div className="flex justify-center items-center h-64 text-gray-400">
            <p>No public creations yet. Share your work with the community!</p>
          </div>
        ) : (
          creations.map((creation) => (
            <div
              key={creation.id}
              className="relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3"
            >
              <img
                src={creation.content}
                alt={creation.prompt}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg">
                <p className="text-sm hidden group-hover:block line-clamp-2">
                  {creation.prompt}
                </p>
                <div className="flex gap-1 items-center">
                  <p>{creation.likes.length}</p>
                  <Heart
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(creation.id);
                    }}
                    className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                      creation.likes.includes(user.id)
                        ? "fill-red-500 text-red-600"
                        : "text-white"
                    }`}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Community;
