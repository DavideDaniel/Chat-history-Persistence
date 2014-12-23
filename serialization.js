// Serialization taken too far?
//	-- current issues -- 
//	1. first connect after crash responds empty -- fix scope or ASYNC!
//	2. if format gets messed up no easy way to fix -- make separate function file for future projects

var WSS = require( 'ws' )
	.Server;
var server = new WSS( {
	port: 3000
} );
// 	Added timestamp via moment - capture empty strings with just timestamp 
var moment = require( 'moment' );
var now = moment()
	.format( 'MMM Do, h:mm a' );
//	Added fs as requirement
var fs = require( 'fs' );
var history = [];
//	Added var for files to point to history.txt and backupFile.txt
var file = "history.txt";
var backupFile = "backupFile.txt";
//	On connection history array joins and sends array elements as strings
server.on( "connection", function ( ws ) { 
	var historyMsg = history.join( "\n" );
	//	On connection check if backed up history is shorter than backup (indicating possible crash)
	//	If so, populate from backup file
	fs.readFile( file, function ( err, data ) { // ** NOTE - data for txt files is formatted properly on wscat and .split is bad news bears
		var backedUp = data
		console.log( history.length + "history" )
		console.log( backedUp.length + "backedup" )
		if ( history.length < backedUp.toString()
			.split( "," )
			.length ) {
			history.push( backedUp );
			ws.send( historyMsg );
		}
		else {
			ws.send( historyMsg );
		}
	} )
	//	On message, push msg to  history array 
	ws.on( "message", function ( msg ) {
		history.push( now + "::" + msg );
		console.log( now + "::" + msg );
	} )
	//	On close, write to file - this ensures the last message gets added to array
	ws.on( "close", function () {
		fs.writeFile( file, historyMsg, function ( err ) {} )
		// AND create a copy here for backup and PERSISTENCE
		fs.readFile( file, function ( err, data ) {
			var backuptxt = data
			//	Making sure to do nothing if the data.length is 0 and prevent overwriting the backup
			if ( backuptxt.length < 1 ) {}
			else {
				fs.writeFile( backupFile, backuptxt, function ( err ) {} )
			}
		} );
	} )
} )