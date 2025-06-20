const userModel = require('../models/users');

// fecth get users
const fecthUsers = async (req, res) => {
    try {
        const allUsers = await userModel.find({});
        if (allUsers) {
            res.status(200).json({ message: "users record is found", record: allUsers })
        } else {
            res.status(200).json({ message: "users record is not found" })
        }
    } catch (error) {
        res.status(404).json({ message: "somthing went worng " })
    }
}

// insert users
const insertUsers = (req, res) => {
    console.log(req.body);
    try {
        const insertUser = userModel.create(req.body);
        if (insertUser) {
            res.status(201).json({ insert: true, message: "users data is inserted sucessfully" });
        }
        else {
            res.status(201).json({ insert: false, message: "users data is insertion faild" });
        }
    } catch (error) {
        res.status(404).json({ message: "somthing went worng ", error: error });
    }
}

//delete user
const DeleteUsers = async (req, res) => {
    try {
        const deleteData = await userModel.findByIdAndDelete(req.params.id);
        if (deleteData) {
            res.status(200).json({ mes: "delete user successfuly" })
        } else {
            res.status(200).json({ mes: "delete user faild" })
        }
    } catch (error) {
        res.status(404).json({ message: "somthing went worng ", error: error });
    }

}

// update user 
const UpdateUsers = async (req, res) => {
    try {
        const updateData = await userModel.findByIdAndUpdate(req.params.id, req.body);
        if (updateData) {
            res.status(200).json({ message: "user update successfuully" })
        } else {
            res.status(200).json({ message: "updated failed" })
        }
    } catch (error) {
        res.status(404).json({ message: "somthing went worng ", error: error });
    }

}
module.exports = {
    fecthUsers, insertUsers, DeleteUsers, UpdateUsers
}