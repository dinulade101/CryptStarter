from flask import Flask, jsonify, request
import sqlite3
from dbhelper import DBHelper


app = Flask(__name__)
db = DBHelper()


@app.route('/')
def hello_world():
    return('Hello, World!')


@app.route('/api/createpost', methods=['POST', 'GET'])
def createpost():
    if request.method == 'POST':
        pic = request.args.get('pic')

        # delete
        print(pic)

        id = request.args.get('id')
        pic_link = request.args.get('pic_link')
        db.create_post(id, pic_link)


        return jsonify("success")


@app.route('/api/incrementlikes', methods=['POST', 'GET'])
def incrementlikes():
    if request.method == 'POST':
        id = request.args.get('id')
        db.increment_likes(id)
        
        return jsonify("success")


@app.route('/api/getpost', methods=['POST', 'GET'])
def getpost():
    if request.method == 'GET':
        id = request.args.get('id')
        post_details = db.get_post_likes_comments(id)
        print(post_details)
        
        return jsonify([{'likes': post_details[0]}, {'pic_link': post_details[1]}])


if __name__ == "__main__":
    app.run()
