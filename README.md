javadock
========

A CSS3 Dock plugin for jQuery, easily set up and customize this interactive pop-out dock to provide quick, easily accessible, and visually appealing links to your website.

Usage: In the header, include the javascript and css files. Then, simply create a div with a unique ID anywhere on your webpage. In javascript, using jQuery:

-- Creating a Dock --
$('#my_dock_div').createDock(numElements, ...[options]);

You may specify any number of options, including:
size - the width in px of the dock, default 60
side - "left" or "right", where the dock appears, default "left"
tab_size - how wide the dock appears when hidden, default 15
hover_size - how wide the area is which activates and shows the dock, default size equal to size given
shadow - true, false, or "Xpx Ypx Wpx #color", whether to show shadow beneath the dock, or specify a custom shadow style
  --note, the shadow value here will determine the default value for non-image icons added to this dock
  --default 3px 13px 40px #555
background - a style for the background. if supplied with a linear-gradient, javadock will attempt to add all vendor prefixes
  --default linear-gradient(100deg, #666 30%, #444 80%)

for example:
$('#my_dock_div').createDock(3, {
  size: 60,
  tab_size: 0,
  hover_size: 80,
  shadow: false,
  side: "right"
});

will create a dock with 3 elements, width 60, that is completely hidden on the right side until the mouse comes within 80 px of the dock

-- Adding Icons --
You can use the following function to add icons to your dock:
$('#my_dock_div').addIcon(idNum, ...[options]);

You may specify 

width - the width of the icon, default size is the dock size
height - the height of the icon, default size is the dock size
square - whether or not the icon is square. if only one dimension is set, the other dimension will be equal to it. default true
image - a url of the background image
background - a background style, only used if no image supplied, default #333
shadow - true, false, or "Xpx Ypx Wpx #color", the shadow style of the icon.
  --default is "3px 3px 20px #555" if a dock shadow was used and "0px 0px 0px 0" if not
url - a link to navigate to when the user clicks on this icon


-- Manually Adding Links --
You may manually add or change where each icon takes the user with the following function:
$('#my_dock_div').addLink(idNum, url);

A new url will overwrite the old url. Specifying false as the url will remove the current url and do nothing on user click