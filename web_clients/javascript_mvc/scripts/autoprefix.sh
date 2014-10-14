#!/bin/bash
autoprefixer `find . -name '*.css'` -b none --safe
autoprefixer `find . -name '*.css'` --safe
