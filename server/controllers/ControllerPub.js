const { User, Post } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { sign } = require("../helpers/jwt");
const { Op } = require("sequelize");

class Publics {
    //!==================== Auth User ======================
    static async DesignerRegister(req, res, next) {
        try {
            let { name, password, email, imgUrl } = req.body;
            let role = "Designer";
            let registeredEmail = await User.findOne({
                where: { email: email },
            });
            if (!registeredEmail) {
                // console.log("EMAIL BARU");
                let newUser = await User.create({ name, password, email, imgUrl, role });
                res.status(201).json(newUser);
            } else {
                // console.log("EMAIL LAMA");
                throw {
                    status: 400,
                    message: "This email has been registered",
                };
            }
        } catch (error) {
            next(error);
        }
    }

    static login(req, res, next) {
        let { email, password } = req.body;
        User.findOne({
            where: {
                email: email,
            },
        })
            .then((data) => {
                if (!data) {
                    throw { status: 401, message: `Invalid username or email or password` };
                } else {
                    if (comparePassword(password, data.password) == true) {
                        const access_token = sign({ email: email });
                        res.status(200).json({ access_token, name: data.name, email: data.email, role: data.role, id: data.id });
                    } else {
                        throw { status: 401, message: "Invalid username or email or password" };
                    }
                }
            })
            .catch((error) => {
                next(error);
            });
    }

    //!==================== Home Page ======================
    static async getPost(req, res, next) {
        try {
            const limitPage = req.query.size || 8;
            const offsetPage = req.query.page ? req.query.page * limitPage : 0;
            let optionSearch = [];
            if (req.query.name) optionSearch.push({ name: { [Op.iLike]: `%${req.query.name}%` } });
            console.log(optionSearch);
            const option = {
                include: [
                    {
                        model: User,
                        attributes: {
                            exclude: ["password"],
                        },
                    },
                ],
                order: [["id", "DESC"]],
                offset: offsetPage,
                limit: limitPage,
                where: {
                    status: { [Op.ne]: "Inactive" },
                },
            };
            if (optionSearch.length) {
                option.where = { ...option.where, [Op.or]: optionSearch };
            }
            console.log(option);
            const data = await Post.findAndCountAll(option);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async addPost(req, res, next) {
        console.log(req.body);
        console.log(req.file);
        try {
            const { caption } = req.body;
            const userId = req.user.id;
            const isDesigner = await User.findByPk(userId);

            console.log(isDesigner + "INICLG");
            console.log(userId + "INIGGG");
            if (isDesigner.role === "Designer" || isDesigner.role === "Admin") {
                const newPost = await Post.create({ caption: caption, image: req.file.filename, UserId: userId, status: "Active", like: 0 });
                res.status(201).json(newPost);
                // res.status(201).json("=======", isDesigner);
            } else {
                throw {
                    status: 403,
                    message: "Not Authorized",
                };
            }
        } catch (error) {
            next(error);
        }
    }

    //!==================== Profile ======================
    static async getProfile(req, res, next) {
        try {
            console.log("OKEE");
            const postUser = await Post.findAll({
                where: {
                    UserId: req.user.id,
                },
            });
            res.status(200).json(postUser);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
module.exports = Publics;
