import { useEffect, useState } from "react";
import { getUserChats, createChat } from "../api";
import { useCurrentUser } from "../UserContext";
import Friend from "../Components/Friend";
import Chat from "../Components/Chat";
import Select from "react-select"

const Chats = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [chats, setChats] = useState([]);
  const [newChat, setNewChat] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetchUserChats();
    }
  }, [currentUser]);

  const fetchUserChats = async () => {
    const response = await getUserChats(currentUser.id);
    setChats(response.data.reverse());
  };

  const handleCreateChat = async () => {
    if (newChat.length > 0) {
      const name = "New Chat";
      const participantIds = [
        currentUser.id,
        ...newChat.map((user) => user.id),
      ];
      try {
        await createChat({ name, participantIds });
        fetchUserChats();
      } catch (error) {
        console.error("Error creating chat:", error);
      }
    }
  };

  const friends = currentUser.friends.map((friend, index) => {
    return <Friend friend={friend} key={index}></Friend>;
  });

  const updateNewChat = (e) => {
    const selectedUsers = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    ).map(
      (username) =>
        currentUser.friends.find((friend) => friend.user2.username === username)
          .user2
    );
    setNewChat(selectedUsers);
  };

  return (
    <div className="h-[85vh]">
      <div className="w-[100%] flex flex-col">
        <select
          className="mx-[5%] border-2 max-h-48 overflow-y-auto mt-5"
          onChange={updateNewChat}
          multiple
        >
          <option className="h-max-5vh py-2" disabled>
            Contacts:
          </option>
          {friends.map((friend) => (
            <option
              className="h-max-5vh py-2 hover:bg-blue-200"
              style={{
                backgroundColor: friend.selected
                  ? "rgba(0, 0, 255, 0.1)"
                  : "transparent",
              }}
              key={friend.id}
            >
              {friend}
            </option>
          ))}
        </select>
        <button
          onClick={handleCreateChat}
          className="mx-[5%] mt-2 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Create New Chat
        </button>
      </div>
      <div className="flex items-center justify-around mt-2"></div>
      <ul className="flex flex-col overflow-y-auto scrollbar-hide h-[70vh]">
        {chats.map((chat) => (
          <div>
            <Chat key={chat.id} chat={chat} />
            <div className="border mx-[5%] my-2"></div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Chats;