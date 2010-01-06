var alignBottom = true;

function getElementsByClassName( className, tagName, rootNode ) {
    rootNode = rootNode || document;
    tagName = tagName || '*';

    var result = [];
    var elements = rootNode.getElementsByTagName( tagName );
    for( var x = 0; x < elements.length; x++ ) {
        if ( !elements[x].className ) { continue; }
        var classes = elements[x].className.split( ' ' );
        for ( var y = 0; y < classes.length; y++ ) {
            if ( classes[y] != className ) { continue; }
            result.push( elements[x] );
			break;
        }
    }
    return result;
}

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

function onNodeInsert() {
	markSameTimestamps();
	markSameNicks();
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