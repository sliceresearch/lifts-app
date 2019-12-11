

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



################################################################################################alibaba build

sudo docker login --username=damski@gmail.com registry-intl.cn-hangzhou.aliyuncs.com --password-stdin < ~/.ssh/dock_pw_alibaba

ssh -t ubuntu@choice-toastar.jshanghd.com 'sudo docker system prune -af'

sudo docker build --build-arg host_id=choice-toastar --build-arg host_name=choice-toastar.jshanghd.com -t registry-intl.cn-hangzhou.aliyuncs.com/assimilate/choice-toastar -f ./conf/docker/docker-build-file .
sudo docker push registry-intl.cn-hangzhou.aliyuncs.com/assimilate/choice-toastar

ssh -t ubuntu@choice-toastar.jshanghd.com 'sudo docker login --username=damski@gmail.com registry-intl.cn-hangzhou.aliyuncs.com --password-stdin < ~/.ssh/dock_pw_alibaba'
ssh -t ubuntu@choice-toastar.jshanghd.com 'sudo docker pull registry-intl.cn-hangzhou.aliyuncs.com/assimilate/choice-toastar'
ssh -t ubuntu@choice-toastar.jshanghd.com '/home/ubuntu/choice-toastar-run'



#####################################################################################################################################


#ssh -t damski@www.assimilate.net 'sudo docker rm choice-toastar'
#ssh -t damski@www.assimilate.net 'sudo docker stop choice-toastar'
#ssh -t damski@www.assimilate.net 'sudo docker run --name choice-toastar -p 443:443 -p 80:80 -it registry.gitlab.com/damski/choice-toastar'


#ssh -t damski@www.assimilate.net 'sudo docker run --name choice-toastar -p 443:443 -p 80:80 -it registry-intl.cn-hangzhou.aliyuncs.com'






######################################################################################################notused

#sudo docker login --username=damski@gmail.com registry-intl.cn-hangzhou.aliyuncs.com
#sudo docker build --build-arg host_name=choice-toastar.jshanghd.com -t registry-intl.cn-hangzhou.aliyuncs.com/assimilate/choice-toastar -f ./conf/docker/docker-build-file .
# sudo docker push registry-intl.cn-hangzhou.aliyuncs.com/assimilate/choice-toastar

#sudo docker login --username=damski@gmail.com registry-intl.cn-hangzhou.aliyuncs.com
# sudo docker pull registry-intl.cn-hangzhou.aliyuncs.com/assimilate/choice-toastar
