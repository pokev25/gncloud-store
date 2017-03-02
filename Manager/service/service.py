# -*- coding: utf-8 -*-

__author__ = 'NaDa'

import json

import requests
from flask import render_template
from pexpect import pxssh
from sqlalchemy import func,or_

from Manager.db.database import db_session
from Manager.db.models import *
from Manager.util.config import config
from Manager.util.hash import random_string, convertToHashValue, convertsize

#지원 게시판 부분
def supportlist(page,sql_session):
    page_size=10
    page=int(page)-1
    total_count=[]
    list = sql_session.query(GnSupport).filter(GnSupport.parent_id == None).order_by(GnSupport.write_date.asc()).limit(page_size).offset(page * page_size).all()
    total_page= sql_session.query(func.count(GnSupport.id).label("count"))\
        .filter(GnSupport.parent_id == None).one()
    for e in list:
        e.write_date = e.write_date.strftime('%Y-%m-%d %H:%M')
        total_count.append(len(sql_session.query(GnSupport).filter(GnSupport.parent_id == e.id).all()))
    total=int(total_page.count)/10
    return {"list":list,"total":total,"support_count":total_count,"page":page,"total_page":total_page.count}