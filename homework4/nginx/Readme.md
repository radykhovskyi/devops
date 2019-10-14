## Instructions

 - run container with nginx `docker run -p 8080:80 -d radykhovskyi/nginx-crop:1.0`
 - test image cropping using browser `http://localhost:8080/img/100x50/panda.jpg` or `http://localhost:8080/img/200x200/tiger.png` (there is only two images named `panda.jpg` & `tiger.png` uploaded; also support `gif` format)
