This "assets" directory exists to hold dependencies that do not play nice or are not available with the npm package manager.

We would prefer to not have to clutter our repository with libraries (dependencies), but OpenLayers 2 does not play nice.
This is a known issue, and OpenLayers 3 is moving to a Bower-friendly & Grunt-based build to play nice with the rest of the world.
We are not the first people to be annoyed by this - lots of discussion online.
No clean solution, the consensus seems to be just store the proper build of OpenLayers in our repository and move on with life.

OpenLayers 2 issues include:

1. Git repository is not versioned correctly
2. Manual (python-based) build process
3. If you do not follow #2 to manually build the single-file version, OpenLayers dynamically loads a ton of files (which does not play nice with our app / RequireJS)

See http://stackoverflow.com/questions/15057871/how-to-install-libraries-such-as-openlayers-with-bower

The Leaflet mouseposition plugin does not exist in the npm repository and has also been added to the assets directory
