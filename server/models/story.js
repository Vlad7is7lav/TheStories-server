const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    pages: {
        type: String,
        default: 'n/a'
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {timestamps: true});

const Story = mongoose.model('Story', storySchema);
module.exports = {Story}
