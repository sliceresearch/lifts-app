
docker stop choice-toastar
docker rm choice-toastar

docker run --name choice-toastar   -p 443:443 -p 80:80 -it damskidock/choice-toastar  /bin/bash
