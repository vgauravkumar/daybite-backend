const logger = require('../../services/logger');
const { Database } = require('../../services/db');
const { validateCreatePost, validateEditPost, validateDeletePost } = require('../../validation/post/crud');

const createPost = async (req, res) => {
    try {
        // Write some code...
        const validationError = validateCreatePost(req.body);
        if (validationError) {
            logger.warn(`${req.user.user_id}: ${validationError}`);
            return res.status(400).json({
                success: true,
                message: validationError
            });
        }
        const { food_name, description } = req.body;
        const DB = new Database();
        await DB.query(`INSERT INTO post (food_name, description, timestamp) VALUES ("${food_name}", "${description}", ${parseInt(new Date().getTime())});`);
        DB.close();
        return res.status(200).json({
            success: true,
            message: "Successfully uploaded post."
        });
    } catch (err) {
        logger.error(err.stack);
        return res.status(500).json({
            success: false,
            message: "An unknown error occured"
        });
    }
}
const getAllPost = async (req, res) => {
    try {
        // Write some code...
        const DB = new Database();
        const posts = await DB.query(`SELECT id, food_name, description, image, timestamp FROM post WHERE is_deleted = 0 ORDER BY timestamp DESC;`);
        DB.close();
        return res.status(200).json({
            success: true,
            posts
        });
    } catch (err) {
        logger.error(err.stack);
        return res.status(500).json({
            success: false,
            message: "An unknown error occured"
        });
    }
}
const editPost = async (req, res) => {
    try {
        // Write some code...
        const validationError = validateEditPost(req.body);
        if (validationError) {
            logger.warn(`${req.user.user_id}: ${validationError}`);
            return res.status(400).json({
                success: true,
                message: validationError
            });
        }
        const { id, food_name, description } = req.body;
        const DB = new Database();
        await DB.query(`UPDATE post SET food_name = "${food_name}", description = "${description}" WHERE id = ${id};`);
        DB.close();
        return res.status(200).json({
            success: true,
            message: "Your post was successfully updated!"
        });
    } catch (err) {
        logger.error(err.stack);
        return res.status(500).json({
            success: false,
            message: "An unknown error occured"
        });
    }
}
const deletePost = async (req, res) => {
    try {
        // Write some code...
        const validationError = validateDeletePost(req.body);
        if (validationError) {
            logger.warn(`${req.user.user_id}: ${validationError}`);
            return res.status(400).json({
                success: true,
                message: validationError
            });
        }
        const { id } = req.body;
        const DB = new Database();
        await DB.query(`UPDATE post SET is_deleted = 1 WHERE id = ${id};`);
        DB.close();
        return res.status(200).json({
            success: true,
            message: "Successfully deleted post"
        });
    } catch (err) {
        logger.error(err.stack);
        return res.status(500).json({
            success: false,
            message: "An unknown error occured"
        });
    }
}
const getPostWithId = async (req, res) => {
    try {
        // Write some code...
        const validationError = validateDeletePost(req.query);
        if (validationError) {
            logger.warn(`${req.user.user_id}: ${validationError}`);
            return res.status(400).json({
                success: true,
                message: validationError
            });
        }
        const { id } = req.query;
        const DB = new Database();
        const post = await DB.query(`SELECT id, food_name, description, image, timestamp FROM post WHERE id = ${id};`);
        DB.close();
        return res.status(200).json({
            success: true,
            post: post.length ? post[0] : null
        });
    } catch (err) {
        logger.error(err.stack);
        return res.status(500).json({
            success: false,
            message: "An unknown error occured"
        });
    }
}

module.exports = {
    createPost,
    getAllPost,
    editPost,
    deletePost,
    getPostWithId
}