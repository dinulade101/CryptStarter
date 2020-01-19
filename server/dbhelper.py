import sqlite3


class DBHelper:
    def __init__(self):
        conn = sqlite3.connect('database.db')
        print("Opened database successfully")
        conn.execute('drop table if exists data')
        conn.execute(
            'CREATE TABLE data (ID INT PRIMARY KEY, LIKES INT, PIC_LINK TEXT)')
        print("Table created successfully")
        conn.close()


    def get_db():
        return sqlite3.connect('database.db')


    def query_db(query, args=(), one=False):
        cur = get_db().execute(query, args)
        rv = cur.fetchall()
        cur.close()
        return (rv[0] if rv else None) if one else rv


    def increment_likes(self, post_id):
        post = query_db('select * from data where id = ?', [post_id], one=True)

        if post:
            with sqlite3.connect("database.db") as con:
                try:
                    cur = con.cursor()
                    cur.execute('update data set likes = ? where id = ?',
                                (int(post[1]) + 1, post_id))

                    con.commit()
                    print(f"Updated likes for {post_id} to {int(post[1]+1)}")
                except Exception as e:
                    print(e)
                    con.rollback()
                    print("error in update adding likes")

        else:
            print('no post to add like')


    def get_likes(self, post_id):
        post = query_db('select * from data where id = ?', (post_id), one=True)

        if post:
            return post[1]
        else:
            print("post not found")
            return (-1, -1)


    def create_post(self, post_id, pic_link=""):
        with sqlite3.connect("database.db") as con:
            try:
                cur = con.cursor()
                cur.execute(
                    "INSERT INTO data (id, likes,pic_link) VALUES (?,?,?)", (post_id, 0, pic_link))

                con.commit()
                print(f"Record {post_id} successfully added")
            except Exception as e:
                print(e)
                con.rollback()
                print("error in insert operation")


    def get_post_likes_comments(self, post_id):
        post = query_db('select * from data where id = ?', [post_id], one=True)

        if post:
            print(post)
            return (post[1], post[2])
        else:
            print("post not found")
            return (-1, -1)


    # def close_db(self):
    #     get_db().close()
