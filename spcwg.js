var styles = `
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
body{
  overflow: hidden;
  background: #f2f2f2;
}
#click{
  display: none;
}
label{
  position: absolute;
  right: 30px;
  bottom: 20px;
  height: 55px;
  width: 55px;
  text-align: center;
  line-height: 55px;
  border-radius: 50px;
  font-size: 18px;
  color: #fff;
  cursor: pointer;
}
label i{
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 30px;
  transform: translate(-50%, -50%);
  transition: all 0.4s ease;
}
label i.fas{
  opacity: 0;
  pointer-events: none;
}
#click:checked ~ label i.fas{
  opacity: 1;
  pointer-events: auto;
  transform: translate(-50%, -50%) rotate(180deg);
  margin-top:-5px;
}

#click:checked ~ label i.fa{
  opacity: 0;
}

#click:checked ~ label i.fab{
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -50%) rotate(180deg);
}
.wrapper{
  position: absolute;
  right: 30px;
  bottom: 0px;
  max-width: 400px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 15px 20px rgba(0,0,0,0.1);
  opacity: 0;
  pointer-events: none;
  transition: all 0.6s cubic-bezier(0.68,-0.55,0.265,1.55);
}
#click:checked ~ .wrapper{
  opacity: 1;
  bottom: 85px;
  pointer-events: auto;
}
.wrapper .head-text{
  line-height: 50px;
  color: #fff;
  border-radius: 15px 15px 0 0;
  padding: 0 20px;
  font-weight: 400;
  font-size: 16px;
}
.wrapper .chat-box{
  padding: 15px;
  width: 100%;
}
.chat-box .desc-text{
  color: #1c4588;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
}
.chat-box form{
  padding: 0px 15px;
  margin: 10px 0;
  border-radius: 25px;
  border: 1px solid lightgrey;
}
.chat-box form .field{
  height: 50px;
  width: 100%;
  margin-top: 20px;
}
.chat-box form .field:last-child{
  margin-bottom: 15px;
}
form .field input,
form .field button,
form .textarea textarea{
  width: 100%;
  height: 100%;
  padding-left: 20px;
  border: 1px solid lightgrey;
  outline: none;
  border-radius: 25px;
  font-size: 12px;
  transition: all 0.3s ease;
}
form .field input:focus,
form .textarea textarea:focus{
  border-color: #fc83bb;
}
form .field input::placeholder,
form .textarea textarea::placeholder{
  color: silver;
  transition: all 0.3s ease;
}
form .field input:focus::placeholder,
form .textarea textarea:focus::placeholder{
  color: lightgrey;
}
.chat-box form .field button{
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  background-color:#1c4588;
  transition: all 0.3s ease;
}
.chat-box form .field button:active{
  transform: scale(0.97);
}

img{
  display: block;
    width: 40px;
    height: 30px;
    margin-top:13px;
    margin-left: 7px;
    background-position:50% 50%;
    background-repeat:no-repeat; 
}
iframe {
   overflow: hidden;
}
.fa-envelope{
  margin-top:2.5px;
  font-size:1.5rem
}
.fa-comments{
  margin-top:2.5px;
  font-size:1.5rem
}
`
let overColor = '#FFF';
let height = 390;
let topColor = '#FFF'
let topBackground = "#1c4588"
let message = "Let's chat? - Online"
let backgroundGrandiant_1 = "#d8d8d8"
let backgroundGrandiant_2 = "#5b99ff"
let color = '#FFF'
let image = 'fa-comments';
var myScript = document.currentScript;
mySrc = myScript.getAttribute('src');
const myArr = mySrc.split("?w=");
myArr[1] = myArr[1].split("&widget="); // token and widget id
myArr[1][1] = myArr[1][1].split("&lang=");

var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() { 
  if (xmlHttp.status == 200)
  {
    let data = JSON.parse(xmlHttp.responseText);
    if(typeof data === 'object')
    {
      if(data.data.offline_form.status === true) // offline chat
      {
        image = "fa-envelope"
        backgroundGrandiant_1 = data.data.widget_style.color.offline_chat_button.background_gradient_1;
        backgroundGrandiant_2 = data.data.widget_style.color.offline_chat_button.background_gradient_2;
        color = data.data.widget_style.color.offline_chat_button.letter_color;
        message = data.data.offline_form.title.text; 
        overColor = data.data.offline_form.style.color.background;
        height = 485;
      }
      else // online chat
      {
        image = "fa-comments"
        backgroundGrandiant_1 = data.data.widget_style.color.online_chat_button.background_gradient_1;
        backgroundGrandiant_2 = data.data.widget_style.color.online_chat_button.background_gradient_2;
        color = data.data.widget_style.color.offline_chat_button.icon_color;
        message = data.data.outside_header.text;
        overColor = data.data.widget_style.color.chat_window.background;
      }
      topBackground = data.data.outside_header['background-color'];
      topColor = data.data.outside_header['text-color'];
      console.log(data.data)
    }
  }
}
xmlHttp.open( "GET", 'https://app.spechy.com:8000/api/conversation-management/chat-widget/outside/'+myArr[1][1][0]+'/'+myArr[1][1][1]+'/'+myArr[1][0], false );
xmlHttp.send( null );

var styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)



document.body.innerHTML += `
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/v4-shims.css">
<input type="checkbox" id="click">
<label for="click" style='background: -webkit-linear-gradient(left, `+backgroundGrandiant_1+`, `+backgroundGrandiant_2+`) !important;'>
  <i class="fa `+image+`" style='color:`+color+`'></i>
  <i class="fas fa-times" style='color:`+color+`'></i>
</label>
<div class="wrapper">
   <div class="head-text" style='background-color:`+topBackground+`;color:`+topColor+`'>
      `+message+`
   </div>
   <div style="padding:10px;background: `+overColor+`">
      <iframe 
        src="http://localhost:3001/?w=`+myArr[1][0]+`&id=`+myArr[1][1][0]+`&lang=`+myArr[1][1][1]+`" 
        allow="camera; microphone"
        height="`+height+`"
        allowfullscreen="true"
        frameborder="0"
        style="border:none;">
      </iframe>
   </div>
</div>
`;