sudo pwd
cd ~/choice-toastar
sudo docker rm choice-toastar
git reset --hard
git pull
sudo chmod +x ~/choice-toastar/conf/docker/*
sudo chmod +x ~/choice-toastar/conf/git/*
sudo docker system prune -a
sudo docker build -t damskidock/choice-toastar -f ./conf/docker/docker-build-file .
