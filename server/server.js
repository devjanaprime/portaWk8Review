// requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );

// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

// globals
const port = 5000;

// spin up server
app.listen( port, ()=>{
    console.log( 'server up on:', port );
}) // end server up

app.post( '/messages', ( req, res )=>{
    console.log( 'in /messages POST:', req.body );
    res.send( 'ribbet' );
}) //end /messages POST