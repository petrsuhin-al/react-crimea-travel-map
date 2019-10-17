import Post from '../models/posts.model';
import User from "../models/user.model";
import cloudinary from "cloudinary";

async function postsList() { // получения всех постов
    return await Post.find()
        .populate('user', 'username profilePhoto') // получение постов с именами пользователей
        .sort({
            createdOn: 'asc'
        })
}

async function postsListByUser(postParam) { // получения всех постов
    return await Post.findOne({user: postParam.user})
        .populate('user', 'username profilePhoto') // получение постов с именами пользователей
        .sort({
            createdOn: 'asc'
        })
}

async function postById(id) { // получение поста по id
    return await Post.findById(id)
        .populate('user', 'username profilePhoto') // для получения имени города и его id коллекции городов
}

async function createPost(postParam, postImages) { // добавления новго поста
    if(postImages) {
        const postImg = await cloudinary.v2.uploader.upload(locationMainImage, {
            folder: `app-files/locations/${locationParam.nameTranslit}/main-image`, // папка куда кидаем фото
            tags: "Location"
        });
        postParam.images.push(postImg.secure_url); // сохраняем в массив ссылку на фото
        postParam.imagesId.push(postImg.public_id); // и id фото из cloudinary
    }

    const post = new Location(postParam);
    await post.save();  // сохраняем пост
}

async function updatePost(id, postParam, postImages) { // обновление поста
    const post = await Post.findById(id);
    if (!post) throw 'Пост не найден';
    if(!postParam.description) throw 'Изменения не были внесены';

    Object.assign(post, postParam);
    await post.save();  // сохраняем пост
}

async function _deletePost(id) { // удаление локации по id
    const post = await Post.findById(id); // ищем локацию

    if(post.user){
        const user = await User.findById(post.user); // ищем город
        user.posts.remove(id);
        await user.save();
    }

    // if(location.mainImage !== "" || location.mainImageId !== ""){ // чекаем есть ли уже фото в базе
    //     cloudinary.v2.uploader.destroy(location.mainImageId); // если есть то удаляем ее с облака
    // }

    await post.remove(); // удаляем локацию
}

module.exports = {
    postsList,
    postsListByUser,
    postById,
    updatePost,
    deletePost: _deletePost,
};