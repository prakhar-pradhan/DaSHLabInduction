const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

var { sendRequestFromClient, outputArr } = require("./llmApi") 


const app = express()
app.use(bodyParser.json())
app.use(cors())

app.post("/",async (req,res)=>{
    const PromptArray = req.body.PromptArr;
    const clientId = req.body.clientId;
    console.log("Request from " + clientId + " : " + PromptArray);
    let outputArrS = [];
    outputArr.length = 0;

    await sendRequestFromClient(PromptArray, clientId, outputArrS);
    
    res.json(outputArrS)
})



app.listen(3000,()=>{console.log("Server Up")})