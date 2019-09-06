// requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );

// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

// globals
const port = 5000;
let messages = [];

// spin up server
app.listen( port, ()=>{
    console.log( 'server up on:', port );
}) // end server up

app.delete( '/messages', ( req, res )=>{
    console.log( 'in /messages DELETE' );
    messages = [];
    res.sendStatus( 200 );
}) // end /messages DELETE

app.get( '/messages', ( req, res )=>{
    console.log( 'in /messages GET' );
    res.send( messages );
}) // end /messages GET

app.post( '/messages', ( req, res )=>{
    console.log( 'in /messages POST:', req.body );
    messages.push( req.body );
    res.sendStatus( 201 );
}) //end /messages POST