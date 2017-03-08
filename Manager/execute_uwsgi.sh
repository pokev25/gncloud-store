#!/bin/bash
nohup uwsgi --http-socket :8080 --plugin python --wsgi-file /var/lib/gncloud-store/Manager/__init__.py --logto /var/log/gncloud-store/manager.log --processes 4 --threads 2 --callable app &
