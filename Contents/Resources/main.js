var alignBottom = true;

function markSameTimestamps() {
    var elements = document.getElementsByClassName( 'time'  );
    var parentTimestamp = elements[ elements.length - 2 ];
    var currentTimestamp = elements[ elements.length - 1 ];

    if ( parentTimestamp.innerHTML == currentTimestamp.innerHTML ) {
        currentTimestamp.className += ' duplicateTimestamp';
    }
}

function scrollToBottom( checkAlignBotton ) {
	if ( typeof( checkAlignBotton ) == 'undefined' ) checkAlignBotton = true;
	if ( checkAlignBotton && !alignBottom ) { return false; }

    var elements = document.getElementsByClassName( 'message'  );
	elements[ elements.length - 1 ].scrollIntoView( true );
}

function markSameNicks() {
    var elements = document.querySelectorAll("dt.nick");
    var parentNick = elements[ elements.length - 2 ];
    var currentNick = elements[ elements.length - 1 ];

    if ( parentNick.firstChild.innerHTML == currentNick.firstChild.innerHTML ) {
        currentNick.className += ' duplicateNick';
    }
}

function makeInlineImages() {
    var elements = document.querySelectorAll("dd.message a");
    var element, file_ext, img;
    
    for(var i=0; i<elements.length; i++) {
        element = elements[i];
        if(!element.has_image) {
            file_ext = element.href.substr(element.href.length - 4 , 4);
            if(file_ext == ".jpg" || file_ext == "jpeg" || file_ext == ".png" || file_ext == ".gif") {
                element.has_image = true;
                img = document.createElement("img");
                img.src = elements[i].href;
                img.className = "min-version";
                img.onclick = function () {
                    img.className = (img.className == "min-version") ? "origin-version" : "min-version"
                }
                if(element.nextSibling == null) element.parentNode.appendChild(img);
                else element.parentNode.insertBefore(img, element.nextSibling);
                img.parentNode.insertBefore(document.createTextNode(" "), img);
            }            
        }
    }
}

function onNodeInsert() {
	markSameTimestamps();
	markSameNicks();
	makeInlineImages();
	scrollToBottom();
}

window.onload = function() {
	document.getElementById('contents').addEventListener( 'DOMNodeInserted', onNodeInsert, false );
}

window.onscroll = function() {
	var windowHeight = window.innerHeight;
	var scrollOffset = window.pageYOffset;
	var contentHeight = document.getElementsByTagName('body')[0].offsetHeight;
	alignBottom = ( ( windowHeight + scrollOffset - 5 ) >= contentHeight );
}