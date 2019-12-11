echo "15 3 * * * /usr/bin/certbot renew --quiet" > /etc/cron.d/cert-cron
crontab /etc/cron.d/cert-cron
chmod 0644 /etc/cron.d/cert-cron
crontab /etc/cron.d/cert-cron
touch /var/log/cron.log
cron
