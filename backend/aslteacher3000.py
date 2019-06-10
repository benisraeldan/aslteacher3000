# Imports
import os
from sklearn.datasets import load_files
from sklearn.model_selection import train_test_split

# Imports
from tensorflow.keras.models import load_model
from keras.models import Sequential
from keras.layers import Conv3D, MaxPooling3D, GlobalAveragePooling3D
from keras.layers.core import Dense,Dropout

from video import Videos
import tensorflow as tf
global graph,model
graph = tf.get_default_graph()

class ASLModel(object):
	
	def __init__(self, model, classes):
		self.classes = classes
		self.model = load_model(model)
		self.reader = Videos(target_size=(128, 128), 
                to_gray=True, 
                max_frames=23, 
                extract_frames='first', 
                normalize_pixels=(0, 1))
			
	def predict(self, vid):
		self.reader.read_videos([vid])
		with graph.as_default():
		
			a = self.model.predict(self.reader.read_videos([vid]),
				batch_size=None,
				verbose=0,
				steps=None,
				max_queue_size=10,
				workers=1,
				use_multiprocessing=False)
		return _find_class(a)
		
	def _find_class(self, probability):
		max_i = 0
		for i in range(0, len(self.classes)):
			if( probability[i] > probability[max_i]):
				max_i = i
			
		return self.classes[max_i];
		