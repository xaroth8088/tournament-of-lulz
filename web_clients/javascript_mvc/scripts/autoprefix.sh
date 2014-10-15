#!/bin/bash
autoprefixer `find css/ -name '*.css'` -b none --safe
autoprefixer `find css/ -name '*.css'` --safe
autoprefixer `find js/client/lib/ -name '*.css'` -b none --safe
autoprefixer `find js/client/lib/ -name '*.css'` --safe
