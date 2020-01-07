

#### remote site: damski@www.assimilate.net
ssh -t ubuntu@115.146.85.9 'sudo docker system prune -af'
ssh -t ubuntu@115.146.85.9 'sudo docker login --username=damski@gmail.com registry.gitlab.com --password-stdin < ~/.ssh/dock_pw_gitlab'
ssh -t ubuntu@115.146.85.9 'sudo docker pull registry.gitlab.com/damski/lifts-app'
ssh -t ubuntu@115.146.85.9 '/home/ubuntu/lifts-run.sh'

exit

