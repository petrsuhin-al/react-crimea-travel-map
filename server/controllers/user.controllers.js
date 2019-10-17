import config from '../../etc/config.json';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cloudinary from 'cloudinary';
import User from '../models/user.model';

const returnTokenWithUser = (user) => {
    const {hash, facebookProvider, ...userWithoutHash} = user.toObject();
    const token = jwt.sign({sub: user.id}, config.secret);
    return {
        ...userWithoutHash,
        facebookProvider: {
            id: facebookProvider.id,
            profileUrl: facebookProvider.profileUrl
        },
        token
    };
};

async function authenticateUser({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, facebookProvider, ...userWithoutHash} = user.toObject();
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            // facebookProvider: {
            //     id: facebookProvider.id
            // },
            token
        };
    }
}

async function authUserWithFB(accessToken, refreshToken, profile, done ){
    const user = await User.findOne({'facebookProvider.id': profile.id});
    console.log(profile);
    if(!user) {
        let newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            gender: profile.gender,
            birthday: profile.birthday,
            city: profile.location,
            facebookProvider: {
                id: profile.id,
                profileUrl: profile.profileUrl,
                token: accessToken
            }
        });
        await newUser.save();
        return done(null, newUser);
    } else {
        return done(null, await returnTokenWithUser(user));
    }
}

async function getAllUsers() {
    return await User.find().select('-hash');
}

async function getUserById(id) {
    return await User.findById(id).select('-hash');
}

async function createUser(userParam) {
    if (await User.findOne({ username: userParam.username })) {
        throw 'Имя пользователя "' + userParam.username + '" занято';
    }

    if (await User.findOne({ email: userParam.email })) {
        throw 'Пользователь с такой почтой уже существует.';
    }

    const user = new User(userParam);

    // делаем хэш-пароль
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // сохраняем
    await user.save();
}

async function updateUser(id, userParam, userImage) {
    const user = await User.findById(id);

    if (!user) throw 'Пользователь не найден';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Имя пользователя "' + userParam.username + '" уже занято...';
    }

    // Фото пользователя (грузим в облако и созраняем с ссылку в БД)
    if(userImage) {
        if(user.profilePhoto !== "" || user.profilePhotoID !== ""){ // чекаем есть ли уже фото в базе
            cloudinary.v2.uploader.destroy(user.profilePhotoID) // если есть то удаляем ее
        }

        const profilePhoto = await cloudinary.v2.uploader.upload(userImage, {
            folder: `users-profiles-photo/user-id-${id}`, // папка куда кидаем фото
            tags: "UserProfilePhoto"
        });
        userParam.profilePhoto = profilePhoto.secure_url; // сохраняем ссылку на фото
        userParam.profilePhotoID = profilePhoto.public_id; // и id фото из cloudinary
    }

    // хэш-пароль, если он был введен
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // копируем свойства userParam в user
    Object.assign(user, userParam);
    await user.save();
}

async function _deleteUser(id) {
    await User.findByIdAndRemove(id);
}

export default {
    authenticateUser,
    authUserWithFB,
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser: _deleteUser
};