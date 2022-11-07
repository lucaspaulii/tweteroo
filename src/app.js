import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const users = [
  {
    username: "banana1",
    avatar:
      "https://i.kym-cdn.com/entries/icons/facebook/000/016/366/1409630808061.jpg",
  },
  {
    username: "banana2",
    avatar:
      "https://ih1.redbubble.net/image.401351309.6259/flat,750x,075,f-pad,750x1000,f8f8f8.u1.jpg",
  },
  {
    username: "banana3",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvgpDxBnV5GI76ZexOoMP-9B6kmuHyCwnZ1w&usqp=CAU",
  },
  {
    username: "banana4",
    avatar:
      "https://image.shutterstock.com/image-vector/funny-meme-banana-cute-face-260nw-1901876971.jpg",
  },
];

const tweets = [
  {
    username: "banana3",
    tweet: "blablabla3",
  },
  {
    username: "banana1",
    tweet: "blablabla1",
  },
  {
    username: "banana4",
    tweet: "blablabla4",
  },
  {
    username: "banana3",
    tweet: "blablabla3",
  },
  {
    username: "banana3",
    tweet: "blablabla3",
  },
  {
    username: "banana3",
    tweet: "blablabla3",
  },
  {
    username: "banana3",
    tweet: "blablabla3",
  },
  {
    username: "banana3",
    tweet: "blablabla3",
  },
  {
    username: "banana3",
    tweet: "blablabla3",
  },
  {
    username: "banana3",
    tweet: "blablabla3",
  },
  {
    username: "banana3",
    tweet: "blablabla3",
  },
  {
    username: "banana3",
    tweet: "blablabla3",
  },
  {
    username: "banana3",
    tweet: "blablabla3",
  },
  {
    username: "banana3",
    tweet: "blablabla3",
  },
  {
    username: "banana3",
    tweet: "blablabla3",
  },
  {
    username: "banana3",
    tweet: "blablabla3",
  },
  {
    username: "banana3",
    tweet: "blablabla3",
  },
  {
    username: "banana3",
    tweet: "blablabla3",
  },
  {
    username: "banana3",
    tweet: "blablabla3",
  },
  {
    username: "banana3",
    tweet: "last dance",
  },
];

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

app.get("/sign-up", (req, res) => {
  res.send(users);
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;
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
  const last10Tweets = tweetsToDisplay.slice(0, 10);
  console.log(tweetsToDisplay);
  console.log(last10Tweets);
  res.send(last10Tweets);
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
