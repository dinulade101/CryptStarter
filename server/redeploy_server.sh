set -x
echo "pulling the repo"

git pull 
sudo systemctl restart app
sudo systemctl restart nginx
