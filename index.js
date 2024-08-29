const express = require("express"); // Install and import Express package
const bodyParser = require("body-parser"); // Install and import Body-parser
const cors = require("cors"); // Install and import Cors package
const TelegramBot = require("node-telegram-bot-api"); // Install and import node-telegram-bot-api


const app = express();
const port = 4000;

// TOKEN of river_staging_bot
const TOKEN = "7207643438:AAGzPQpy22EfI_2_vssaRlsC4UnEJSbopkw";  
// const TOKEN = "7416916323:AAGuCR1WWFjDcDXErdKDE0fNjzSs0lx60lU"; // todolist_by_murari_bot


// This is the Link of the game which we want to open open
const game_link = "https://riv3.czargaming.com/pokerh5v4/"; 
// const game_link = "https://riv3.czargaming.com";


app.use(cors());
app.use(bodyParser.json());

const token = TOKEN;

//creating a new TelegramBot Constructor
const bot = new TelegramBot(token, { polling : false, pollingTimeout : 30000 });


// Here the message represents any time of message that is coming from the user
// You can specify the message if you have more responses for each message

bot.on("message",(msg)=>{
  
  console.log("Message Called",msg);
  //the msg parameter is an object consisting the data of the user and the message
  const chatId = msg.chat.id;

  //bot.sendMessage allows you to send message to the user
  bot.sendMessage(
    chatId,
    `💥 Hi ${msg.chat.first_name?msg.chat.first_name:""} ${msg.chat.last_name?msg.chat.last_name:""}!. Welcome to the River Poker ♦️♣️❤️♠️. The best online river poker game ever.`,
    {
      //reply_markup is an optional case where it helps you to send interactive buttons for user
      reply_markup: {
        // inline_keyboard takes 2D array as the value
        inline_keyboard: [
          [
            
            {
              text:"Play in Browser",
              url:"https://riv3.czargaming.com/pokerh5v4/"
            }],
            // using web_app key is important so that the game will open in the telegram web_app by clicking on the respectivce button
            [{ text:"Play in Telegram",web_app:{url:game_link} }
          ],
        ],
      },
      
    },
  );
})

// To handle the polling_error we restart the polling after 5 seconds
bot.on("polling_error",(error)=>{
  if (error.code === 'EFATAL') {
    setTimeout(() => {
        bot.startPolling();
    }, 5000);
  }
})

// Running the express.js server on port 4000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

