import React, { useEffect, useState } from "react";
import PlayerForm from "./form";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [formDialog, setFormDialog] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchPlayers = async () => {
    try {
      const response = await fetch("http://localhost:6007/");
      const result = await response.json();
      console.log(result, "result");

      setData(result);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const addPlayer = async (newPlayer) => {
    try {
      await fetch("http://localhost:6007/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer),
      });
      fetchPlayers();
      setFormDialog(false);
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  const updatePlayer = async (updatedPlayer) => {
    console.log("Update player", updatedPlayer);
    try {
      await fetch(`http://localhost:6007/players/${updatedPlayer.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPlayer),
      });
      fetchPlayers();
      setSelectedPlayer(null);
      setFormDialog(false);
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  const handleEditPlayer = (player) => {
    console.log("Editing player", player);
    setSelectedPlayer(player);

    console.log(selectedPlayer, "selected player");

    setFormDialog(true);
  };

  const deletePlayer = async (id) => {
    try {
      await fetch(`http://localhost:6007/players/${id}`, {
        method: "DELETE",
      });
      fetchPlayers();
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  const Sort = () => {
    const newOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newOrder);
    setData(
      [...data].sort((a, b) =>
        newOrder === "desc" ? b.runs - a.runs : a.runs - b.runs
      )
    );
  };

  return (
    <div className="flex flex-col gap-12 p-12">
      <div className="flex gap-4">
        <button
          onClick={() => setFormDialog(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Player
        </button>
        <button
          onClick={Sort}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Sort ({sortOrder === "desc" ? "↓" : "↑"})
        </button>
      </div>

      {(formDialog || selectedPlayer) && (
        <PlayerForm
          player={selectedPlayer}
          onSubmit={selectedPlayer ? updatePlayer : addPlayer}
          onCancel={() => {
            setFormDialog(false);
            setSelectedPlayer(null);
          }}
        />
      )}

      <div className="flex w-full flex-col text-white border-4 border-black rounded-xl gap-12 p-2">
        <div className="header flex border-4 border-black p-2   gap-12 px-12 font-bold">
          <h2 className="px-12   w-32">Position</h2>
          <h2 className="px-12 w-64">Name</h2>
          <h2 className="px-12 w-64">Team</h2>
          <h2 className="px-12 w-32">Runs</h2>
          <h2 className="px-12 w-48">Actions</h2>
        </div>
        <div className="data  rounded-xl px-12">
          {data.map((item, index) => (
            <div key={item.id} className="flex items-center gap-12 py-2">
              <p className="px-12 w-32">{index + 1}</p>
              <p className="px-12 w-64">{item.name}</p>
              <p className="px-12 w-64">{item.team}</p>
              <p className="px-12 w-32">{item.runs}</p>
              <div className=" w-48 flex gap-2">
                <button
                  onClick={() => {
                    handleEditPlayer(item);
                    console.log(item, "item");
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePlayer(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

<PlayerForm />;
export default Dashboard;
