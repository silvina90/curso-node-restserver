const mongoose = require('mongoose');

const dbConenection = async () => {
    try {
        await mongoose.connect(process.env.MONFODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
 //           useCreateIndex: true,
 //           useFindAndModify: false
        });
        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('error a la hora de levatar base de datos');
    }

}


module.exports = {
    dbConenection
}