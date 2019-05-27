[![Build Status](https://travis-ci.org/McFizh/ckeditor5-katex-math.svg?branch=master)](https://travis-ci.org/McFizh/ckeditor5-katex-math)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ckeditor5-katex-math&metric=alert_status)](https://sonarcloud.io/dashboard?id=ckeditor5-katex-math)

# ckeditor5-katex-math

Katex math plugin for ckeditor 5. Example folder contains demo showing the plugin in action (see next section), content is not needed for plugin to work. But remember to include katex css styles and fonts to your application, plugin doesn't do that for you.

Note: WIP project, so plugin is mostly useless for the time being.

![Edit UI](docs/images/screenshot_1.png)

# To try out the plugin locally:

Run the following commands:

npm ci\
cd example\
npm ci\
npm run start:dev

Then open browser to address: http://localhost:8080  (or 8081, if 8080 is reserved)

# Or setting up docker test/dev environment:

To just start up the provided example:

docker build -t ck5-katex-math:latest .\
docker run -p 8080:8080 ck5-katex-math:latest

To access image:

docker run -it ck5-katex-math:latest /bin/bash
