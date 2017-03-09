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
import jwt
import smtplib

from email.MIMEMultipart import MIMEMultipart
from email.MIMEBase import MIMEBase
from email.MIMEText import MIMEText
from email import Encoders
from email.header import Header
from email import Utils
import os

EMAIL_HOST = 'email-smtp.us-east-1.amazonaws.com'
EMAIL_HOST_USER = 'AKIAJ5U76AZ42RBA7B4A'
EMAIL_HOST_PASSWORD = 'Arlqg8RnJosHLdDpJVEDrJ0dGNP10Xp422lzPDy/25rn'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
me = 'shjoo@gnclouds.com'
title = "지앤클라우드 인증 메일입니다."

def emailtoken(email, sql_session):
    email_json = {"email" : email}
    encoded = jwt.encode(email_json,'secret','HS256')
    send_ses(email,encoded,sql_session)
    print encoded
    user_info = GnUser(user_id = email, token=encoded,email=email, start_date=datetime.datetime.now().strftime('%Y%m%d%H%M%S'))
    sql_session.add(user_info)
    sql_session.commit()
    return True

def send_ses(email,emailcheck, sql_session):
    you = email
    msg = MIMEMultipart("alternative")
    msg['Subject'] = Header(s=title, charset="utf-8")
    msg['From'] = me
    msg['To'] = you
    msg = MIMEText("http://127.0.0.1/#/checkurl?url="+emailcheck)

    s = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
    s.starttls()
    s.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
    s.sendmail(me,you,msg.as_string())
    s.quit()

def check_url(url,sql_session):
    url_info=sql_session.query(GnUser).filter(GnUser.token == url).one_or_none()
    if url_info != None:
        return True
    else:
        return False
