""" The script to actually run the populator
"""

import configparser
import os
import sys

from configparser_env import EnvInterpolation
from imgur_populator import ImgurPopulator


def main():
    config = configparser.ConfigParser(interpolation=EnvInterpolation())
    config.read("%s/imgur.conf" % (os.path.dirname(os.path.abspath(sys.argv[0])),))

    populator = ImgurPopulator(config)
    populator.populate()


if __name__ == "__main__":
    main()
