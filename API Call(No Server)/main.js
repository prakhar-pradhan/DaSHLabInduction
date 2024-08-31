const fs = require("fs").promises;
require('dotenv').config();

const { GoogleGenerativeAI  } = require("@google/generative-ai");
const APIkey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI (APIkey);
const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"});

var PromptArray = [];
var outputArr = [];

async function createInputArray(){
    var toPush = [];

    const data = await fs.readFile('input.txt', 'utf-8')
    toPush = data.split("\r\n");

    PromptArray.push(...toPush)
} 

async function sendReq(Prompt){
    TimeSent = Date.now()
    const res = await model.generateContent(Prompt);
    TimeRecvd = Date.now()
    let Message = res.response.text()
    Message = Message.slice(0,-3)
    data = {
        Prompt,
        Message,
        TimeSent,
        TimeRecvd,
        Source : "Gemini"
    }
    outputArr.push(data)
}



(async function (){
    await createInputArray();

    await Promise.all(PromptArray.map(Prompt => sendReq(Prompt)));

    const outputJSON = JSON.stringify(outputArr,null,2);
    await fs.writeFile('output.json', outputJSON)
    console.log("done")   
})
();

