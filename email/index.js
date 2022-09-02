const express = require("express");

const app = express();
// Dapr publishes messages with the application/cloudevents+json content-type

//IMP://
app.use(express.json({ type: "application/*+json" }));

const port = 4002;

app.get("/dapr/subscribe", (_req, res) => {
  res.json([
    {
      pubsubname: "pubsub",
      topic: "create-user",
      route: "userCreated",
    },
    {
      pubsubname: "pubsub",
      topic: "delete-user",
      route: "userDeleted",
    },
  ]);
});

//FIXME:///req.body.data.message ==THE DATA WILL BE IN BODY  AS REQ.BODY.DATA
//WHEN  topic  "create-user" IS PUBLISHED MESSAGE THE ROUTE IS INVOKED

app.post("/userCreated", (req, res) => {
  console.log(
    " EMAIL SERVICE :: SEND WELCOME  EMAIL TO: ",
    req.body.data.email
  );
  res.sendStatus(200);
});
//WHEN  topic  "delete-user" IS PUBLISHED MESSAGE THE ROUTE IS INVOKED

app.post("/userDeleted", (req, res) => {
  console.log(
    " EMAIL SERVICE :: SEND FEEDBACK EMAIL TO: ",
    req.body.data.userId
  );
  res.sendStatus(200);
});

app.listen(port, () =>
  console.log(`EMAIL SERVICE ::@ listening on port ${port}!`)
);
