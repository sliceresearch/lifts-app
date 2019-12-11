

##ssh remote




################################################################################################alibaba build

sudo docker login --username=damski@gmail.com registry-intl.cn-hangzhou.aliyuncs.com --password-stdin < ~/.ssh/dock_pw_alibaba

ssh -t ubuntu@choice-toastar.jshanghd.com 'sudo docker system prune -af'

sudo docker build --build-arg host_id=choice-toastar --build-arg host_name=choice-toastar.jshanghd.com -t registry-intl.cn-hangzhou.aliyuncs.com/assimilate/choice-toastar -f ./conf/docker/docker-build-file .
sudo docker push registry-intl.cn-hangzhou.aliyuncs.com/assimilate/choice-toastar

ssh -t ubuntu@choice-toastar.jshanghd.com 'sudo docker login --username=damski@gmail.com registry-intl.cn-hangzhou.aliyuncs.com --password-stdin < ~/.ssh/dock_pw_alibaba'
ssh -t ubuntu@choice-toastar.jshanghd.com 'sudo docker pull registry-intl.cn-hangzhou.aliyuncs.com/assimilate/choice-toastar'
ssh -t ubuntu@choice-toastar.jshanghd.com '/home/ubuntu/choice-toastar-run'

