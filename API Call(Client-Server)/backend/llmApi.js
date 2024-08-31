const fs = require("fs").promises;
require('dotenv').config();

const { GoogleGenerativeAI  } = require("@google/generative-ai");
const APIkey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI (APIkey);
const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"});

var outputArr = [];

async function sendReq(Prompt,clientId, outputArrS){
    try{
        TimeSent = Date.now()
        const res = await model.generateContent(Prompt);
        TimeRecvd = Date.now()
        let Message = res.response.text()
        Message = Message.slice(0,-3)
        data = {
            clientId,
            Prompt,
            Message,
            TimeSent,
            TimeRecvd,
            Source : "Gemini"
        }
        outputArrS.push(data)
    }
    catch(err){
        console.log(err)
    }
}

async function sendRequestFromClient(PromptArray, clientId, outputArrS){

    await Promise.all(PromptArray.map(Prompt => sendReq(Prompt, clientId, outputArrS)));
    

}

module.exports = {
    sendRequestFromClient,
    outputArr
}
