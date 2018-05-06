var app = require('express')();

var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encod

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

var client = {}
var to_client_field = {0:'name', 1: 'profession'}
var req_id = 0


function response_message(client, req_id, message){
    if(req_id >= 0){
        return "გამარჯობა, " + client['name'];
    }
}


app.post("/message", function(req, res){
  message = req.body.message
  client[to_client_field[req_id]] = message
  console.log(to_client_field[req_id], client[to_client_field[req_id]] )
  response_text = response_message(client, req_id, message)
  console.log(response_text)
  req_id++;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.json({ 'message': response_text })
});



app.listen(3000, function(){
  console.log('listening on *:3000');
});