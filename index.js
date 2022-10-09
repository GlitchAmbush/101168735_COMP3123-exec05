const { query } = require("express");
const express = require("express");
const app = express();
const router = express.Router();
const user = require("./user.json");
const url = require("url");

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get("/home", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get("/profile", (req, res) => {
  const userString = JSON.stringify(user, null, 3);
  res.send("<pre>" + userString + "</pre>");
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get("/login", (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  if (
    queryObject.username == user.username &&
    queryObject.password == user.password
  ) {
    const string =
      '<pre>{\n\tstatus: true,\n\tmessage: "User is valid"\n}</pre>';
    res.write(string);
    res.send();
  }

  if (
    queryObject.username != user.username &&
    queryObject.password != user.password
  ) {
    const string =
      '<pre>{\n\tstatus: false,"\n\tmessage: "Username & Password is invalid"\n}</pre>';
    res.write(string);
    res.send();
  } else if (queryObject.username != user.username) {
    const string =
      '<pre>{\n\tstatus: false,"\n\tmessage: "Username is invalid"\n}</pre>';
    res.write(string);
    res.send();
  } else if (queryObject.password != user.password) {
    const string =
      '<pre>{\n\tstatus: false,"\n\tmessage: "Password is invalid"\n}</pre>';
    res.write(string);
    res.send();
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get("/logout/:username", (req, res) => {
  const username = req.params.username;
  const string = `<b>${username} succesfully logged out.<b>`;
  res.write(string);
  res.send();
});

app.use("/", router);

app.listen(process.env.port || 8081);

console.log("Web Server is listening at port " + (process.env.port || 8081));
