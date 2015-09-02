from datetime import date
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
from tornado.escape import json_encode
import tinremote

from tornado.options import define, options

define("port", default=8888, help="run on the given port", type=int)
Couleurs = []

class VersionHandler(tornado.web.RequestHandler):
    def get(self):
        response = { 'version': '3.5.1',
                     'last_build':  date.today().isoformat() }
        self.write(response)
 
class GetGameByIdHandler(tornado.web.RequestHandler):
    def get(self, id):
        response = { 'id': int(id),
                     'name': 'Crazy Game',
                     'release_date': date.today().isoformat() }
        self.write(response)

class User(tornado.web.RequestHandler):
    def get(self):
        form = """<form method="post">
        <input type="text" name="username"/>
        <input type="text" name="designation"/>
        <input type="submit"/>
        </form>"""
        self.write(form)
 
    def post(self):
        username = self.get_argument('username')
        designation = self.get_argument('designation')
        self.write("Wow " + username + " you're a " + designation)

class PostPose(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.set_header('Access-Control-Max-Age', 1000)
        self.set_header('Access-Control-Allow-Headers', '*')
        self.set_header('Content-type', 'application/json')

    def post(self):
        #my_data = self.request.arguments['test_string']
        pose = self.get_argument('pose')
        # do something with my_data
        print pose
        #self.write(json_encode(my_data))
        #self.write("YO")
        self.finish()
        tinremote.takecontrol()
        tinremote.issuecommand( 31, pose)
        
class AjaxHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.set_header('Access-Control-Max-Age', 1000)
        self.set_header('Access-Control-Allow-Headers', '*')
        self.set_header('Content-type', 'application/json')

    def post(self):
        #my_data = self.request.arguments['test_string']
        couleur1 = self.get_argument('couleur1')
        couleur2 = self.get_argument('couleur2')
        couleur3 = self.get_argument('couleur3')
        couleur4 = self.get_argument('couleur4')
        # do something with my_data
        print couleur1,couleur2,couleur3,couleur4
        #self.write(json_encode(my_data))
        #self.write("YO")
        self.finish()
        #tinremote.takecontrol()
        #tinremote.issuecommand( 30, couleur1+"/"+couleur2+"/"+couleur3+"/"+couleur4)
        #

class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r"/colors", AjaxHandler),
            (r"/pose", PostPose),
            (r"/all_category/",VersionHandler),
            (r"/getgamebyid/([0-9]+)", GetGameByIdHandler),
            (r"/user/", User)
        ]
        settings = dict(
            #autoescape=None,
        )
        tornado.web.Application.__init__(self, handlers, **settings)

 
if __name__ == "__main__":
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(Application())
    #tinremote.connect('127.0.0.1', '1234')
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.current().start()
