const axios = require('axios');
const fs = require("fs").promises;


const clientId = 4;

const PromptArr = [];
const outputArr = [];

async function createInputArray(){
    var toPush = [];

    const data = await fs.readFile('/home/hexa/DashLabInductionsDev/API\ Call\(Client-Server\)/clients/client4/input.txt', 'utf-8')
    
    toPush = data.split("\r\n");

    PromptArr.push(...toPush)
} 


    async function hh(){
        await createInputArray();
        try{
            await axios.post('http://localhost:3000/', 
                { 
                    PromptArr,
                    clientId
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer your-token-here'
                    }
                }
            )
            .then(response => {
                outputArr.push(response.data);
                // console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }
        catch(err) {
            console.log(err)
        }
        writeToFile();
    }

hh();

async function writeToFile(){

    const outputJSON = JSON.stringify(outputArr,null,2);
    await fs.writeFile('/home/hexa/DashLabInductionsDev/API\ Call\(Client-Server\)/clients/client4/output.json', outputJSON)
    console.log("Recieved Response of Client" + clientId);

}
