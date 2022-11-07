import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const users = [];

const tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  if (!username || !avatar) {
    res.sendStatus(400);
    return;
  }
  const newUser = {
    username,
    avatar,
  };
  users.push(newUser);
  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const { tweet } = req.body;
  const { user } = req.headers;
  const username = user;
  if (!username || !tweet) {
    res.sendStatus(400);
    return;
  }
  const usernameExists = users.find((obj) => obj.username === username);
  if (!usernameExists) {
    res.status(400).send("Cannot find username");
    return;
  }
  const newTweet = {
    username,
    tweet,
  };
  tweets.push(newTweet);
  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  let avatar;
  const page = parseInt(req.query.page);
  const tweetsToDisplay = tweets
    .slice(0)
    .reverse()
    .map((obj) => {
      users.forEach((a) => {
        if (a.username === obj.username) {
          avatar = a.avatar;
        }
      });
      return {
        username: obj.username,
        avatar,
        tweet: obj.tweet,
      };
    });
  if (!page || page === 1) {
    const last10Tweets = tweetsToDisplay.slice(0, 10);
    res.send(last10Tweets);
    return;
  }
  if (page < 1) {
    res.status(400).send("Informe uma página válida!");
    return;
  }
  const lastTweet = page * 10;
  const firstTweet = page * 10 - 10;
  const trimmedTweets = tweetsToDisplay.slice(firstTweet, lastTweet);
  res.send(trimmedTweets);
});

app.get("/tweets/:username", (req, res) => {
  const { username } = req.params;
  const userExists = users.find((a) => a.username === username);
  if (!userExists) {
    res.sendStatus(400);
    return;
  }
  console.log(userExists);
  const userTweets = tweets.filter((obj) => {
    return obj.username == username;
  });
  const userTweetsToDisplay = userTweets.slice(0).reverse();
  res.send(userTweetsToDisplay);
});

app.listen(5000);
