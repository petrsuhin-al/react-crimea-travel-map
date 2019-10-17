import locationsControllers from "../controllers/locations.controllers";
import multerUpload from "../helpers/multer-settings";

const getAllLocations = (req, res, next) => {  // получение всех локации
    locationsControllers.locationsList()
        .then(locations => res.json(locations))
        .catch(err => next(err));
};

const getLocationsById = (req, res, next) => { // получение локации по id
    locationsControllers.locationsById(req.params.id)
        .then(location => location ? res.json(location) : res.sendStatus(404))
        .catch(err => next(err));
};

const addNewLocations = (req, res, next) => { // постим новую локацию
    locationsControllers.createLocation(req.body, (req.file) ? req.file.path : false)
        .then(() => res.json({message: 'Новое место ' + req.body.name + ' добавлено!'}))
        .catch(err => next(err));
};

const updateLocations = (req, res, next) => { // обновление локации
    locationsControllers.updateLocation(req.params.id, req.body, (req.file) ? req.file.path : false)
        .then(() => res.json({message: 'Данные локации обновлены!'}))
        .catch(err => next(err));
};

const _deleteLocation = (req, res, next) => { // удаляем локацию
    locationsControllers.deleteLocation(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
};

export default (app) => {
    const urlPrefix = '/locations';
    app.get(urlPrefix, getAllLocations);
    app.get(urlPrefix + '/:id', getLocationsById);
    app.post(urlPrefix, multerUpload.single('image'), addNewLocations);
    app.put(urlPrefix + '/:id', multerUpload.single('image'), updateLocations);
    app.delete(urlPrefix + '/:id', _deleteLocation);
};
