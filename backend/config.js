const path = require('path');

const rootPath = __dirname;

let dbName;

if(process.env.NODE_ENV === 'test') {
    dbName = 'musicApp_test';
} else {
    dbName = 'musicApp';
}

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    audioUploadPath: path.join(rootPath, 'public/uploads/audio'),
    database: `mongodb://localhost/${dbName}`,
    databaseOpt: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    facebookAccess: '1273260783048980',
    facebookSecret: 'e18ead93612ab25b6955b0bbb4afbf69'
};