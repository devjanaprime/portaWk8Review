$( document ).ready( onReady );

function onReady(){
    $( '#sendMessageButton' ).on( 'click', sendMessage );
} // end ready

function sendMessage(){
    console.log( 'in sendMessage' );
    // get user input
    // package in an object
    let objectToSend = {
        username: $( '#usernameIn' ).val(),
        text: $( '#messageIn' ).val()
    }
    console.log( 'sending:', objectToSend );
    /// - check after building POST route - ///
    // send object to server
    $.ajax({
        type: 'POST',
        url: '/messages',
        data: objectToSend
    }).then( function( response ){
        console.log( 'back from POST:', response );
        // update DOM with new messages 
    }).catch( function( err ){
        console.log( err );
        alert( 'error posting message. see console for details' );
    }) // end ajax
} // sendMessage