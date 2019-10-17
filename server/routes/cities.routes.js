import citiesControllers from "../controllers/cities.controllers";
import multerUpload from "../helpers/multer-settings";

const getAllCities = (req, res, next) => {  // получение всех городов
    citiesControllers.citiesList()
        .then(locations => res.json(locations))
        .catch(err => next(err));
};

const getCityById = (req, res, next) => { // получение города по id
    citiesControllers.cityById(req.params.id)
        .then(location => location ? res.json(location) : res.sendStatus(404))
        .catch(err => next(err));
};

const addNewCity = (req, res, next) => { // постим новый город
    citiesControllers.createCity(req.body, (req.file) ? req.file.path : false) // проверяем на содержание файла в последнем параметре
        .then(() => res.json({message: 'Новый город ' + req.body.name + ' добавлен!'}))
        .catch(err => next(err));
};

const updateCity = (req, res, next) => { // обновляем город по id
    citiesControllers.updateCity(req.params.id, req.body, (req.file) ? req.file.path : false) // проверяем на содержание файла в последнем параметре
            .then(() => res.json({message: 'Город ' + req.body.name + ' обновлен!'}))
            .catch(err => next(err));
};

const _deleteCity = (req, res, next) => { // удаляем город по id
    citiesControllers.deleteCity(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
};

export default (app) => {
    const urlPrefix = '/cities';
    app.get(urlPrefix, getAllCities);
    app.get(urlPrefix + '/:id', getCityById);
    app.post(urlPrefix, multerUpload.single('image'), addNewCity);
    app.put(urlPrefix + '/:id', multerUpload.single('image'), updateCity);
    app.delete(urlPrefix + '/:id', _deleteCity);
};
