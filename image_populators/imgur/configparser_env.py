# Adapted from code found at https://gist.github.com/malexer/ee2f93b1973120925e8beb3f36b184b8
import configparser
import os


class EnvInterpolation(configparser.BasicInterpolation):
    """Interpolation which expands environment variables in values."""

    def before_get(self, parser, section, option, value, defaults):
        return os.path.expandvars(value)
