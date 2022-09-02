const express = require("express");
const dapr = require("@dapr/dapr");
const { default: axios } = require("axios");
const app = express();

app.use(express.json());
const client = new dapr.DaprClient(
  "127.0.0.1",
  "3500",
  dapr.CommunicationProtocolEnum.HTTP
);
//THIS PUBSUB IS CREATED WITH BY DEFAULT IN DAPR WHEN YOU WANT TO MODIFY NAME OR MESSAGE BROKER THEN YOU HAVE TO CREATE PUBSUB.YAML FILE IN COMPONETS FOLDER AND ADD COMPONTENS  --COMPONENTS  FLAG
const pubSubName = "pubsub";
//THIS METHOD TAKE USER AND AFTER CREATING USER IT WILL PUBLISH MESSAGE
app.post("/create", async (req, res) => {
  const topic = "create-user";
  const userId = Math.floor(Math.random() * 100);
  const message = {
    userId,
    name: req.body.name,
    email: req.body.email,
  };
  // Publish Message to Topic :: TTHIS MESSAGE WILL BE CONSUMED[SUBSCRIBED] IN EMAIL AND ANALYTICS MICROSERVICE
  await client.pubsub.publish(pubSubName, topic, message);
  res.send(message);
});
//THIS METHOD delete USER AND AFTER deleteing USER IT WILL PUBLISH MESSAGE
app.delete("/user/:id", async (req, res) => {
  const topicUserDeleted = "delete-user";
  const userId = req.params.id;
  // Publish Message to Topic :: TTHIS MESSAGE WILL BE CONSUMED[SUBSCRIBED] IN EMAIL AND ANALYTICS MICROSERVICE
  await client.pubsub.publish(pubSubName, topicUserDeleted, { userId });
  res.send("User deleted");
});

app.listen("4001", () => {
  console.log("SERVER STARTED ");
});
