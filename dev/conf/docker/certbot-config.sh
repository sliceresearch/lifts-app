
###############################################################install
sudo apt-get install -y software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get -y update

sudo DEBIAN_FRONTEND=noninteractive apt-get install -yq python-certbot-nginx

###############################################################install/run

#sudo docker run --rm --name choice-toastar  -v "/etc/letsencrypt:/etc/letsencrypt" -p 443:443 -p 80:80 -it registry.gitlab.com/damski/choice-toastar certbot --non-interactive --agree-tos --email damski@gmail.com --nginx -d choice-toastar.assim
ilate.net

#sudo docker run --rm --name choice-toastar  -v "/etc/letsencrypt:/etc/letsencrypt" -p 443:443 -p 80:80 -it registry-intl.cn-hangzhou.aliyuncs.com/assimilate/choice-toastar certbot --non-interactive --agree-tos --email damski@gmail.com --nginx -d choice-toastar.assim
ilate.net

##############################
#sudo docker run --rm --it --name choice-toastar  -v "/etc/letsencrypt:/etc/letsencrypt" -p 443:443 -p 80:80 -it registry-intl.cn-hangzhou.aliyuncs.com/assimilate/choice-toastar  /bin/bash certbot --non-interactive --agree-tos --email damski@gmail.com --nginx -d $1
#sudo docker run --rm --it --name choice-toastar  -v "/etc/letsencrypt:/etc/letsencrypt" -p 443:443 -p 80:80 -it registry.gitlab.com  /bin/bash certbot --non-interactive --agree-tos --email damski@gmail.com --nginx -d $1

# sudo certbot certonly — webroot — webroot-path=<filepath of website files/content> -d <domain.com> -d <subdomain.domain.com>


#docker run --rm -it -v "/root/letsencrypt/log:/var/log/letsencrypt" lojzik/letsencrypt certonly --webroot --webroot-path /var/www --email EMAIL -d domain



#docker run --rm -it -v "/root/letsencrypt/log:/var/log/letsencrypt" -v "/var/www/html/shared:/var/www/" -v "/etc/letsencrypt:/etc/letsencrypt" -v "/root/letsencrypt/lib:/var/lib/letsencrypt" lojzik/letsencrypt certonly --webroot --webroot-path /var/www --email EMAIL -d domain


#certbot --non-interactive --agree-tos --email damski@gmail.com --nginx -d $1
#nginx -t
#service nginx restart
