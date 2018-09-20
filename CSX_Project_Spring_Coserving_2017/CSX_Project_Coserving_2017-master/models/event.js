var mongoose = require('mongoose');

var CSEventSchema = new mongoose.Schema({
    eventtype: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },
    eventpeople: {
        type: Number,
        min: 1,
        max: 10
    },
    eventpoint: {
        type: Number,
        min: 50,
        max: 20000
    },
    eventtime: {
        type: Date,
        // expires: '24h'
    },
    eventcreator: {
        type: String
    },
    eventpairusername: [{
        type: String,
    }],
    eventstate: {
        // 0 尚未開始 // 1 進行中  // 2 已結案  
        type: String
    },
    eventpaircount: {
        type: Number
    }
});


var CSEvent = mongoose.model('CSEvent', CSEventSchema);
module.exports = CSEvent;