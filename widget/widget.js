$(document).ready(function(){
    $.widget("progress.progressbar", {
        options: {
            value: 0
        },

        _create: function() {
            this.options.value = this._constrain(this.options.value);
            this.element.addClass( "progressbar" );
            this.refresh();
        },

        _setOption: function( key, value ) {
            if ( key === "value" ) {
                value = this._constrain( value );
            }
            this._super( key, value );
        },

        _setOptions: function( options ) {
            this._super( options );
            this.refresh();
        },

        refresh: function() {
            var progress = this.options.value + "%";
            this.element.text( progress );
            if ( this.options.value == 100 ) {
                this._trigger( "complete", null, { value: 100 } );
            }
        },

        _constrain: function( value ) {
            if ( value > 100 ) {
                value = 100;
            }
            if ( value < 0 ) {
                value = 0;
            }
            return value;
        },

        _destroy: function() {
            this.element
                .removeClass( "progressbar" )
                .text( "" );
        }
    }); 

    var bar = $( "<progress />" )
    .appendTo( "body" )
    .progressbar({
        complete: function( event, data ) {
            alert( "Callbacks are great!" );
        }
    })
    .bind( "progressbarcomplete", function( event, data ) {
        alert( "Events bubble and support many handlers for extreme flexibility." );
        alert( "The progress bar value is " + data.value );
    });


    bar.progressbar( "option", "value", 100 );
});