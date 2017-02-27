__author__ = 'NaDa'
# -*- coding: utf-8 -*-

import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime,  Numeric
from sqlalchemy.orm import relationship

from Manager.db.database import Base


class GnHostMachines(Base):
    __tablename__ = "GN_HOST_MACHINES"
    id = Column(String(100), primary_key=True, nullable=False)
    name = Column(String(100), primary_key=False, nullable=False)
    ip = Column(String(50), primary_key=False, nullable=False)
    type = Column(String(10), ForeignKey('GN_CLUSTER.type'))
    cpu = Column(Integer, primary_key=False, nullable=False)
    mem = Column(Integer, primary_key=False, nullable=False)
    disk = Column(Integer, primary_key=False, nullable=False)
    host_agent_port = Column(Integer, primary_key=False, nullable=False)

    def __init__(self, id=None, ip=None, type=None, cpu=None, mem=None,disk=None, name=None):
        self.id = id
        self.type = type
        self.ip = ip
        self.cpu = cpu
        self.mem = mem
        self.disk = disk
        self.name = name

    def __repr__(self):
        return '<Id %r / Ip %r / Type %r>' \
               % (self.id, self.ip, self.type)

    def __json__(self):
        return ['id', 'ip', 'type','name']

