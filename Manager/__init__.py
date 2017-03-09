# -*- coding: utf-8 -*-

import traceback

from datetime import timedelta
from flask import Flask, jsonify, request, session, escape, make_response

from Manager.db.database import db_session
from Manager.service.service import *
from Manager.util.config import config
from Manager.util.json_encoder import AlchemyEncoder
from Manager.service.loginservice import *
from Manager.service.emailservice import *

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

@app.route('/vm/logincheck',methods=['GET'])
def logoincheck():
    info_check = session.get('userName','No')
    if info_check != 'No':
        user_info = {"name":session['userName'],"user_id": session['userId']}
        return jsonify(status=True, check='yes',info=user_info)
    else:
        user_info = {"name":"","user_id": ""}
        return jsonify(status=True, check='no',info=user_info)

@app.route('/supportlist',methods=['GET']) #지원게시판
def Supportlist():
    text = ""
    page = ""
    if 'text' in request.args:
        text = request.args.get('text')
    if 'page' in request.args:
        page = request.args.get('page')
    return jsonify(status=True, message='success',list=supportlist(page,text,db_session))

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
    user_name = session['userName']
    user_id = session['userId']
    return jsonify(status=True, message='success', list=supportreplycreate(user_id,user_name,id,text,db_session))

@app.route('/supportdetail/<id>', methods=['DELETE']) # 지원게시판 내용 / 댓글 삭제
def SupportDetaildel(id):
    return jsonify(status=True, message='success', list=supportdel(id,db_session))

@app.route('/supportwrite', methods=['POST']) # 지원게시판 작성
def SupportDetailWrtie():
    if session.get('userId')==None:
        return jsonify(status=True, message='login')
    user_name = session['userName']
    user_id = session['userId']
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
    return jsonify(status=True, message='success', list=supportwrite(user_id,user_name,title,text,db_session))

@app.route('/supportmain',methods=['GET'])
def SupportMain():
    return jsonify(status=True,message='success', list=supportfamous(db_session))

###################################################################################################################

@app.route('/vm/account', methods=['POST'])
def login():
    user_id = request.json['login_id']
    password = request.json['login_pw']
    user_info = login_list(user_id, password, db_session)
    if user_info != None:
        session['userId'] = user_info.user_id
        session['userName'] = user_info.user_name
        return jsonify(status=True, check='yes')
    else:
        return jsonify(status=True, check='no')

@app.route('/vm/guestLogout', methods=['GET'])
def logout():
    session.clear()
    return jsonify(status=True, message="success")


#########################################################################################################
@app.route('/vm/emailcheck',methods=['POST'])
def emailCheck():
    email = request.json['email']
    emailtoken(email,db_session)
    return jsonify(status=True, message="success")

@app.route('/checkurl/<url>',methods=['GET'])
def checkUrl(url):
    checking = check_url(url,db_session)
    if checking == True:
        return jsonify(status=True,message='success', che='ok')
    else:
        return jsonify(status=True, message='False', che='false')

@app.route('/join',methods=['POST'])
def signUp():
    user_name =request.json['user_name']
    password = request.json['password']
    password_re = request.json['password_re']
    token= request.json['token']
    signup(user_name, password, password_re, token, db_session)
    return jsonify(status=True, message='success')
#### rest end ####



if __name__ == '__main__':
    app.run(port=8080)

