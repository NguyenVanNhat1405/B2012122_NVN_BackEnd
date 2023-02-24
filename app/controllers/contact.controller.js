const ContactService = require ("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, 'Name can not be empty'));
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
        // An error occurred while creating the contact
        // Đã xảy ra lỗi khi tạo liên hệ
    }
}

// Xử lý chức năng tìm tất cả liên hệ 
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, "An error occurred while retrieving contacts"));
    }
    return res.send(documents);
}
// Khi người dùng tạo liên hệ mới thì hàm contactService.create() sẽ 
// được gọi để lưu thông tin liên hệ vào cơ sở dữ liệu MongoDB
// Phương thức create() được định nghĩa trong lớp ContactService
// Nếu có lỗi xảy ra sẽ chuyển cho middleware xử lý lỗi đã định nghĩa trong app.js (thông qua lời gọi
// next(error)).
exports.findOne = async (req, res, next) => {
    // res.send({message: "findOne handler"});
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if(!document){
            return next(new ApiError(404, 'contact not found'));
        }
        return res.send(document);    
        } catch (error) {
        return next(new ApiError(500, 'Error retrieving contact'));
    }
}

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    // res.send({message: "delete handler"});
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if(!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "Contact was delete successfully"});
    } catch (error) {
        return next(new ApiError(500, `Could not delete contact with id = ${req.params.id}`));
    }
}

exports.findAllFavorite = async (req, res, next) => {
    // res.send({message: "findAllFavorite handler"});
    try {
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findFavorite();
        return res.send(documents);
    }
    catch(error) {
        return next(new ApiError(500, 'An error occurred while retrieving favorite contacts'));
    }
}

exports.deleteAll = async (_req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const deletedCount = await contactService.deleteAll();
        return res.send({message: `${deletedCount} contacts was deleted successfully`})
    } catch (error) {
        return next(new ApiError(500, 'Error updating contact'));
    }
}

exports.login =(req, res) => {
    res.send({message: "login handler"})
};

exports.register =(req, res) => {
    res.send({message: "register handler"})
};