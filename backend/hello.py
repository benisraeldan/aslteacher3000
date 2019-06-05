import time
import datetime
import tensorflow
import os
import math
import cv2
from flask import Flask, request, redirect, url_for
from werkzeug.utils import secure_filename
from flask_cors import CORS

from video import Videos
from aslteacher3000 import ASLModel

import json
app = Flask(__name__)
CORS(app)

folder = "video"
backend_path = r'C:\Users\gural\Desktop\aslTeacher\aslteacher3000\backend'

asl_teacher = ASLModel()

def runSomeMl(vid_path):
    #time.sleep(100)
	print(vid_path)
	return asl_teacher.predict(vid_path)

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


# @app.route('/uploader', methods = ['GET', 'POST'])
# def upload_file():
#     if request.method == 'POST':
#       f = request.files['file']
#       vid_path = backend_path + "\\" +folder + "\\" + folder + "_" +  str(datetime.datetime.now()).replace(' ', '').replace(':','').replace('-','').replace('.','') + '.mp4'
#       f.save(vid_path)
#       blah = runSomeMl(vid_path)
#       print(blah)
#       return "blah"

	  
def split_video_to_frames(vid):
    video = cv2.VideoCapture(secure_filename(vid.filename))    
    framerate = video.get(5)
    vid_path = backend_path + "\\" +folder + "\\" + folder + "_" +  str(datetime.datetime.now()).replace(' ', '').replace(':','').replace('-','').replace('.','')
    os.makedirs(vid_path)
    while (video.isOpened()):
        frameId = video.get(1)
        success,image = video.read()         
        try:
            if(image.any() != None):
                image=cv2.resize(image,(128,128), interpolation = cv2.INTER_AREA)
        except:
            if(image != None):
                image=cv2.resize(image,(128,128), interpolation = cv2.INTER_AREA)
        if (success != True):
            break
  
        filename = vid_path +"\\image_" + str(int(frameId +1)) + ".jpg"
        cv2.imwrite(filename,image)
    video.release()
    return vid_path

import time
import tensorflow
import base64
from flask import Flask, request, redirect, url_for
from werkzeug.utils import secure_filename
import json
from datauri import DataURI
app = Flask(__name__)

	
@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
      ans = request.data[31:-2]
      data= base64.b64decode(ans)
      vid_path = backend_path + "\\" +folder + "\\" + folder + "_" +  str(datetime.datetime.now()).replace(' ', '').replace(':','').replace('-','').replace('.','') + '.mp4'
      file = open(vid_path, 'wb')
      file.write(data)
      file.close()
      blah = runSomeMl(vid_path)
      print(blah)
      return "blah"  
	  
@app.route('/')
def hello():
    return "ASL SERVER!"
	

if __name__ == '__main__':
    app.run()
