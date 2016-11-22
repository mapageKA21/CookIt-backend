'use strict';

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    "username": { type : String, index: { unique: true }},
    "hash": { type : String},
    "token": { type : String, index: { unique: true }}
});

mongoose.model('User', eventSchema);
