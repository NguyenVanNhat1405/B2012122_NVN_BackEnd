exports.create = (req, res) => {
    res.send({message: "create handler"});
};

exports.findAll = (req, res) => {
    res.send({message: "findAll handler"});
};

exports.findOne = (req, res) => {
    res.send({message: "findOne handler"});
};

exports.update = (req, res) => {
    res.send({message: "update handler"});
};

exports.detele = (req, res) => {
    res.send({message: "delete handler"});
};

exports.deteleAll = (req, res) => {
    res.send({message: "deleteAll handler"});
};

exports.findAllFavorite = (req, res) => {
    res.send({message: "findAllFavorite handler"});
};