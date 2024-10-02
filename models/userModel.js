const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require('uuid');
let users = [
    {
      username: 'admin',
      password: bcrypt.hashSync('12345', 10), // Contraseña encriptada
      apiKey: bcrypt.hashSync(uuidv4(), 10) // Genera una API key encriptada
    },
    {
      username: 'user',
      password: bcrypt.hashSync('password', 10), // Contraseña encriptada
      apiKey: bcrypt.hashSync(uuidv4(), 10)
    }
  ];

  function generateApiKey(){
    return crypto.randomBytes(16).toString('hex');
  }
  
  function getUserByUsername(username) {
    return users.find(user => user.username === username);
  }

  function getUserByApiKey(apiKey) {
    return users.find(user => bcrypt.compareSync(apiKey, user.apiKey));
  };
  function createUser(username, password){
    const apiKey = uuidv4();
    const hashedPassword = bcrypt.hashSync(password, 10);
    const hashedApiKey = bcrypt.hashSync(apiKey, 10);

    const newUser = {
      username,
      password: hashedPassword,
      apiKey: hashedApiKey
    };
    users.push(newUser);
    return {username, apiKey};
  }


  module.exports = {
    getUserByUsername,
    getUserByApiKey,
    createUser
  };