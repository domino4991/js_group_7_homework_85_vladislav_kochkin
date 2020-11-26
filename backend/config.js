const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    audioUploadPath: path.join(rootPath, 'public/uploads/audio'),
    database: "mongodb://localhost/musicApp",
    databaseOpt: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
};