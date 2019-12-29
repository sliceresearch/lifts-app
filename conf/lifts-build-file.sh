

git reset --hard
git pull https://github.com/sliceresearch/lifts-app.git #ssh://git@bitbucket.org/damski/lifts.git

chmod +x /lab/lifts/conf/*

ls -l 

/lab/lifts/conf/lifts-build-image-gitlab-push.sh  #> /log/lifts.log &
