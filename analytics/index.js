/**
 *  level=info msg="app is subscribed to the following topics: [create-user delete-user] through pubsub=pubsub" app_id=product instance=SALMANPRS scope=dapr.runtime type=log ver=1.8.4
 *
 */

const express = require("express");

const app = express();
// Dapr publishes messages with the application/cloudevents+json content-type

//
app.use(express.json({ type: "application/*+json" }));

const port = 4000;
//TODO: /dapr/subscribe THIS METHOD USER BY DAPR FOR SUBSCRIBING :: HOW IT WORKS IS EXPLAINED IN README FILE
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
    "ANALYTICS SERVICE :: USER CREATED WITH EMAIL :: ",
    req.body.data.email
  );
  res.sendStatus(200);
});
//WHEN  topic  "delete-user" IS PUBLISHED MESSAGE THE ROUTE IS INVOKED
app.post("/userDeleted", (req, res) => {
  console.log(
    " ANALYTICS SERVICE :: USER DELETED WITH ID:: ",
    req.body.data.userId
  );
  res.sendStatus(200);
});
app.listen(port, () => console.log(`analytics App listening on port ${port}!`));
