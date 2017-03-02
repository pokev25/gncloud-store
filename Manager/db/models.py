__author__ = 'NaDa'
# -*- coding: utf-8 -*-

import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime,  Numeric
from sqlalchemy.orm import relationship

from Manager.db.database import Base


class GnUser(Base):
    __tablename__ = 'GN_USERS'
    user_id = Column(String(50), primary_key= True, nullable=False)
    password = Column(String(50), primary_key= False, nullable= False)
    user_name = Column(String(20), primary_key= False, nullable= False)
    email= Column(String(30), primary_key= False, nullable= False)
    start_date = Column(DateTime, default=datetime.datetime.now())

    def __init__(self, user_id = user_id, password= None, team_code=None, user_name=None, tel=None, email=None, start_date=None):

        self.user_id = user_id
        self.password= password
        self.team_code = team_code
        self.user_name = user_name
        self.tel = tel
        self.email = email
        self.start_date = start_date

    def __repr__(self):
        return '< ID %r / Password %r / User_name %r / Tel %r / Start_date %r />' \
               % (self.user_id, self.password, self.user_name, self.email, self.start_date)

    def __json__(self):
        return ['user_id', 'password', 'user_name', 'email', 'start_date']


class GnSupport(Base):
    __tablename__ = 'GN_SUPPORT'
    id= Column(String(11), primary_key=True, nullable=False)
    title= Column(nullable=False ,default='')
    text= Column(nullable=False ,default='')
    write_date = Column(DateTime, nullable=True, default='')
    author_id= Column(String(50), primary_key=False, nullable=False)
    author_name = Column(String(10), primary_key=False, nullable=False)
    parent_id = Column(Integer, primary_key=False, nullable=False)
    count = Column(Integer, primary_key=False, nullable=False)

    def __init__(self, title=None, text=None, write_date=None, author_id=None, author_name=None,count=None, parent_id=None):
        self.title=title
        self.text=text
        self.write_date = write_date
        self.author_id = author_id
        self.author_name = author_name
        self.count =count
        self.parent_id = parent_id

    def __repr__(self):
        return '< ID %r / Title %r / Text %r / Write_date %r / Author_id %r / Author_name %r / Count %r / Parent_id %r />' \
            %(self.id , self.title , self.text, self.write_date, self.author_id, self.author_name, self.count, self.parent_id)

    def __json__(self):
        return ['id', 'title', 'text','write_date','author_id','author_name','count', 'parent_id']