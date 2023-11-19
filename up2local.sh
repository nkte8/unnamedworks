#!/bin/bash
cd $(dirname $0)
USER="ubuntu"
SERVER_IP="192.168.3.210"
SERVER=${USER}@${SERVER_IP}
PORT=22

PATH="/var/www/html/"

/usr/bin/ssh -p $PORT ${SERVER} "rm -rf ${PATH}/*"
/usr/bin/scp -r -P $PORT ./docs/* ${SERVER}:${PATH}
/usr/bin/ssh -p $PORT ${SERVER} "sudo systemctl restart nginx"