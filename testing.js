const db_handler = require("./handlers/db_handler");


const test = {
    registerTestUser
}

async function registerTestUser(username, password){

    let test_user = {
        username,
        password
    }
    
    await db_handler.login.create_user(test_user);

}

module.exports = test;
