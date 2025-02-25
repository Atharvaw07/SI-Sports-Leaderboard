import Dashboard from "./Dashboard";
import "./index.css";

function App() {
  return (
    <>
      <h1 class="p-5 bg-red-900 text-center text-3xl font-bold">
        Sports Leaderboard
      </h1>
      <div className="bg-gray-800 h-screen">
      <Dashboard/>

      </div>

    </>
  );
}

export default App;
