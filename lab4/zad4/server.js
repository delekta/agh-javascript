const fs = require('fs');
const mime = require('mime-types');

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
                if(fs.existsSync(path)){
                    if(fs.statSync(path).isFile()){
                        // jesli reprezentuje dokument html
                        if(mime.lookup(path) == "text/html"){
                            res += 'file is html\n';
                            let data = fs.readFileSync(path, 'utf-8')
                            // res += "[File: `" + path + "` content]\n";
                            // replace all \n 
                            var ret = data.replace(/\n/g,'')
                            let regexpTable = /<\s*table[^>]*>(.*?)<\s*\/\s*table>/g;
                            let matchAllTable = ret.matchAll(regexpTable);
                            // console.log(matchAll);
                            for(table of matchAllTable){
                                res += '[Table]\n'
                                // res += match[1];
                                let regexpTr = /<\s*tr[^>]*>(.*?)<\s*\/\s*tr>/g;
                                let matchAllTr = table[1].matchAll(regexpTr)
                                for(tr of matchAllTr){
                                    let regexpTd = /<\s*td[^>]*>(.*?)<\s*\/\s*td>/g;
                                    let matchAllTd = tr[1].matchAll(regexpTd)
                                    for(td of matchAllTd){
                                        // console.log(matchTd[1])
                                        res +=  td[1] + "\t"
                                    }
                                    res += '\n'
                                }
                                res += '\n\n\n'
                            }
                            // res += 'test\t123\n'
                            // res += '1\t1\n'
                            
                        }

                        res += "File exists\n";
                        response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
                        
                    }
                    else if(fs.statSync(path).isDirectory()){
                        res += "Directory exist!\n";
                        var table = "<style>table, th, td, tr{border: 1px solid black; border-collapse: collapse;}</style>"
                        table += `<table><tr><th>Plik</th><th>Czas dostępu(atime)</th><th>Czas modyfikacji(mtime)</th></tr>`
                        filenames = fs.readdirSync(path);
                        filenames.forEach((filename) => {
                            stat = fs.statSync(path + "/" + filename)
                            // console.log(`${filename}\t${stat.atime}\t${stat.mtime}\n`);
                            table += `<tr><td>${filename}</td><td>${stat.atime}</td><td>${stat.mtime}</td></tr>`;
                        })
                        table += `</table>`
                        res += table
                        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                    }
                }else{
                    res += "File/Directory do not exists in this folder\n";
                }
                
                response.write(res);
                response.end();
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
                                <label for="name">Give names of files in sequence: name1 name2 ...</label>
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
const { table } = require('console');
    
    var server = http.createServer(requestListener); // The 'requestListener' function is defined above
    server.listen(8080);
    console.log("The server was started on port 8080");
    console.log("To end the server, press 'CTRL + C'");