from flask import Flask, jsonify, send_from_directory
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
        id = request.form['id']
        pic_link = request.form['pic_link']
        db.create_post(id, pic_link)


@app.route('/api/incrementlikes', methods=['POST', 'GET'])
def incrementlikes():
    if request.method == 'POST':
        id = request.form['id']
        db.increment_likes(id)


@app.route('/api/getpost', methods=['POST', 'GET'])
def getpost():
    if request.method == 'GET':
        post_details = db.get_post_likes_comments(request.form['id'])
        return jsonify([{'likes': post_details[0]}, {'pic_link': post_details[1]}])


if __name__ == "__main__":
    app.run()
