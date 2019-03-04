# ckeditor5-katex-math

Katex math plugin for ckeditor 5. Example folder contains demo showing the plugin in action (see next section), content is not needed for plugin to work.

Note: WIP project, so plugin is mostly useless for the time being.

# Setting up test environment

To just start up the provided example:

docker build -t ck5-katex-math:latest .
docker run -p 8080:8080 ck5-katex-math:latest

To access container:

docker exec -it ck5-katex-math:latest /bin/bash