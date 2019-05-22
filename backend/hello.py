import time
import tensorflow
from flask import Flask, request, redirect, url_for
from werkzeug.utils import secure_filename
app = Flask(__name__)

def runSomeMl(vid):
    time.sleep(100)


@app.route("/")
def hello():
    return """
    Hello World <script>document.write('blah')</script>
    <form action = "http://localhost:5000/uploader" method = "POST" 
         enctype = "multipart/form-data">
         <input type = "file" name = "file" />
         <input type = "submit"/>
      </form>
    """


@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']
      #f.save(secure_filename(f.filename))
      runSomeMl(f)
      return 'file uploaded successfully'
