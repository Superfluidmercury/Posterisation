function Palette(domElement) {
	var palette = {
		domElement: null,
		colors: [],
		
		bindUIActions: function() {
			// All this is necessary to pass the this.colors to the canvas.
			this.domElement.addEventListener(
				'click',
				function(colors) {
					var fn = function() {
						Canvas.applyColorArray(colors);
					} 
					return fn;
				}(this.colors)
			);
		},

		updatePalette: function(newColor) {
			this.colors.push(newColor);
			this.showColors( this.colors );
		},

		showColors: function(colorArray) {

			while ( this.domElement.firstChild ) {
 			   this.domElement.removeChild( this.domElement.firstChild );
			}

			var numberOfColors = colorArray.length;
	
			for ( var i = 0; i < numberOfColors; i++ ) {
				var colorDiv = document.createElement( 'div' );
				colorDiv.classList.add( 'color' );
				this.domElement.appendChild( colorDiv );

				colorDiv.style.background = colorArray[ i ];
					
				// Computes the width that all individual colors need, so that they have equal width and fill the parent container precisely.
				parentTotalWidth = this.domElement.offsetWidth;
				parentBorderWidth = parseInt(
					getComputedStyle( this.domElement ).getPropertyValue( 'border-left-width' ),
					10
				);
				colorDiv.style.width = ( ( parentTotalWidth - parentBorderWidth * 2 ) / numberOfColors) + "px";
			}
		}
	};
	
	palette.domElement = domElement;
	palette.bindUIActions();
	
	// Pushes all colors on the array.
	var colorDivs = domElement.childNodes;
	for (var i = 0; i < colorDivs.length; i++) {
		if( colorDivs[i].localName == "div" ) {
			palette.colors.push(colorDivs[i].dataset.color);
		}
	}
	palette.showColors( palette.colors );
	
	return palette;  
}





var activePalette = new Palette( document.getElementById( 'activePalette' ) );
var palettes = [];
var paletteNodes = document.querySelectorAll( '.palette' );

for (var i = 0; i < paletteNodes.length; i++){
	palettes.push(new Palette(paletteNodes[i]));
}