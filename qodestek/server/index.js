const express = require("express");
const connectTOmongoose = require("./db");
connectTOmongoose();

const app=express();
const port=3000;

app.use(express.json);

// Available routes
app.use("/api/auth",require('./routes/auth.router'));

app.listen(port,()=>{
  console.log(`app running on port ${port}`);
})
