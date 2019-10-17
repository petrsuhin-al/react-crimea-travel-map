import City from '../models/cities.model';
import Location from '../models/locations.model';
import cloudinary from "cloudinary";
import rusToLatin from "../helpers/translit";

async function citiesList() { // получения всех городов
    return await City.find()
        .populate({
            path:'locations',
            select: 'name mainImage turnId rating type',
            options: {
                sort: {
                    'turnId': 'asc'
                }
            }
        }) // для получения имени места и id места из коллекции локаций
        .sort({
            turnId: 'asc'
        })
}

async function cityById(id) { // получение города по id
    return await City.findById(id)
        .populate({
            path:'locations',
            select: 'name mainImage turnId rating type',
            options: {
                sort: {
                    'turnId': 'asc'
                }
            }
        }) // для получения имени места и id места из коллекции локаций
}

async function createCity(cityParam, cityImage) { // добавления новой локации
    if (await City.findOne({ name: cityParam.name })) {
        throw 'Город ' + cityParam.name + ' уже существует...';
    }

    if (await City.findOne({ turnId: cityParam.turnId })) {
        throw 'Очередь для ' + cityParam.name + ' не доступна...';
    }

    cityParam.nameTranslit = await rusToLatin(cityParam.name); // имя для папки города, переводим из кирилицы в латиницу (транслит)

    // Фото города (грузим в облако и созраняем с ссылку в БД)
    if(cityImage) {
        const cityImg = await cloudinary.v2.uploader.upload(cityImage, {
            folder: `app-files/cities/${cityParam.nameTranslit}`, // папка куда кидаем фото
            tags: "City"
        });
        cityParam.img = cityImg.secure_url; // сохраняем ссылку на фото
        cityParam.imgId = cityImg.public_id; // и id фото из cloudinary
    }

    const city = new City(cityParam);
    await city.save();
}


async function updateCity(id, cityParam, cityImage) {
    const city = await City.findById(id);

    if (!city) throw 'Город не найден';
    if (city.name !== cityParam.name && await City.findOne({ name: cityParam.name })) {
        throw 'Город ' + cityParam.name + ' уже существует...';
    }

    if (await City.findOne({ turnId: cityParam.turnId })) {
        throw 'Очередь ' + cityParam.name + ' не доступна...';
    }

    // Фото города (грузим в облако и созраняем с ссылку в БД)
    if(cityImage) {
        if(city.img !== "" || city.imgId !== ""){ // чекаем есть ли уже фото в базе
            cloudinary.v2.uploader.destroy(city.imgId); // если есть то удаляем ее
        }

        const cityImg = await cloudinary.v2.uploader.upload(cityImage, {
            folder: `app-files/cities/${city.nameTranslit}`, // папка куда кидаем фото
            tags: "City"
        });
        cityParam.img = cityImg.secure_url; // сохраняем ссылку на фото
        cityParam.imgId = cityImg.public_id; // и id фото из cloudinary
    }

    Object.assign(city, cityParam);
    await city.save();
}

async function _deleteCity(id) { // удаление города по id
    const city = await City.findById(id);

    if(city.locations){
        for(let locationId of city.locations){
            console.log(locationId);
            const location = await Location.findById(locationId); // ищем город
            if(location) {
                location.city = null;
                await location.save();
            }
        }
    }

    if(city.mainImage !== "" || city.mainImageId !== ""){ // чекаем есть ли уже фото в базе
        cloudinary.v2.uploader.destroy(city.mainImageId); // если есть то удаляем ее с облака
    }

    await city.remove();
}

module.exports = {
    citiesList,
    cityById,
    createCity,
    updateCity,
    deleteCity: _deleteCity,
};