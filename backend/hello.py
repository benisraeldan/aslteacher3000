import time
import tensorflow
from flask import Flask, request, redirect, url_for
from werkzeug.utils import secure_filename
import json
from datauri import DataURI
app = Flask(__name__)

def runSomeMl(vid):
    time.sleep(100)

	
@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
      ans = request.args.get('data','')
      uri = DataURI(ans)
      data=uri.data
      file = open('myfile.mp4', 'wb')
      file.write(data)
      return 'file uploaded successfully'
	  
	  
@app.route('/')
def hello():
    return "ASL SERVER!"
	

if __name__ == '__main__':
    app.run()
