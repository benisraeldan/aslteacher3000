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


class ASLModel(object):
	
	def __init__(self):
		self.model = load_model('Model_1.weights.best.hdf5')
		self.reader = Videos(target_size=(128, 128), 
                to_gray=True, 
                max_frames=23, 
                extract_frames='first', 
                normalize_pixels=(0, 1))
			
	def predict(self, vid):
		self.reader.read_videos([vid])
		
		return self.model.predict(self.reader.read_videos([vid]),
			batch_size=None,
			verbose=0,
			steps=None,
			max_queue_size=10,
			workers=1,
			use_multiprocessing=False)
		
		