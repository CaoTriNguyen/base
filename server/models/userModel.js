const mysql = require("mysql2");

const UserModel = (sequelize, Sequelize) => {
    const {INTEGER, STRING, FLOAT, BOOLEAN, DATE} = Sequelize
    const User = sequelize.define('user', {
        Id: {type: INTEGER, primaryKey: true, autoIncrement: true},
        Email: {type: STRING, require: true, minlength: 3, maxlength: 200, primaryKey: true, autoIncrement: true, unique: true},
        UserName: {type: STRING, primaryKey: false, allowNull: true},
        FirstName: {type: STRING, primaryKey: false, allowNull: true},
        LastName: {type: STRING, primaryKey: false, allowNull: true},
        Address: {type: STRING, primaryKey: false, allowNull: true},
        Gender: {type: STRING, primaryKey: false, allowNull: true},
        DateOfBirth: {type: DATE, primaryKey: false, allowNull: true},
        CreateDate: {type: DATE, primaryKey: false, allowNull: true},
        UpdateDate: {type: DATE, primaryKey: false, allowNull: true},
        LastTimeOnline: {type: DATE, primaryKey: false, allowNull: true},
        Password: {type: STRING, require: true, minlength: 3, maxlength: 1024 },
        Deleted: {type: DATE, primaryKey: false, allowNull: true},
    },{
        timestamps: true,
    });
    return User;
}

module.exports = UserModel;
