const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

app.listen(5000, () => {
  console.log("server started on port 5000");
})

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

});

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* this api is used for  get data by id
*
*/
app.get("/users/:user_id/:phone_no", (req, res) => {
  // console.log(req.body);
  var sql = "SELECT * FROM users where user_id =  '" + req.params.user_id + "' AND phone_no =  '" + req.params.phone_no + "'"
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log("success");
    res.send(result);
  })
})

 /**
* this api is used for  get all data
*
*/
app.get("/users", (req, res) => {
 var sql = "select * from users"
  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log("success");
    res.send(result);
  })
})




/**
 * this api is used for single/bulk insert.
 * request body formate: {"details" :[{"firstname" : "abc","lastname" : "xyz"},{"firstname" : "lmn"}] }
 */
app.post("/insert", (req, res) => {
  if (req.body.details.length > 0) {
    var err = 0;
    try {
      for (var i = 0; i < req.body.details.length; i++) {
        var sql = 'INSERT INTO users';
        var colums = '';
        var values = '';
        var sep = '';
        for (var key in req.body.details[i]) {
          colums = colums + sep + key;
          values = values + sep + "'" + req.body.details[i][key] + "'";
          sep = ',';
        }
        sql = sql + " (" + colums + ") Values" + "(" + values + ")";
        console.log(sql);
        con.query(sql, (error) => {
          if (error) {
            err = 1;
          } else {
            console.log("success");
          }
        });
      }
      if (err == 0) {
        res.send({ success: true, message: 'Data updated' });
      }
    } 
    catch (e)
    {
      throw e;
    }
  } else {
    res.send({ success: true, message: 'Empty body' });
  }
});


/**
 * this api is used for single/bulk update users by user_id.
 * request body formate: {"details" :[ {"user_id":"16","data":{"firstname" : "abc"},"lastname" : "xyz"}}, {"user_id":"17","data":{"phone_no" : "123"}} ] }
 */
app.patch("/updatebyuserid", (req, res) => {
  if (req.body.details.length > 0) {
    var err = 0;
    try {
      for (var i = 0; i < req.body.details.length; i++) {
        var sql = 'UPDATE users SET ';
        var sep = '';
        for (var key in req.body.details[i].data) {
          sql = sql + sep + key + " = '" + req.body.details[i].data[key] + "'";
          sep = ',';
        }
        sql = sql + " WHERE user_id = '" + req.body.details[i].user_id + "'";
        console.log(sql);
        con.query(sql, (error) => {
          if (error) {
            err = 1;
          } else {
            console.log("success");
          }
        });
      }
      if (err == 0) {
        res.send({ success: true, message: 'Data updated' });
      }
    } catch (e) {
      throw e;
    }
  } else {
    res.send({ success: true, message: 'Empty body' });
  }
});



/**
 * this api is used for single/bulk delete users.
 * request body formate: { "details" :[ {"user_id":"1","phone_no" : "12345"}, {"user_id":"2","phone_no" : "12345"} ] }
 */
app.delete("/multidel", (req, res) => {
  if (req.body.details.length > 0) {
    var err = 0;
    try {
      for (var i = 0; i < req.body.details.length; i++) {
        var sql = "DELETE FROM users WHERE user_id = '" + req.body.details[i].user_id + "'  AND phone_no ='" + req.body.details[i].phone_no + "'";
        console.log(sql);
        con.query(sql, (error) => {
          if (error) {
            err = 1;
          } else {
            console.log("success");
          }
        });
      }
      if (err == 0) {
        res.send({ success: true, message: 'Data deleted' });
      }
    } catch (e) {
      throw e;
    }
  } else {
    res.send({ success: true, message: 'Empty body' });
  }
});




