

########################################### gitlab build

sudo docker login --username=damski@gmail.com registry.gitlab.com --password-stdin < ~/.ssh/dock_pw_gitlab

sudo docker build --build-arg host_id=lifts --build-arg host_name=lifts -t registry.gitlab.com/damski/lifts -f ./conf/docker-build-file .
sudo docker push registry.gitlab.com/damski/lifts

#### remote site: damski@www.assimilate.net
ssh -t damski@www.assimilate.net 'sudo docker system prune -af'
ssh -t damski@www.assimilate.net 'sudo docker login --username=damski@gmail.com registry.gitlab.com --password-stdin < ~/.ssh/dock_pw_gitlab'
ssh -t damski@www.assimilate.net 'sudo docker pull registry.gitlab.com/damski/lifts'
ssh -t damski@www.assimilate.net '/lab/lifts/conf/lifts-run.sh'

