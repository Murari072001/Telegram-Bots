const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");


// const { Telegraf } = require("telegraf");


// const { message } = require("telegraf/filters");
// const { keyboard } = require("telegraf/markup");
// const { createCallBackBtn } = require("./utils");


const app = express();
const port = 4000;
// const TOKEN = "7416916323:AAGuCR1WWFjDcDXErdKDE0fNjzSs0lx60lU"; // todolist_by_murari_bot
const TOKEN = "7207643438:AAGzPQpy22EfI_2_vssaRlsC4UnEJSbopkw";  // river_staging_bot


const game_link = "https://riv3.czargaming.com/pokerh5v4/";
// const game_link = "https://riv3.czargaming.com";

app.use(cors());
app.use(bodyParser.json());

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
const token = TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Bot commands

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  // console.log("Message::>", msg);
  
  
  bot.sendMessage(
    chatId,
    `💥 Hi ${msg.chat.first_name?msg.chat.first_name:""} ${msg.chat.last_name?msg.chat.last_name:""}!. Welcome to the River Poker ♦️♣️❤️♠️. The best online river poker game ever.`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Next Step",
              callback_data:"Next Process"
            }
          ],
        ],
      },
      
    },
  );
});


bot.on("message",(msg)=>{
  const chatId = msg.chat.id;
  console.log("Message Called",msg);
  if (msg.text=="🙎🏻‍♂️ Profile") {
    bot.sendMessage(chatId,`You can get your account details Here. This feature will be implemented soon`)
  }
  if(msg.text=="💳 Deposit"){
    bot.sendMessage(chatId,`You can deposit your money Here. This feature will be implemented soon`)
  }
  if(msg.text=="🎲 Play Now"){
    bot.sendMessage(chatId,`🕹️ Click the button to play.`,{
      reply_markup: {
        inline_keyboard:[
          [
            
            {
              text:"Play in Browser",
              url:"https://riv3.czargaming.com/pokerh5v4/"
            }],
            [{ text:"Play in Telegram",web_app:{url:game_link} }
          ],
        ] ,
      }
    })
  }
  if(msg.text=="💰 Wallet"){
    bot.sendMessage(chatId,`You will get your wallet details Here. This feature will be implemented soon`)
  }
})


bot.on("contact",(msg)=>{
  const chatId = msg.chat.id;
  const contact=msg.contact
  console.log("Contact Number",contact);
  bot.sendMessage(chatId,`Thanks for Sharing your contact.\n Your Phone Number is +${contact.phone_number}`,{
    reply_markup:{
      keyboard:[[
        {text:"🙎🏻‍♂️ Profile"},
        {text:"💳 Deposit"},
        {text:"🎲 Play Now"},
        {text:"💰 Wallet"}
      ]],
      resize_keyboard:true,
    }
  })
  
})


bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const data = callbackQuery.data;
  console.log("Callback Data",callbackQuery);
  if (data === 'Next Process') {
    // Respond to the callback query
    bot.sendMessage(message.chat.id, 'You need to register your mobile number so please click on the below "Send Contact" button. In case of desktop or webTelegram click on ⌘ symbol and click on "Send Contact" button.',{
      reply_markup: {
        keyboard: [
          [{
            text: "Share Contact",
            request_contact: true,
          }]
        ],
        one_time_keyboard:true
      },
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

