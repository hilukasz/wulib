
// @include lukaszLibrary.jsx;
/*
var myString = "1";
var myRegxpHasAlpha = /[A-Za-z]/;
var myRegxpNumeric = /[0-9]/;

 if(myRegxpHasAlpha.test(myString)){
    $.write("has alpha!"+"\n");
    
    }  if(myRegxpHasNumeric.test(myString)){    
        $.write("non-alpha!"+"\n"); 
    }
*/
/*
    if (!app.activeDocument.symbolItems[0].symbol.visible) {
        alert(app.activeDocument.symbolItems[0].symbol.name);
        alert("not visible");
        //var mySymbol = app.activeDocument.symbolItems[0].symbolItem;
        //mySymbol.visible = true;
        } else {   
            alert("visible"); 
            alert(app.activeDocument.symbolItems[0]); 
            app.activeDocument.symbolItems[0].symbol.visible = false;    
        };
*/
 /*
var grps = doc.layers.getByName( 'div structure' ).pathItems;
for ( var i = 22; i < grps.length; i++ ) {
          var currentItem = grps[i];
          var itemName = currentItem.name;
          doc.selection = null;
          grps[i].selected = true;
          app.redraw();
          //alert( 'group '+ ( i.name ) );
};
 */





/*
function arrayTest() {
    var array = ["1","2","3"];
    var newArray = ["4", "5"];
    array.push(newArray);
    return array;
    }


var newArray = arrayTest();
print(newArray);
*/

/*
var idoc = app.activeDocument;
mySymbolHW = doc.symbolItems[0];
mySymbolHW.selected = true;

symbolHeight = idoc.symbolItems[0].height; 
symbolHeight = Math.round(symbolHeight);
symbolWidth = idoc.symbolItems[0].width;
symbolWidth = Math.round(symbolWidth);


function mySymbol(i) {
    var myRegxpNumeric = /[0-9]/;
    if (myRegxpNumeric.test(i)) {
        symbolWidth = idoc.symbolItems[i].width;
        this.width = Math.round(symbolWidth);
        symbolHeight = idoc.symbolItems[i].height; 
        this.height = Math.round(symbolHeight);
    }
    else { print("only accepts index"); }
}

var ok = new mySymbol("test");
print(ok.height());
*/

//var symbolHeightWidth = new mySymbol();
//print(firstSymbol.getWidthHeight());


//var newExport = new CSVFile("sizes");

//find layer parent then runs script on all 
//findLayerAndExecute("parent", mySymbol);
//newExport.append(firstSymbol.controlBounds);

var pageItems = doc.layers.getByName("parent").pageItems,
    CSV = new CSVFile("Sass vars2");

var canvasWidthHeight = ["CanvasSide", doc.width, doc.height];
CSV.append(canvasWidthHeight);

//for each "div" inside of the parent
for ( var i = 0; i < pageItems.length; i++ ) {
	var currentContainer = pageItems[i];
    var passedSymbolsWithInfo = [];
    
    // loop through all the symbols to check if it is in the div    
    for(var j = 0; j < doc.symbolItems.length; j++){
        var currentSymbol = new MySymbol(j);
        if(currentSymbol.isIn(currentContainer)) {
            var currentContainerTopLeft = [Math.abs(currentContainer.top), currentContainer.left];
            var symbolRelativeToParent = currentSymbol.getPosition(currentContainerTopLeft[0], currentContainerTopLeft[1]);
            //print("relative: "+currentSymbol.name+" "+currentSymbol.getPosition(currentContainerTopLeft[0], currentContainerTopLeft[1]));
            var symbolInfo = [currentSymbol.getWidthHeight(), symbolRelativeToParent, currentSymbol.name, currentContainer.name];
            passedSymbolsWithInfo.push(symbolInfo);
        }
    }
    print(" ======== end SYMBOL ======== ");
    CSV.append(passedSymbolsWithInfo);
}
print("\n ====== end DEV ======== ");