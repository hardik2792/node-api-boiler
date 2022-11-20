'use strict';
const {Schema, model} = require('mongoose');

const naviSchema = Schema({
    priority: { type: String, default: 'normal', enum: ["normal", "low", "high"] },
    title: { type: String, required: true },
    description: { type: String, default: null },
    isCompleted: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now },
    modifiedDate: { type: Date, default: Date.now }
});

model('Todo', naviSchema);