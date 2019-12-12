

cd d:/Projects/ainteractive/choice-toastar/src/app/app3/js/appx

git pull

git add -A
git commit -m  "deploy"
git push

cd d:/Projects/ainteractive/choice-toastar
git add -A
git commit -m  "deploy"
git push

robocopy d:/Projects/ainteractive/choice-toastar/src d:/Projects/adeploy/choice-toastar.deploy/src /MIR
robocopy d:/Projects/ainteractive/choice-toastar/conf d:/Projects/adeploy/choice-toastar.deploy/conf /MIR

cd d:/Projects/adeploy/choice-toastar.deploy
git add -A
git commit -m  "deploy"
git push
