const mongoose = require('mongoose');
//iO0MlEFPUT1cfeZq
var db;
mongoose.connect("mongodb+srv://venkateshwar:iO0MlEFPUT1cfeZq@moviecluster.2ag1b.mongodb.net/CinemaParadiso?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(!err)
    {
        console.log('Database Connected!');
    }
    
    else
    {
        console.log(` Error in connecting the database ${err}`); 
    }
    
}
);



module.exports = mongoose;