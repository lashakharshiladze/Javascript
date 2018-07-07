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


function response_message(message){
    if(message.indexOf("ჩატ ბოტი ხარ") >= 0){
        return "ჩატ ბოტი ვარ შენი ჭირიმე!"
    }
    if(message.indexOf("ამინდი") >= 0){
        return "ამ კვირას მზიან ამინდებს ველოდებით"
    }
    if(message.indexOf("გამარჯობა") >= 0 || message.indexOf("გაგიმარჯოს") >= 0){
        return "კიდევ, ერთხელ სალამი"
    }
    if(message.indexOf("მშვიდობა") >= 0){
        return "მშვიდობა თქვენდა"
    }
    if(message.indexOf("გქვია") >= 0){
        return "მე მქვია ანზორი"
    }
    if(message.indexOf("გიყვარვარ") >= 0){
        return "ძლიან"
    }
    return "მაგაზე პაუსიხის გაცემა არ შემიძლია"
}


app.post("/message", function(req, res){
  message = req.body.message
  response_text = response_message(message)
  req_id++;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.json({ 'message': response_text })
});



app.listen(3000, function(){
  console.log('listening on *:3000');
});