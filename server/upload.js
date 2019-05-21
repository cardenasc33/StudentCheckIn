const IncomingForm = require('formidable').IncomingForm

// export the callback function, called when
// someone hits the '/upload'/URL.  
// gives us a request-object (req), that stores
// information about the request that hit the route

//Also get a reponse-object(rest)
//req and res
module.exports = function upload(req, res) {

    //Create a new form
    var form = new IncomingForm()

    // The first callback is called for every file in the form
    form.on('file', (field, file) =>{
        //Do something with the file
        //e.g save it to the database
        //you can access it using file.path

    })

    //second callback is called when the form is completely parsed
    form.on('end', () =>{
        res.json()
    })

    //Trigger the parsing of the form:
    form.parse(req);
}





