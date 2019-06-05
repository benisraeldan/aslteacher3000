import time
import datetime
import tensorflow
import os
import math
import cv2
from flask import Flask, request, redirect, url_for
from werkzeug.utils import secure_filename

from video import Videos
from aslteacher3000 import ASLModel

app = Flask(__name__)

folder = "video"
backend_path = r'E:\projects\aslteacher3000\backend'

asl_teacher = ASLModel()

def runSomeMl(vid_path):
    #time.sleep(100)
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


@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
      f = request.files['file']
      vid_path = backend_path + "\\" +folder + "\\" + folder + "_" +  str(datetime.datetime.now()).replace(' ', '').replace(':','').replace('-','').replace('.','')
      f.save(vid_path)
      runSomeMl(vid_path)
      return 'file uploaded successfully'

	  
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

