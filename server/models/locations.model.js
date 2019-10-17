import mongoose from "mongoose";

const openingTimeSchema = new mongoose.Schema({ // модель времени работы
    days: {
        type: String,
        required: true
    },
    opening: String,
    closing: String,
    closed: {
        type: Boolean,
        required: true
    }
});

const reviewSchema = new mongoose.Schema({ // модель отзыва
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: String,
    createdOn: {
        type: Date,
        "default": Date.now()
    }
});

const locationSchema = new mongoose.Schema({ // модель самой локации
    name: {
        type: String,
        required: true
    },
    nameTranslit: {
        type: String,
        default: ''
    },
    type: [{
        type: String,
        default: ''
    }],
    globalTypes: {    // добавить в записи потом
        type: String,
        default: ''
    },
    turnId: {
        type: Number,
        default: '',
        required: true
    },
    mainImage: {
        type: String,
        default: ''
    },
    mainImageId: {
        type: String,
        default: ''
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    address: String,
    rating: {
        type: Number,
        "default": 0,
        min: 0,
        max: 5
    },
    tags: [String],
    coords: {
        type: [Number],
        index: '2dsphere'
    },
    openingTimes: [openingTimeSchema],
});

const Location = mongoose.model('Location', locationSchema);
export default Location;