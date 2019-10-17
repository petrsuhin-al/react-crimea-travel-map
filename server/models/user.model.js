import mongoose from 'mongoose';

const schemaUser = new mongoose.Schema({  // модель пользователя
    username: {
        type: String,
        unique: true,
        //required: true
    },
    hash: {
        type: String,
        //required: true
    },
    facebookProvider: {
        type: {
            id: {
                type: String,
                unique: true
            },
            profileUrl: {
                type: String
            },
            token: {
                type: String,
            }
        }
    },
    vkProvider: {
        type: {
            id: {
                type: String,
                unique: true
            },
            profileUrl: {
                type: String
            },
            token: {
                type: String,
            }
        }
    },
    okProvider: {
        type: {
            id: {
                type: String,
                unique: true
            },
            profileUrl: {
                type: String
            },
            token: {
                type: String,
            }
        }
    },
    instaProvider: {
        type: {
            id: {
                type: String,
                unique: true
            },
            profileUrl: {
                type: String
            },
            token: {
                type: String,
            }
        }
    },
    name: {
        type: String,
        default: ''
    },
    email: {
        unique: true,
        //required: true,
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
    }],
    gender: {
        type: String,
        default: ''
    },
    birthday: {
        type: Date,
    },
    city: String,
    profilePhoto: {
        type: String,
        default: ''
    },
    profilePhotoID: {
        type: String,
        default: ''
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

schemaUser.set('toJSON', { getters: true, virtuals: true });

const User = mongoose.model('User', schemaUser);
export default User;