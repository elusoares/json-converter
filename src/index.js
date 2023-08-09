const jsonToExcel = require('./excel/index')

const main = async (sourcePath) => {
    await jsonToExcel(sourcePath)
    console.log("Finalizado com Sucesso")
}

const sourcePath = process.argv[2]
main(sourcePath)