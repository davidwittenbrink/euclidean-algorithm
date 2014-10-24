import webapp2
import os
import logging
from google.appengine.api import memcache

class BaseHandler(webapp2.RequestHandler):
    
    def mime_type(self, path):
        "Returns mime type for given path"
        extension = path.rpartition('.')[-1]
        if extension == 'html':
            return "text/html"
        elif extension == 'css':
            return 'text/css'
        elif extension == 'js':
            return 'application/javascript'
        else:
            return ''
    
    def serve_static(self, relative_path):
        """Given a relative path this function trys to load a file from cache.
           If file isn't in cache, load it from disk and add it to it."""
        
        if ".py" in relative_path or ".pyc" in relative_path:
            self.error(404)
            return
        
        file_text = memcache.get(relative_path)
        if not file_text:
            absolute_path = os.path.join(os.path.dirname(__file__), relative_path)
            try:
                with open (absolute_path, "r") as myfile:
                    logging.warning('Read file %s from disk' % relative_path)
                    file_text = myfile.read()
                    memcache.add(relative_path, file_text)
            except EnvironmentError:
                logging.error('Could not find %s' % absolute_path)
                self.error(404)
                return
        self.response.headers['Content-Type'] = self.mime_type(relative_path)
        self.response.out.write(file_text)

class Server(BaseHandler):
    def get(self, file_path):
        "A simple file server. It caches files using memache."
        if file_path:
            if 'euklid.html' in file_path: 
                self.error(404)
                return
            self.serve_static(file_path)
        else: self.serve_static('euklid.html')

app = webapp2.WSGIApplication([( '/' + r'(.*)', Server)])