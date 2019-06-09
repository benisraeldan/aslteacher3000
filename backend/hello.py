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
tests = {}
test["actions"] = ASLModel("actions.h5", ["cut", "fly", "sleep", "stand"])
test["clothes"] = ASLModel("clothes.h5", ["boots","bra","bracelet","shirt"])
test["foods"] = ASLModel("foods.h5", ["bread", "cereal", "french-fries", "pancake"])
test["animals"] = ASLModel("animals.h5", ["alligator", "bull", "mouse", "tiger"])

def runSomeMl(vid_path, type):
    #time.sleep(100)
	print(vid_path)
	return test["annimals"].predict(vid_path)
	
def saveIncomingFile(request):
	ans = request.data[31:-2]
	data= base64.b64decode(ans)
	vid_path = backend_path + "\\" +folder + "\\" + folder + "_" +  str(datetime.datetime.now()).replace(' ', '').replace(':','').replace('-','').replace('.','') + '.mp4'
	file = open(vid_path, 'wb')
	file.write(data)
	file.close()
	return vid_path

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


# legacy code
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
	  
@app.route('/testAnimales', methods = ['GET', 'POST'])
def test_animals():
	vid_path = saveIncomingFile(request)
	return runSomeMl(vid_path, "animals")
	
@app.route('/testActions', methods = ['GET', 'POST'])
def test_animals():
	vid_path = saveIncomingFile(request)
	return runSomeMl(vid_path, "actions")
	
@app.route('/testCloth', methods = ['GET', 'POST'])
def test_animals():
	vid_path = saveIncomingFile(request)
	return runSomeMl(vid_path, "clothes")

@app.route('/testFood', methods = ['GET', 'POST'])
def test_animals():
	vid_path = saveIncomingFile(request)
	return runSomeMl(vid_path, "foods")
	
@app.route('/')
def hello():
    return "ASL SERVER!"
	

if __name__ == '__main__':
    app.run()
