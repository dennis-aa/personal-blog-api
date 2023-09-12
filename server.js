const app = require("./app");

//Setup port to listen on
const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
