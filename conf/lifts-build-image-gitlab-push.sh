

########################################### gitlab build

cd /lab/lifts

sudo docker system prune -af

sudo docker login --username=damski@gmail.com registry.gitlab.com --password-stdin < ~/.ssh/dock_pw_gitlab

sudo docker build --build-arg host_id=lifts --build-arg host_name=lifts -t registry.gitlab.com/damski/lifts -f ./conf/lifts-build-dockerfile .
sudo docker push registry.gitlab.com/damski/lifts



