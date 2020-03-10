
cd /lifts

mongod &
service nginx restart
sleep 5
npm run serve:pm 