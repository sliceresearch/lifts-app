
cd /lifts

mongod &
service nginx restart
sleep 5
pm2 start ./src/server/server.js  &