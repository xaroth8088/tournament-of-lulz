""" The script to actually run the populator
"""

from imgur_populator import ImgurPopulator
import configparser
import os, sys

def main():
	config = configparser.ConfigParser()
	config.read("%s/imgur.conf" % (os.path.dirname(os.path.abspath(sys.argv[0])),))

	populator = ImgurPopulator(config)
	populator.populate()

if __name__ == "__main__":
	main()
