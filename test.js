const bcrypt = require('bcryptjs');

/*
async function test() {
    const saltRounds = 10;
    const text = "PepeElLoro";
    let hash = await bcrypt.hash(text, saltRounds);
    let result = await bcrypt.compare(text, hash);
    let result2 = await bcrypt.compare('pepepepe', hash);
    console.log('1 ' + result)
    console.log(result2)
}

test();
*/
//https://caras-r-backend.herokuapp.com/users/get
function testPromise() {
    return new Promise(async function (resolve, reject) {
        try {
            let data = await fetch('https://caras-r-backend.herokuapp.com/users/get');
            console.log(data)
            if(data) {
                resolve(true);
            } else {
                resolve(false)
            }
        } catch(err) {
            reject(Error(err));
        }
    })
}

async function pepe() {
    try {
        let res = await testPromise();
        console.log(res)
    } catch (err) {
        console.error(err)
    }
}


pepe()