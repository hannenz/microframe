
OBJECTS = sass/*

all: ${OBJECTS}
	sass -l --line-comments sass/microframe.scss css/microframe.css
	sass -t compressed sass/microframe.scss css/microframe.min.css

css/microframe.css: ${OBJECTS}
	sass -l --line-comments sass/microframe.scss $@

css/microframe.min.css: ${OBJECTS}
	sass -t compressed sass/microframe.scss $@

