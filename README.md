# Sprite Mapper

Map a spritesheet using HTML5.

## Getting Started

Download the repository and open the `index.html` file in your browser.

### Prerequisites

This project has only been tested with Firefox and Chrome. It should work with modern browsers, but I haven't tested them yet.

## Controls

The controls are based on mouse events on the canvas and widgets on the right.

### Mouse Controls

* Left mouseclick - Hold down to frame an image on the spritesheet. A shaded box should appear from the initial click to the release of the mouseclick.

  * The left mouseclick can also select/deselect a frame to edit in the widget.

* Right mouseclick - Click once to shift the image up/down/left/right. Use the left mouseclick to let go of the image.

* Mousewheel - Zoom in and out of the image with the mousewheel. Currently the zoom function is limited to 10x zoom.

### Widget Controls

* Top-right widget displays the (x,y,w,h) dimensions of a highlighted frame.

  * Update - changes the dimensions of the selected frame with values in the input boxes.

  * Delete - removes the selected frame.

  * Clear - removes all the frames.

* Bottom-right widget imports and exports files used to map a spritesheet.

  * Top file input - opens a local spritesheet on your computer to map.

  * Text input - names the CSV file to download the frames coordinated on the spritesheet.

  * Download - saves all created frames to a CSV file to download.

  * Bottom file input - opens a local CSV file to create frames on the spritesheet.

## Notes

This is just a fun little project to practice Javascript. This is by no means close to complete, but I think it's usable in its current iteration.

Enjoy!
