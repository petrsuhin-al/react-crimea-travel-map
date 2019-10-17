import Location from '../models/locations.model';
import City from "../models/cities.model";
import rusToLatin from "../helpers/translit";
import cloudinary from "cloudinary";

async function locationsList() { // получения всех локаций
    return await Location.find()
        .populate('city', 'name') // для получения имени города и его id коллекции городов
        .sort({
            turnId: 'asc'
        })
}

async function locationsById(id) { // получение локации по id
    return await Location.findById(id)
        .populate('city', 'name') // для получения имени города и его id коллекции городов
}

async function createLocation(locationParam, locationMainImage) { // добавления новой локации
    if (await Location.findOne({ name: locationParam.name })) {
        throw 'Место "' + locationParam.name + '" уже существует...';  // проверка на существование
    }

    locationParam.nameTranslit = await rusToLatin(locationParam.name); // переводим название в транслит для облака

    if(locationParam.turnId) {
        if (await Location.findOne({city: locationParam.city, turnId: locationParam.turnId})) {
            throw 'Очередь для "' + locationParam.name + '" уже занята...';  // проверка на очередь
        }
    }
    // Фото локации (грузим в облако и созраняем с ссылку в БД)
    if(locationMainImage) {
        const locationImg = await cloudinary.v2.uploader.upload(locationMainImage, {
            folder: `app-files/locations/${locationParam.nameTranslit}/main-image`, // папка куда кидаем фото
            tags: "Location"
        });
        locationParam.mainImage = locationImg.secure_url; // сохраняем ссылку на фото
        locationParam.mainImageId = locationImg.public_id; // и id фото из cloudinary
    }

    const location = new Location(locationParam);

    if(locationParam.city) { //  если был добавлен город
        const city = await City.findById(locationParam.city); // ищем город
        if (!city) throw 'Город не найден'; // исключение

        city.locations.push(location._id); // если все окей, то пушим новую локацию в город
        await city.save();
    }

    await location.save();  // сохраняем локацию
}

async function updateLocation(id, locationParam, locationMainImage) { // обновление локации
    const location = await Location.findById(id);

    if (!location) throw 'Место не найдено';
    if (location.name !== locationParam.name && await Location.findOne({ name: locationParam.name })) {
        throw 'Место ' + locationParam.name + ' уже существует...';
    }

    if(locationParam.turnId) {
        let city = (locationParam.city) ? locationParam.city : location.city;
        if (await Location.findOne({city: city, turnId: locationParam.turnId})) {
            throw 'Очередь для "' + locationParam.name + '" уже занята...';  // проверка на очередь
        }
    }

    // Фото локации (грузим в облако и созраняем с ссылку в БД)
    if(locationMainImage) {
        if(location.mainImage !== "" || location.mainImageId !== ""){ // чекаем есть ли уже фото в базе
            cloudinary.v2.uploader.destroy(location.mainImageId); // если есть то удаляем ее
        }

        const locationImg = await cloudinary.v2.uploader.upload(locationMainImage, {
            folder: `app-files/locations/${location.nameTranslit}/main-image`, // папка куда кидаем фото
            tags: "Location"
        });
        locationParam.mainImage = locationImg.secure_url; // сохраняем ссылку на фото
        locationParam.mainImageId = locationImg.public_id; // и id фото из cloudinary
    }

    if(locationParam.city) { //  если был добавлен город
        if(location.city) {
            const previousCity = await City.findById(location.city); // ищем город
            previousCity.locations.remove(location._id); // удаляем из предыдущего города выбранную локацию
            await previousCity.save();
        }

        const nextCity = await City.findById(locationParam.city); // ищем новый город
        if (!nextCity) throw 'Город не найден'; // исключение

        nextCity.locations.push(location._id); // если все окей, то пушим локацию в новый город
        await nextCity.save();
    }

    Object.assign(location, locationParam);
    await location.save();  // сохраняем локацию
}

async function _deleteLocation(id) { // удаление локации по id
    const location = await Location.findById(id); // ищем локацию

    if(location.city){
        const city = await City.findById(location.city); // ищем город
        city.locations.remove(id);
        await city.save();
    }

    if(location.mainImage !== "" || location.mainImageId !== ""){ // чекаем есть ли уже фото в базе
        cloudinary.v2.uploader.destroy(location.mainImageId); // если есть то удаляем ее с облака
    }

    await location.remove(); // удаляем локацию
}

module.exports = {
    locationsList,
    locationsById,
    createLocation,
    updateLocation,
    deleteLocation: _deleteLocation,
};