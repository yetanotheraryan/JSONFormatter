const express = require("express")
const bodyParser = require("body-parser");
const prettier = require("prettier");


const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

// Home Route (Renders the Form)
app.get("/", (req, res) => {
  res.render("index", { formattedJson: null, input: '', tabspaces: '',error: null });
});

// JSON Formatting Route
app.post("/format", async (req, res) => {
  console.log("req.body: ", req.body)
  const { jsonInput, tabspace } = req.body;
  try {
    const parsed = JSON.parse(jsonInput); // Allows relaxed JSON
    console.log(`parsed json : `, parsed);
    const formattedJson = await prettier.format(JSON.stringify(parsed, null, 2), {
      parser: "json",
      useTabs: false,
      tabWidth: Number(tabspace),  // Ensures proper indentation
    });
    console.log(`formatted json: `, formattedJson);
    res.render("index", { formattedJson, input: jsonInput,error: null });
  } catch (err) {
    res.render("index", { formattedJson: null, input: jsonInput,error: "Invalid JSON!" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
