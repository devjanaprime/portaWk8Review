$( document ).ready( onReady );

const verbose = false;

function deleteAll(){
    if( verbose ) console.log( 'in deleteAll' );
    if( confirm( 'Are you sure you want to delete all messages on the server?' ) ){  
        $.ajax({
            type: 'DELETE',
            url: '/messages'
        }).then( function( response ){
            if( verbose ) console.log( 'back from DELETE:', response );
            getMessages();
        }).catch( function( err ){
            alert( 'error deleting messages. I hope u like what u got' );
            if( verbose ) console.log( err );
        })
    }
} // end deleteAll

function onReady(){
    $( '#sendMessageButton' ).on( 'click', sendMessage );
    $( '#refreshButton' ).on( 'click', getMessages );
    $( '#deleteAllButton' ).on( 'click', deleteAll );
    getMessages();
} // end ready

function getMessages(){
    if( verbose ) console.log( 'in getMessages' );
    $.ajax({
        type: 'GET',
        url: '/messages'
    }).then( function( response ){
        if( verbose ) console.log( 'back from GET with:', response );
        // empty ul
        let el = $( '#messagesOut' );
        el.empty();
        // loop through response
        for( let i =0; i< response.length; i++ ){
            // append each to ul
            el.append( `<li><strong>${ response[i].username }</strong>: ${ response[i].text }</li>` );
        } // end for
    }).catch( function( err ){
        if( verbose ) console.log( err );
        alert( 'error getting messages. see console for details' );
    })
} // end getMessages
 
function sendMessage(){
    if( verbose ) console.log( 'in sendMessage' );

    if( $( '#usernameIn' ).val() != '' &&  $( '#messageIn' ).val() != '' ){    
        // get user input
        // package in an object
        let objectToSend = {
            username: $( '#usernameIn' ).val(),
            text: $( '#messageIn' ).val()
        }
        if( verbose ) console.log( 'sending:', objectToSend );
        /// - check after building POST route - ///
        // send object to server
        $.ajax({
            type: 'POST',
            url: '/messages',
            data: objectToSend
        }).then( function( response ){
            if( verbose ) console.log( 'back from POST:', response );
            // update DOM with new messages
            getMessages(); 
            // empty message input
            $( '#messageIn' ).val( '' );
        }).catch( function( err ){
            if( verbose ) console.log( err );
            alert( 'error posting message. see console for details' );
        }) // end ajax
    } //end has text
    else{
        alert( 'please fill in all fields' );
    }
} // sendMessage