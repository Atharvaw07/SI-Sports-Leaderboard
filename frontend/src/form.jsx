import { useEffect, useState } from "react";

const PlayerForm = ({ player, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    team: "",
    runs: "",
  });

  useEffect(() => {
    if (player) {
      setFormData(player); // Update form when player is selected
    }
  }, [player]); // Runs when `player` updates

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg w-1/2">
      <div className="flex flex-col gap-2 mb-5 ">
        <input
          className="p-2 border border-black rounded-lg "
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          className=" p-2 border border-black rounded-lg"
          type="text"
          name="team"
          placeholder="Team"
          value={formData.team}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          className=" p-2 border border-black rounded-lg"
          name="runs"
          placeholder="Runs"
          value={formData.runs}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex gap-5">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          {player ? "Update" : "Add"} Player
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PlayerForm;
