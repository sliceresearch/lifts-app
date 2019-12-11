

##ssh remote


########################################### lab build


########################################### gitlab build

sudo docker login --username=damski@gmail.com registry.gitlab.com --password-stdin < ~/.ssh/dock_pw_gitlab

ssh -t damski@www.assimilate.net 'sudo docker system prune -af'

sudo docker build --build-arg host_id=assimilate --build-arg host_name=choice-toastar.assimilate.net -t registry.gitlab.com/damski/choice-toastar -f ./conf/docker/docker-build-file .
sudo docker push registry.gitlab.com/damski/choice-toastar


ssh -t damski@www.assimilate.net 'sudo docker login --username=damski@gmail.com registry.gitlab.com --password-stdin < ~/.ssh/dock_pw_gitlab'
ssh -t damski@www.assimilate.net 'sudo docker pull registry.gitlab.com/damski/choice-toastar'
ssh -t damski@www.assimilate.net '/home/damski/choice-toastar-run'


