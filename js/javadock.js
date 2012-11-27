$.fn.vendor = function(name, string) {
    $(this).css(name, string);
    $(this).css(name, "-webkit-" + string);
    $(this).css(name, "-moz-" + string);
    $(this).css(name, "-ms-" + string);
    $(this).css(name, "-o-" + string);
    $(this).css(name, "-a-" + string);
};
$.fn.createDock = function(elements, options) {
    var side = "left";
    var size = 60;
    var tab_size = 15;
    var hover_size = 60;
    var border_size = 60;
    var border_bottom_size = 60;
    var border_top_size = 60;
    var flip = "";
    var background = "linear-gradient(100deg, #666 30%, #444 80%)";
    var shadow = "3px 13px 40px #555";
    var margin_val = 0;
    var border_radius;
    var cont;

    if (arguments.length > 1) {
        if (options['side'] !== undefined) side = options['side'];
        if (options['size'] !== undefined) size = parseInt(options['size'], 10);
        if (options['background'] !== undefined) background = options['background'];
        if (options['tab_size'] !== undefined) tab_size = parseInt(options['tab_size'], 10);
        if (options['hover_size'] !== undefined) hover_size = parseInt(options['hover_size'], 10);
        else hover_size = size;
        if (options['border_size'] !== undefined) border_top_size = border_bottom_size = border_size = parseInt(options['border_size'], 10);
        else border_top_size = border_bottom_size = border_size = size;
        if (options['border_top_size'] !== undefined) border_top_size = parseInt(options['border_top_size'], 10);
        if (options['border_bottom_size'] !== undefined) border_bottom_size = parseInt(options['border_bottom_size'], 10);
        if (options['shadow'] !== undefined) {
            if (options['shadow'] === true) shadow = '3px 13px 40px #555';
            else if (options['shadow'] === false) shadow = "0px 0px 0px 0";
            else shadow = options['shadow'];
        }
        if (options['flip'] !== undefined) {
            if (options['flip']==true || options['flip'] == "true")
                flip = "x";
            else
                flip = options['flip'];
        }
    }
    $(this).addClass('dock_wrapper');

    if (side == "right") {
        margin_val = hover_size - size;
    }

    $(this).css(side, 0);

    border_radius = "0 " + size + "px " + size + "px 0";
    if (side == "right") border_radius = size + "px 0 0 " + size + "px";
    cont = "<div class='hover_bar' style='width: " + hover_size + "px; float: " + side + ";'><div class='dock' style='width: " + size + "px; margin-left: " + margin_val + "px; left: -" + (size - tab_size) + "px; border-radius: " + border_radius + ";" + (side == "right" ? " left: " + (size - tab_size) + "px" : "") + "; box-shadow: " + shadow + "'>";
    for (i = 0; i < elements; i++)
    cont += "<div class='dock-item' style='height: " + size + "px'><div class='content cont-" + i + "'></div></div>";
    cont += "</div></div>";
    $(this).html(cont);

    $(this).find('div.hover_bar div.cont-' + 0).parent().css("border-top-" + (side == "left" ? "right" : "left") + "-radius", size + "px");
    $(this).find('div.hover_bar div.cont-' + (elements - 1)).parent().css("border-bottom-" + (side == "left" ? "right" : "left") + "-radius", size + "px");

    $(this).data("side", side);
    $(this).data("size", size);
    $(this).data("tab_size", tab_size);
    $(this).data("hover_size", hover_size);
    $(this).data("border_size", border_size);
    $(this).data("flip", flip);
    $(this).data("border_top_size", border_top_size);
    $(this).data("border_bottom_size", border_bottom_size);
    $(this).data("background", background);
    $(this).data("elements", elements);
    $(this).data("shadow", shadow);

    for (i = 0; i < elements; i++) {
        $(this).addIcon(i, {
            background: "#333"
        });

        $(this).find('div.cont-' + i).parent().click(function() {
            if ($(this).data("url") !== undefined) window.location = $(this).data("url");
        });
    }

    //if necessary, apply background
    var dock = $(this).find('div.dock');
    if (background.indexOf("linear-gradient") == 0) {
        dock.vendor("background", background);
    } else {
        dock.css("background", background);
    }

    //after a 1ms delay, apply transitions? or do that when adding icons... idk
};

$.fn.addLink = function(id, string) {
    var div = $(this).find('div.cont-' + id).parent();
    if (string === false) {
        div.removeData("url");
    } else div.data("url", string);
};

$.fn.addIcon = function(id, options) {
    var marginLeft = 20;
    var size = $(this).data("size");
    var side = $(this).data("side");
    var border_size = $(this).data("border_size");
    var border_top_size = $(this).data("border_top_size");
    var border_bottom_size = $(this).data("border_bottom_size");
    var width = size - 10;
    var height = width;
    var square = true;
    var url = "";
    var image = "";
    var flip = $(this).data("flip");
    var background = "";
    var shadow = $(this).data("shadow");
    if (typeof(options) == 'string') {
        background = "url(" + options + ") no-repeat";
    } else {
        if (options['size'] !== undefined) {
            square = false;
            width = parseInt(options['size']);
            height = width;
        }
        if (options['width'] !== undefined && options['height'] !== undefined) square = false;
        if ((options['square'] !== undefined)) square = options['square'];

        if (options['image'] !== undefined) {
            image = options['image'];
            background = "url(" + image + ") no-repeat";
            shadow = "0px 0px 0px 0";
        } else {
            if (options['background'] !== undefined) background = options['background'];
        }
        if (options['shadow'] !== undefined) {
            if (options['shadow'] === true) shadow = "3px 3px 20px #555";
            else if (options['shadow'] === false) shadow = "0px 0px 0px 0";
            else shadow = options['shadow'];
        }
        if (options['width'] !== undefined) {
            width = parseInt(options['width'], 10);
            if (square) height = width;
        }
        if (options['height'] !== undefined) {
            height = parseInt(options['height'], 10);
            if (square) width = height;
        }
        if (width > size) marginLeft = 5;
        else if (width < size - 10) marginLeft = 20 + (size - 10 - width);
        if (options['flip'] !== undefined)
            flip = options['flip'];
    }
    var leftVal = (size - 5 - width - marginLeft);
    if (side == "right") {
        leftVal = 15;
        marginLeft = -10;
        if (width > size) {
            leftVal = width - size + 10;
            marginLeft = 5 - leftVal;
        }
    }
    $(this).find('div.cont-' + id).css({
        "background": background,
        "background-size": width + "px " + height + "px",
        "box-shadow": shadow,
        "width": width + "px",
        "height": height + "px",
        "margin-top": -(height / 2) + "px",
        "left": leftVal + "px",
        //instead of focusin on -10, focus on 20
        //"left": (size-5-width+marginLeft)+"px",
        "margin-left": marginLeft + "px"
    }).parent().css({
        "height": (height + 10) + "px"
    });
    var transform;
    if(flip == "x" || flip == "both" || flip == "true" || flip == true)
        transform = "scaleX(-1)";
    else
        transform = "scaleX(1)";
    if(flip == "y" || flip == "both")
        transform += "scaleY(-1)";
    $(this).find('div.cont-'+id).vendor("transform", transform);

    //if necessary, set dock's top or bottom right radius
    if (id == 0) {
        $(this).find('div.hover_bar').find('div.dock').css("border-top-" + (side == "left" ? "right" : "left") + "-radius", Math.min(border_top_size, height + 10) + "px");
        $(this).find('div.hover_bar div.cont-' + id).parent().css("border-top-" + (side == "left" ? "right" : "left") + "-radius", Math.min(border_top_size, height + 10) + "px");
    }
    if (id == $(this).data("elements") - 1) {
        $(this).find('div.hover_bar').find('div.dock').css("border-bottom-" + (side == "left" ? "right" : "left") + "-radius", Math.min(border_bottom_size, height + 10) + "px");
        $(this).find('div.hover_bar div.cont-' + id).parent().css("border-bottom-" + (side == "left" ? "right" : "left") + "-radius", Math.min(border_bottom_size, height + 10) + "px");
    }
    if (options['url'] !== undefined) $(this).addLink(id, options['url']);
};