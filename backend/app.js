const express = require("express");

const app = express();
const cors = require("cors");
app.use(cors());
const PORT = 6007;

app.use(express.json());

let data2=[];

const fetchData = async () => {
  try {
    const data = await fetch("http://localhost:3001/players");
    data2 = await data.json();
    // console.log(data2);
  } catch (error) {
    console.log(error);
  }
};

fetchData();

app.get("/", (req, res) => {
  res.json(data2);
});

app.post("/add", (req, res) => {
  const newPlayer = req.body;
  // console.log(newPlayer, req.body);
  newPlayer.id = data2.length + 1;
  data2.push(newPlayer);
  res.json(data2);
});

app.put("/players/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log("id", id);

  const index = data2.findIndex((p) => {
    // console.log("Current player:", p);
    return p.id === id;
  });

  // console.log("index", index, data2);

  if (index < 0) return res.sendStatus(404);

  data2[index] = req.body;
  res.json(data2);
});


app.delete("/players/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);
  
  const index = data2.findIndex((p) => {
    // console.log("Current player:", p);
    return p.id === id;
  });

  if (index < 0) return res.sendStatus(404);

  data2.splice(index, 1);
  res.json(data2);
});

app.put("/:id", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
