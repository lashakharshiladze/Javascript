        var remote = "http://localhost:3000"
        
        content = {
                    "welcome": 
                        " <img src = './images/hi.jpeg' /> <br>\
                         <font size='10'  color='Orange' >Welocme On  The Chat Bot Heaven. </font> <br> \
                            <p> <font color='Orange' size='5' >this is best chat bot us have ever seen <br>\
                            feel free to ask him anything you want he only speaks on georgian  <br>\
                            he has already preperad answers for some context </font></p>",
                    "contact" :
                        "<img src='./images/contact.png' width = 700 height = 400 />'\
                        <font size='10'  color='Orange' >\
                         Email:lkhar15@freeuni.edu.ge <br>\
                         TEL: +995 598494188 <br>\
                         </font>",
                    "about":
                        "<font size='10'  color='Orange' > this is Final Project in javascript <br> Lecturer: Otar Chekurshvili\
                        </font> \
                        <img src = './images/javascript.gif'  widht = 800 height = 400/>"
        }

        function onKeyPress(){
            var key = window.event.keyCode;

            // enter 
            if(key == 13){
                send_answer();
            }
        }

        function $(id){
            return document.getElementById(id)
        }
        window.onhashchange = function(){
            console.log(location.hash)
            if(location.hash == "#WELCOME"){
                $("chat-block").innerHTML = content["welcome"]
            }
            if(location.hash == "#CHAT"){
                $("chat-block").innerHTML = savedInnerHtml
                onload();
            }
            if(location.hash == "#ABOUT"){
                $("chat-block").innerHTML = content["about"]
            }
            if(location.hash == "#CONTACT"){
                $("chat-block").innerHTML = content["contact"]
            }


        }   
       
        function create_client_template(text){
            tmpl = '<div class="container">\
                <img src="./images/user-avatar.png" alt="Avatar" class="right" style="width:100%;">\
                  <p>' + text +'</p>\
                  <span class="left-side-time">00:00</span>\
                </div>'

            return tmpl
        }

        function create_chatbot_template(text){
            tmpl = '<div class="container">\
                <img src="./images/chatbot-logo.png" alt="Avatar" class="left" style="width:100%;">\
                  <p>' + text +'</p>\
                  <span class="left-side-time">00:00</span>\
                </div>'

            return tmpl
        }

        function add_client_comment(text){
            var div = document.createElement('div');
            div.innerHTML = create_client_template(text);
            $("messages-area").append(div)
            console.log(div);
        }

        function add_chatbot_comment(text){
            var div = document.createElement('div');
            div.innerHTML = create_chatbot_template(text);
            $("messages-area").append(div)
        }


        var savedInnerHtml
        function send_answer(){
            inputField = $("client-message-field")
            if( inputField.value.trim() == "")
                return
            console.log("Sending answer")
            var clientInput =  inputField.value;
            add_client_comment(clientInput)
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    response = JSON.parse(this.responseText);
                    setTimeout('add_chatbot_comment(response["message"])', 2000)
                }

            };
            xhttp.open("POST", remote +"/message", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("message=" + clientInput);
            $("client-message-field").value = ""
        }

        function onload(){
            savedInnerHtml = $("chat-block").innerHTML
            var sendButton =  $("send-button");
            sendButton.addEventListener("click", send_answer)
        }