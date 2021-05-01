function callback(path){
    
}

function writeResponse(response, res){
    response.write(res)
}

/**
	 * Handles incoming requests.
	 *
	 * @param {IncomingMessage} request - Input stream — contains data received from the browser, e.g. encoded contents of HTML form fields.
	 * @param {ServerResponse} response - Output stream — put in it data that you want to send back to the browser.
	 * The answer sent by this stream must consist of two parts: the header and the body.
	 * <ul>
	 *  <li>The header contains, among others, information about the type (MIME) of data contained in the body.
	 *  <li>The body contains the correct data, e.g. a form definition.
	 * </ul>
	*/
    function requestListener(request, response) {
        console.log("--------------------------------------");
        console.log("The relative URL of the current request: " + request.url + "\n");
        var url = new URL(request.url, `http://${request.headers.host}`); // Create the URL object
        if (url.pathname == '/submit') { // Processing the form content, if the relative URL is '/submit'
            /* ************************************************** */
            console.log("Creating a response header");
            // Creating an answer header — we inform the browser that the body of the answer will be plain text
            response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            /* ************************************************** */
            console.log("Creating a response body");
            if (request.method == 'GET'){ // If the GET method was used to send data to the server
                var res = "";
                let path = url.searchParams.get('name');
                console.log(path);
                console.log(path);
                const fs = require('fs');
                fs.access(path, fs.constants.F_OK, function(err){
                    if(!err){
                        fs.readFile(path, (err, data) => {
                            if(!err){
                                res += `File "${path}" exist\n`
                                // Uncomment to display File content!
                                // res += "[File: " + path + " content]\n"
                                // res += data;
                                // console.log("res += data");
                            }else{
                                res += `Directory "${path}" exist\n`
                            }
                            response.write(res)
                            console.log("Secesfully sending a response!");
                            response.end();
                        })  
                    }else{
                        response.write(`File/Directory "${path}" DOES NOT exist`)
                        console.log("Secesfully sending a response!");
                        response.end();
                    }
                });
            }
            else{
                // If other method was used to send data to the server
                response.write(`This application does not support the ${request.method} method`);
                /* ************************************************** */
                console.log("Sending the response");
                response.end(); // The end of the response — send it to the browser
            } 
        }
        else { // Generating the form
            /* ************************************************** */
            console.log("Creating a response header")
            // Creating a response header — we inform the browser that the body of the response will be HTML text
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            /* ************************************************** */
            console.log("Creating a response body");
            // and now we put an HTML form in the body of the answer
            response.write(`<form method="GET" action="/submit">
                                <label for="name">Give name of file</label>
                                <input name="name">
                                <br>
                                <input type="submit">
                                <input type="reset">
                            </form>`);
            /* ************************************************** */
            console.log("Sending the response");
            response.end();  // The end of the response — send it to the browser
        }
    }
    
    /* ************************************************** */
    /* Main block
    /* ************************************************** */
    var http = require("http");
    
    var server = http.createServer(requestListener); // The 'requestListener' function is defined above
    server.listen(8080);
    console.log("The server was started on port 8080");
    console.log("To end the server, press 'CTRL + C'");