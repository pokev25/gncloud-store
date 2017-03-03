# -*- coding: utf-8 -*-

import traceback

from datetime import timedelta
from flask import Flask, jsonify, request, session, escape, make_response

from Manager.db.database import db_session
from Manager.service.service import *
from Manager.util.config import config
from Manager.util.json_encoder import AlchemyEncoder

app = Flask(__name__)
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(minutes=60)
app.json_encoder = AlchemyEncoder
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

#####common function start#####

@app.before_request
# def before_request():
#     if ('userId' not in session) and request.path != '/vm/logincheck' \
#             and request.path != '/vm/guestLogout' and request.path != '/vm/account' \
#             and (request.path!= 'vm/account/users' and request.method !='POST') \
#             and  request.path != '/vm/account/testtest':
#         return make_response(jsonify(status=False),401)

#   session.permanent = True
#   app.permanent_session_lifetime = timedelta(minutes=60)

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()
    if exception and db_session.is_active:
        db_session.rollback()

@app.errorhandler(500)
def internal_error(error):
    print(traceback.format_exc())
    return jsonify(status=False, message="서버에 에러가 발생했습니다. 관리자에게 문의해주세요.")

#####common function end#####


#### rest start ####
@app.route('/')
def index():
    return jsonify(status=True, message='Logged in as %s'% escape(session['user_id']))

@app.route('/supportlist',methods=['GET']) #지원게시판
def Supportlist():
    return jsonify(status=True, message='success',list=supportlist(db_session))

@app.route('/supportdetail/<id>',methods=['GET']) #지원게시판 상세페이지
def SupportDetail(id):
    return jsonify(status=True, message='success', list=supportinfo(id,db_session))

@app.route('/supportdetail/<id>',methods=['PUT']) #지원게시판 내용 수정
def SupportDetailChange(id):
    text = request.json['post_text']
    return jsonify(status=True, message='success', list=supportchange(id,text,db_session))

@app.route('/supportdetail/reply/<id>',methods=['POST']) # 지원게시판 댓글 작성
def SupportDetailReply(id):
    text = request.json['reply_text']
    return jsonify(status=True, message='success', list=supportreplycreate(id,text,db_session))

@app.route('/supportdetail/<id>', methods=['DELETE']) # 지원게시판 내용 / 댓글 삭제
def SupportDetaildel(id):
    return jsonify(status=True, message='success', list=supportdel(id,db_session))

@app.route('/supportwrite', methods=['POST']) # 지원게시판 작성
def SupportDetailWrtie():
    title=""
    text=""
    if 'title' in request.json:
        title = request.json['title']
    if 'text' in request.json:
        text = request.json['text']
    if title =="":
        return jsonify(status=False, message='title')
    elif text == "":
        return jsonify(status=False, message='text')
    return jsonify(status=True, message='success', list=supportwrite(title,text,db_session))

#### rest end ####


if __name__ == '__main__':
    app.run(port=8080)

