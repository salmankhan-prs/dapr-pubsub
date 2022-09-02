# PubSub in dapr

## Usage/Examples

```javascript
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
```

```
This route  **/dapr/subscribe** is used by dapr for subcribing for Topics
.for each topic we have to create a post request method example [userCreated] .
so,dapr will register all the topics when start the server and when the message is published for a Topic it will invoke a particular route [Route specefied in array]
```

//example route-> userCreated

```javascript
app.post("/userCreated", (req, res) => {
  console.log(
    "ANALYTICS SERVICE :: USER CREATED WITH EMAIL :: ",
    req.body.data.email
  );
  res.sendStatus(200);
});
```

```

NOTE::
1.The routes attached to topic will be always in post Method


 {
      pubsubname: "pubsub",
      topic: "create-user",
      route: "userCreated",//this should be a post method
    },



2.The dapr will always attach the message at  REQ.BODY.DATA

3./dapr/subscribe this route will be call by dapr when we  start server

   EXAMPLE LOG::
    level=info msg="app is subscribed to the following topics: [create-user delete-user] through pubsub=pubsub" app_id=product instance=SALMANPRS scope=dapr.runtime type=log ver=1.8.4


4.THE ROUTES ATTACHED TO SUBSCRIPTION SHOULD ALLOW CONTENT TYPE
" application/cloudevents+json" SO WE SHOULD USE SOMETHING LIKE
app.use(express.json({ type: "application/*+json" }));

```
