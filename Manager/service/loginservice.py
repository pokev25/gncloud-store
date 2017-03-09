# -*- coding: utf-8 -*-

__author__ = 'NaDa'

import json

import requests
from flask import render_template
from pexpect import pxssh
from sqlalchemy import func,or_
import datetime
from Manager.db.database import db_session
from Manager.db.models import *
from Manager.util.config import config
from Manager.util.hash import random_string, convertToHashValue, convertsize

def login_list(id , password, sql_session):
    password = convertToHashValue(password)
    user_info = sql_session.query(GnUser) \
    .filter(GnUser.user_id == id) \
    .filter(GnUser.password == password) \
    .one_or_none()
    if user_info != None:
        return user_info
    else:
        return False

def signup(user_name, password, passowrd_re, token, sql_session):
    info = sql_session.query(GnUser).filter(GnUser.token == token).one()
    if password == passowrd_re:
        info.password = convertToHashValue(password)
        info.user_name = user_name
        sql_session.commit()
        return True
    else:
        return False