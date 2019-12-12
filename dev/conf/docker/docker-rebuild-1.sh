
################################### appx update
cd /lab/assimilate.kit
git reset --hard
git pull ssh://git@bitbucket.org/damski/assimilate.kit.git

###################################
cd /lab/choice-toastar
git reset --hard
git pull ssh://git@bitbucket.org/damski/choice-toastar.git

chmod +x /lab/choice-toastar/conf/docker/*

cp -r /lab/assimilate.kit/* /lab/choice-toastar/src/app/app3/js/appx/

sudo docker system prune -af

/lab/choice-toastar/conf/docker/docker-build-remote-1.sh  > /log/guancai.log &
