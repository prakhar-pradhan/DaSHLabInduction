#!/bin/bash

node /home/hexa/DashLabInductionsDev/API\ Call\(Client-Server\)/backend/index.js &
sleep 3
node /home/hexa/DashLabInductionsDev/API\ Call\(Client-Server\)/clients/client1/index.js &
node /home/hexa/DashLabInductionsDev/API\ Call\(Client-Server\)/clients/client2/index.js &
node /home/hexa/DashLabInductionsDev/API\ Call\(Client-Server\)/clients/client3/index.js &
node /home/hexa/DashLabInductionsDev/API\ Call\(Client-Server\)/clients/client4/index.js &

wait

echo "Executed"
