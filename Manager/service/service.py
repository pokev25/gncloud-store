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

#지원 게시판 부분
def supportlist(page,sql_session):
    page_size=10
    page=int(page)-1
    total_count=[]
    list = sql_session.query(GnSupport).filter(GnSupport.parent_id == None).order_by(GnSupport.write_date.asc()).limit(page_size).offset(page * page_size).all()
    total_page= sql_session.query(func.count(GnSupport.id).label("count"))\
        .filter(GnSupport.parent_id == None).one()
    for e in list:
        e.write_date = e.write_date.strftime('%Y-%m-%d    %H:%M')
        total_count.append(len(sql_session.query(GnSupport).filter(GnSupport.parent_id == e.id).all()))
    total=int(total_page.count)/10
    return {"list":list,"total":total,"support_count":total_count,"page":page,"total_page":total_page.count}

def supportinfo(id, sql_session): #게시판 상세페이지
    post_info = sql_session.query(GnSupport).filter(GnSupport.id == id).filter(GnSupport.parent_id ==None).one()
    post_info.write_date = post_info.write_date.strftime('%Y-%m-%d    %H:%M')
    reply_info = sql_session.query(GnSupport).filter(GnSupport.parent_id == id).all()
    for reply in reply_info:
        reply.write_date = reply.write_date.strftime('%Y-%m-%d    %H:%M')
    return {"post":post_info, "reply":reply_info}

def supportchange(id,text,sql_session): #게시판 상세페이지 내용 수정
    post_info = sql_session.query(GnSupport).filter(GnSupport.id == id).one()
    post_info.text = text
    sql_session.commit()

def supportreplycreate(id,text,sql_session):
    reply_info= GnSupport(text=text, author_id='shjoo', author_name='주성훈', parent_id=id, write_date=datetime.datetime.now().strftime('%Y%m%d%H%M%S'))
    sql_session.add(reply_info)
    sql_session.commit()
