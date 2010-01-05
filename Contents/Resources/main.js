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
    var dts = document.getElementsByTagName("dt");
    var elements = [];
    for(var i=0; i<=dts.length; i++) {
    	elements.push(dts[i].getElementsByClassName("nick"));
    }
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