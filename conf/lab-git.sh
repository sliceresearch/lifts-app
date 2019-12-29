
################################### akit update
#cd /lab/assimilate.kit
#git reset --hard
#git pull ssh://git@bitbucket.org/damski/assimilate.kit.git

###################################
cd /lab/lifts
git reset --hard
git pull https://github.com/sliceresearch/lifts-app.git #ssh://git@bitbucket.org/damski/lifts.git

#chmod +x /lab/lifts/conf/docker/*

#cp -r /lab/assimilate.kit/* /lab/guangcai/src/app/app3/js/akit/

sudo docker system prune -af

pwd

/lab/lifts/conf/docker-build-remote.sh  > /log/lifts.log &
