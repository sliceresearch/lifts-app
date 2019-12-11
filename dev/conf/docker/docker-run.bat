
docker stop choice-toastar
docker rm choice-toastar

docker run --name choice-toastar -v //d/Projects/ainteractive/choice-toastar:/choice-toastar   -p 8080:8080 -p 80:80 -it damskidock/choice-toastar  /bin/bash
