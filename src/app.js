import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  const newUser = {
    username,
    avatar,
  };
  users.push(newUser);
  res.status(200).send("OK");
});

app.get("/sign-up", (req, res) => {
    res.send(users)
})

app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body
    const newTweet = {
        username,
        tweet
    }
    tweets.push(tweet)
    res.status(200).send("OK");
})

app.get("/tweets", (req, res) => {
})

app.listen(5000);
