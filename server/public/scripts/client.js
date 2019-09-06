$( document ).ready( onReady );

function onReady(){
    $( '#sendMessageButton' ).on( 'click', sendMessage );
} // end ready

function getMessages(){
    console.log( 'in getMessages' );
    $.ajax({
        type: 'GET',
        url: '/messages'
    }).then( function( response ){
        console.log( 'back from GET with:', response );
        // empty ul
        let el = $( '#messagesOut' );
        el.empty();
        // loop through response
        for( let i =0; i< response.length; i++ ){
            // append each to ul
            el.append( `<li><strong>${ response[i].username }</strong>: ${ response[i].text }</li>` );
        } // end for
    }).catch( function( err ){
        console.log( err );
        alert( 'error getting messages. see console for details' );
    })
} // end getMessages
 
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
        getMessages(); 
        // empty message input
        $( '#messageIn' ).val( '' );
    }).catch( function( err ){
        console.log( err );
        alert( 'error posting message. see console for details' );
    }) // end ajax
} // sendMessage