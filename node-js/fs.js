
const fs = require('node:fs');
const path = require('node:path');

const bPath = path.join(__dirname, 'directories/boys')
const gPath = path.join(__dirname, 'directories/girls')

console.log(bPath)
console.log(gPath)

fs.readdir(bPath, (err, files) => {
    if (err)
        console.log(err);
    else {
        files.forEach(file => {
            const pathToFile = path.join(bPath, file)
            fs.readFile(pathToFile, (err, data) => {
                if (err)
                    console.log(err)
                else {
                    // console.log(pathToFile)
                    const json = JSON.parse(data)
                    // console.log(json)
                    if (json.sex === 'female'){
                        fs.rename(pathToFile, path.join(gPath, file), (err, data)=>{
                            if (err) console.log(err); console.log(data)
                        })
                    } else {
                        fs.rename(file, path.join(bPath, file), (err, data)=>{
                            if (err) console.log(err); console.log(data)
                        })
                    }
                }
            })
        })
    }
})

fs.readdir(gPath, (err, files) => {
    if (err)
        console.log(err);
    else {
        files.forEach(file => {
            const pathToFile = path.join(gPath, file)
            fs.readFile(pathToFile, (err, data) => {
                if (err)
                    console.log(err)
                else {
                    // console.log(pathToFile)
                    const json = JSON.parse(data)
                    // console.log(json)
                    if (json.sex === 'male'){
                        fs.rename(pathToFile, path.join(bPath, file), (err, data)=>{
                            if (err) console.log(err); console.log(data)
                        })
                    } else {
                        fs.rename(file, path.join(gPath, file), (err, data)=>{
                            if (err) console.log(err); console.log(data)
                        })
                    }
                }
            })
        })
    }
})
