const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const validator = require('validator');
const UserModel = require('../models/userModel');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
    FROM user`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

const register = async (req, res) => {

  const {
    id, 
    userName, 
    email, 
    firstName, 
    lastName, 
    address,
    gender,
    dateOfBirth,
    createDate,
    updateDate,
    lastTimeOnline,
    deleted,
    password
  } = req.body;

  let user = await UserModel.findOne({email});

  if(user){
    return res.status(400).json("User with the given email already exist...")
  }

  if( !userName || !email || !password){
    return res.status(400).json("All fields are required...");
  }

  if(!validator.isEmail(email)){
    return res.status(400).json("All fields are required...");
  }

  const result = await db.query(
    `INSERT INTO user 
    (name, released_year, githut_rank, pypl_rank, tiobe_rank) 
    VALUES 
    ('${req.name}', ${req.released_year}, ${req.githut_rank}, ${req.pypl_rank}, ${req.tiobe_rank})`
  );

  let message = 'Error in creating user';

  if (result.affectedRows) {
    message = 'User created successfully';
  }

  return {message};
}

async function update(id, programmingLanguage){
  const result = await db.query(
    `UPDATE user 
    SET name="${programmingLanguage.name}", released_year=${programmingLanguage.released_year}, githut_rank=${programmingLanguage.githut_rank}, 
    pypl_rank=${programmingLanguage.pypl_rank}, tiobe_rank=${programmingLanguage.tiobe_rank} 
    WHERE id=${id}` 
  );

  let message = 'Error in updating user';

  if (result.affectedRows) {
    message = 'User updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM user WHERE id=${id}`
  );

  let message = 'Error in deleting user';

  if (result.affectedRows) {
    message = 'User deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  register,
  update,
  remove
}