grunt-docker-image
==================

Builds a simple docker image with pinned versions of Grunt, the Grunt packages
that Plume uses, and our Gruntfile.js for Plume.

This image pins Plume's (and by extension the Mesa repo's) entire Grunt
dependency.

To update this image on dockerhub:

1. register an account at https://hub.docker.com/ and get someone who already
   has one to add you to the "igneoussystems" organization.
2. register a "Trusted Build" on the docker hub

The build is executed by docker on their machines whenever you push to the
repo.
