

########################################### gitlab build

cd /lab/lifts

sudo heroku login -i damski@gmail.com  < ~/.ssh/herokupw
sudo heroku container:login

sudo docker build --build-arg host_id=lifts --build-arg host_name=lifts -t liftsappheroku -f ./conf/lifts-build-dockerfile .

sudo docker tag liftsappheroku registry.heroku.com/liftsapp/web

sudo docker push registry.heroku.com/liftsapp/web

sudo heroku container:release web

