const db = require("../db_connection");
const User = require("../database/models/User");
const Account = require("../database/models/Account");
const Post = require("../database/models/Post");
const { response } = require("express");

exports.getByID = (req, res) => {
    const user = request.body.user_id;
    const userProfile = await (Account.findById(user));
    response.status(http.StatusCode.OK).json(userProfile);
}

exports.getCurrentUser = (req, res) => {
    return res.status(200).send({
        status: "success",
        results: req.user.attributes
    })
}

exports.getByPost = (req, res) => {
    const user = request.body.user_id;
    const getpost = await (Post.findById(user));
    response.status(http.StatusCode.OK).json(getpost);
}

exports.editByID = (req, res) => {
    const id = req.query.id;
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;
    const gender = req.query.gender;

    let sql = "UPDATE employees SET first_name = ?, last_name = ?, gender = ?  WHERE emp_no = ?"

    db.query
        (
            sql,
            [first_name, last_name, gender, id],
            (err, results) => {
                if (err) {
                    return res.status(401).send({
                        status: "error",
                        message: err
                    })
                }
                if (results.affectedRows === 0) {
                    return res.status(404).send({
                        status: "error",
                        message: "No user found"
                    })
                }
                return res.status(200).send({
                    status: "success",
                    results: results
                })
            }
        )
}



