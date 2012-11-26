$.fn.dockLinearGradient = function(string) {
    $(this).css("background", "-webkit-"+string);
    $(this).css("background", "-moz-"+string);
    $(this).css("background", "-ms-"+string);
    $(this).css("background", "-o-"+string);
    $(this).css("background", "-a-"+string);
}
$.fn.createDock = function(elements, options) {
    var side = "left";
    var size = 60;
    var tab_size = 15;
    var hover_size = 60;
    var background = "linear-gradient(100deg, #666 30%, #444 80%)";
    var shadow = "3px 13px 40px #555";
    var margin_val = 0;
    var border_radius;
    var cont;

    if(arguments.length > 1) {
        if(options['side']!==undefined)
            side = options['side'];
        if(options['size']!==undefined)
            size = options['size'];
        if(options['background']!==undefined)
            background = options['background'];
        if(options['tab_size']!==undefined)
            tab_size= options['tab_size'];
        if(options['hover_size']!==undefined)
            hover_size= options['hover_size'];
        else
            hover_size = size;
        if(options['shadow']!==undefined) {
            if(options['shadow'] === true)
                 shadow = '3px 13px 40px #555';
            else if(options['shadow'] === false)
                shadow = "0px 0px 0px 0";
            else
                shadow = options['shadow'];
        }
    }
    $(this).addClass('dock_wrapper');
    
    if(side=="right") {
        margin_val = hover_size-size;
    }
    
    $(this).css(side, 0);
    
    border_radius = "0 "+size+"px "+size+"px 0";
    if(side == "right")
        border_radius = size+"px 0 0 "+size+"px";
    cont = "<div class='hover_bar' style='width: "+hover_size+"px; float: "+side+";'><div class='dock' style='width: "+size+"px; margin-left: "+margin_val+"px; left: -"+(size-tab_size)+"px; border-radius: "+border_radius+";"+(side=="right"?" left: "+(size-tab_size)+"px":"")+"; box-shadow: "+shadow+"'>";
    for(i=0;i<elements;i++)
        cont += "<div class='dock-item' style='height: "+size+"px'><div class='content cont-"+i+"'></div></div>";
    cont += "</div></div>";
    $(this).html(cont);
    
    $(this).find('div.hover_bar div.cont-'+0).parent().css("border-top-"+(side=="left"?"right":"left")+"-radius", size+"px");
    $(this).find('div.hover_bar div.cont-'+(elements-1)).parent().css("border-bottom-"+(side=="left"?"right":"left")+"-radius", size+"px");
    
    $(this).data("side",side);
    $(this).data("size",size);
    $(this).data("tab_size",tab_size);
    $(this).data("background",background);
    $(this).data("elements", elements);
    $(this).data("shadow", shadow);
    
    for(i=0;i<elements;i++) {
        $(this).addIcon(i, {background: "#333"});
        
        $(this).find('div.cont-'+i).parent().click(function(){
            if($(this).data("url")!==undefined)
                window.location = $(this).data("url");
        });
    }
    
    //if necessary, apply background
    var dock = $(this).find('div.dock');
    if(background.indexOf("linear-gradient") == 0) {
        dock.dockLinearGradient(background);
    } else {
        dock.css("background", background);
    }
    
    //after a 1ms delay, apply transitions? or do that when adding icons... idk
};

$.fn.addLink = function(id, string) {
    var div = $(this).find('div.cont-'+id).parent();
    if(string === false) {
        div.removeData("url");
    } else
        div.data("url", string);
};

$.fn.addIcon = function(id, options) {
    var marginLeft = 20;
    var size = $(this).data("size");
    var side = $(this).data("side");
    var width = size-10;
    var height = width;
    var square = true;
    var url = "";
    var image = "";
    var background = "";
    var shadow = $(this).data("shadow");
    if(typeof(options) == 'string') {
        background = "url("+options+") no-repeat";
    } else {
        if(options['width']!==undefined && options['height']!==undefined)
            square = false;
        if((options['square']!==undefined))
            square = options['square'];
       
        if(options['image']!==undefined) {
            image = options['image'];
            background = "url("+image+") no-repeat";
            shadow = "0px 0px 0px 0";
        } else {
            if(options['background']!==undefined)
                background = options['background'];
        }
        if(options['shadow']!==undefined) {
            if(options['shadow'] === true)
                shadow = "3px 3px 20px #555";
            else if(options['shadow'] === false)
                shadow = "0px 0px 0px 0";
            else
                shadow = options['shadow'];
        }
        if(options['width']!==undefined) {
            width = options['width'];
            if(square)
                height = width;
        }
        if(options['height']!==undefined) {
            height = options['height'];
            if(square)
                width = height;
        }
        if(width > size)
            marginLeft = 5;
        else if(width < size-10)
            marginLeft = 20 + (size-10-width);
    }
    var leftVal = (size-5-width-marginLeft);
    if(side=="right") {
        leftVal = 15;
        marginLeft = -10;
        if(width > size) {
            leftVal = width-size+10;
            marginLeft = 5-leftVal;
        }
    }
    $(this).find('div.cont-'+id).css({
        "background": background,
        "background-size": width+"px "+height+"px",
        "box-shadow": shadow,
        "width": width+"px",
        "height": height+"px",
        "margin-top": -(height/2)+"px",
        "left": leftVal+"px",
        //instead of focusin on -10, focus on 20
        //"left": (size-5-width+marginLeft)+"px",
        "margin-left": marginLeft+"px"
    }).parent().css({
        "height": (height+10)+"px"
    });
    
    //if necessary, set dock's top or bottom right radius
    if(id == 0) {
        $(this).find('div.hover_bar').find('div.dock').css("border-top-"+(side=="left"?"right":"left")+"-radius", Math.min(size, height+10)+"px");
        $(this).find('div.hover_bar div.cont-'+id).parent().css("border-top-"+(side=="left"?"right":"left")+"-radius", Math.min(size, height+10)+"px");
    }
    if(id == $(this).data("elements")-1) {
        $(this).find('div.hover_bar').find('div.dock').css("border-bottom-"+(side=="left"?"right":"left")+"-radius", Math.min(size, height+10)+"px");
        $(this).find('div.hover_bar div.cont-'+id).parent().css("border-bottom-"+(side=="left"?"right":"left")+"-radius", Math.min(size, height+10)+"px");
    }
    if(options['url']!==undefined)
        $(this).addLink(id, options['url']);
};

$(document).ready(function(){
    dock = $('#example');
    dock.createDock(4, {
        size: 50,
        hover_size: 50,
        tab_size: 20,
        side: "left"
    });
    
    dock.addIcon(0, {image: "http://jcolicchio.latestdot.net/jsfiddle_logo.png", url: "http://jsfiddle.net/user/jcolicchio/fiddles/"});
    dock.addIcon(1, {height: 80, image: "http://jcolicchio.latestdot.net/twitter_logo.png", url: "https://twitter.com/joecolicchio"});
    dock.addIcon(2, {height: 58, width: 208, image: "http://stackoverflow.com/users/flair/1532911.png?theme=clean", url: "http://stackoverflow.com/users/1532911/jcolicchio", shadow: true});
    dock.addIcon(3, {image: "http://jcolicchio.latestdot.net/favicon.ico", url: "http://jcolicchio.latestdot.net", shadow: "6px 6px 30px #49f"});
});