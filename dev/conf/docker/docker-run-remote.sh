
sudo docker stop choice-toastar
sudo docker rm choice-toastar

sudo docker run --name choice-toastar -v "/data:/data" -v "/etc/letsencrypt:/etc/letsencrypt"  -p 443:443 -p 80:80 -it registry-intl.cn-hangzhou.aliyuncs.com/assimilate/choice-toastar  /bin/bash

#sudo docker run --name choice-toastar -v "/data:/data" -v "/etc/letsencrypt:/etc/letsencrypt" -p 443:443 -p 80:8080 -it registry.gitlab.com/damski/choice-toastar  /bin/bash
