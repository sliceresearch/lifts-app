

########################################### gitlab build

cd /lab/lifts

sudo docker system prune -af

sudo docker login --username=damski@gmail.com registry.gitlab.com --password-stdin < ~/.ssh/dock_pw_gitlab
echo 'build'
sudo docker build --build-arg host_id=lifts --build-arg host_name=lifts -t registry.gitlab.com/damski/lifts-app -f ./conf/lifts-build-dockerfile .
echo 'push'
sudo docker push registry.gitlab.com/damski/lifts-app
exit


