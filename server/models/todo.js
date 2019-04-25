'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const naviSchema = mongoose.Schema({
    priority:{ type: String, default: 'normal' },
    details:{ type: String, default: '-' },
    isCompleted:{ type: Boolean, default: false },
    createdDate:{ type: Date, default: Date.now },
    modifiedDate:{ type: Date, default: Date.now }
});

mongoose.model('Todo', naviSchema);