
sudo docker stop choice-toastar
sudo docker rm choice-toastar

sudo docker run --name choice-toastar -d -v "/home/damski/data:/data" -v "/etc/letsencrypt:/etc/letsencrypt" -p 443:443 -p 80:80 -it registry.gitlab.com/damski/choice-toastar
