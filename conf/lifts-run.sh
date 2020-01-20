
################################### akit update
#cd /lab/assimilate.kit
#git reset --hard
#git pull ssh://git@bitbucket.org/damski/assimilate.kit.git

###################################
#cd /lab/lifts
#npm run serve

#mongo lifts --eval "db.dropDatabase()"

sudo docker stop lifts-app
sudo docker rm lifts-app

sudo docker run --name lifts-app -d -v "/home/ubuntu/lifts.db:/data/db" -v "/home/ubuntu/lifts.db:/data/db" -v "/etc/letsencrypt:/etc/letsencrypt"  -p 443:443 -p 80:80 -it registry.gitlab.com/damski/lifts-app



#sudo docker run --name lifts-app -d -v "/home/ubuntu/lifts.db:/data/db" -v "/home/ubuntu/lifts.db:/data/db"   -p 443:443 -p 80:80 -it registry.gitlab.com/damski/lifts-app
