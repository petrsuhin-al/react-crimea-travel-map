import mongoose from "mongoose";

const citiesSchema = new mongoose.Schema({ // модель города
    name: {
        type: String,
        required: true,
        unique: true
    },
    nameTranslit: {
        type: String,
        default: '',
    },
    turnId: {
        type: Number,
        default: '',
        unique: true,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    img: {
        type: String,
        default: ''
    },
    imgId: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: ''
    },
    locations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    }],
}, {toJSON: { virtuals: true }});

const City = mongoose.model('City', citiesSchema);
export default City;