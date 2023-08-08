const jsonToExcel = require('./excel/index')

const main = async (sourcePath) => {
    await jsonToExcel(sourcePath)
}

const sourcePath = process.argv[2]
main(sourcePath)