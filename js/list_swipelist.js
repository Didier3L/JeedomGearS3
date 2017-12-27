// list_swipelist.js

(function(){

    var page = document.getElementById( "lightsswipe" ),
    	listElement = page.getElementsByClassName( "ui-swipelist-list" )[0],
		swipeList;

	/* pagebeforeshow event handler
	 * Do preparatory works and adds event listeners */
    
	page.addEventListener( "pagebeforeshow", function() {
		// make SwipeList object
		swipeList = tau.widget.SwipeList( listElement, {
			swipeTarget: "li",
			swipeElement: ".ui-swipelist"
		});
	});

	/* pagebeforehide event handler
	 * Destroys and removes event listeners */
	
	page.addEventListener( "pagebeforehide", function() {
		// release object
		swipeList.destroy();
	});
    
    /* ------------------ guirlande ---------------------------------------- */
    
    var guirlandeSwipe = document.getElementById("guirlande-swipe");
    
    guirlandeSwipe.addEventListener("swipelist.left", function(evt){
    	requestcommand(848);
    });

    guirlandeSwipe.addEventListener("swipelist.right", function(evt){
    	requestcommand(849);
    });
    
    /* ------------------ meuble ---------------------------------------- */
    
    var meubleSwipe = document.getElementById("meuble-swipe");
    
    meubleSwipe.addEventListener("swipelist.left", function(evt){
    	requestcommand(527);
    });

    meubleSwipe.addEventListener("swipelist.right", function(evt){
    	requestcommand(528);
    });
	
    /* ------------------ lustre ---------------------------------------- */
    
    var lustreSwipe = document.getElementById("lustre-swipe");
    
    lustreSwipe.addEventListener("swipelist.left", function(evt){
    	requestcommand(858);
    });

    lustreSwipe.addEventListener("swipelist.right", function(evt){
    	requestcommand(859);
    });
    
	/* ------------------ Bureau ---------------------------------------- */
	
    var bureauSwipe = document.getElementById("bureau-swipe");
    
    bureauSwipe.addEventListener("swipelist.left", function(evt){
       /* alert("salon On");  // Confirmation de la commande */
        requestcommand(2446);
        /* You can connect your app with a native app (such as phone call or message) using the Device API */
    });

    bureauSwipe.addEventListener("swipelist.right", function(evt){
        /* alert("salon Off");  // Confirmation de la commande */
        requestcommand(2447);
        /* You can connect your app with a native app (such as phone call or message) using the Device API */
    });
    
}());
