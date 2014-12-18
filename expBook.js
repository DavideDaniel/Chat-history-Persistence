var http = require( "http" );
var fs = require( "fs" );
var server = http.createServer( function ( request, response ) {
  path = request.url;
  console.log( request.url );
  
  

  fs.readFile( "index.html", function ( err, data1 ) {
      var index = data1.toString()
      var search = [];
      var i = 0;

  

      var Book = function(name, filename, url_name){
      this.name = name;
      this.filename = filename;
      this.url_name = url_name;
      this.createHTML = function(index){
      
      fs.readFile( filename , function ( err, data2 ) {
          var text = data2.toString();
          lines = text.replace( /\n/g, '<br>' )
          text = '<p>' + lines + '</p>';
          var bookHtml = index.replace( "REPLACEME", text )
                console.log(index)
                console.log("Hey")
        response.end( bookHtml )} )
  }}
  var Life_of_Chopin = new Book("Life of Chopin", "Life_of_Chopin.txt", "/Life_of_Chopin")
  search.push(Life_of_Chopin);
    if ( path === "/" || path === "/favicon.ico" ) {
      response.end(index)}


 if (path === search[i].url_name){
        search[i].createHTML(index)
      }
      
      
  }
  )
})    
;
server.listen( 2000 );


