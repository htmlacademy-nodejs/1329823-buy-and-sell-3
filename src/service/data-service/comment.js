'use strict';

const {sequelize} = require(`../db-connect`);
const {Comment} = sequelize.models;

class CommentService {
  async create(commentData) {
    return await Comment.create(commentData, {rerurning: true});
  }
  async delete(commentId) {
    return await Comment.destroy({where: {id: commentId}});
  }
}

module.exports = CommentService;
