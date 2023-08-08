require("babel-polyfill")
const ExcelJS = require('exceljs/dist/es5')
const fs = require('fs')

const getFileName = (sourcePath) => {
    const pathSplit = sourcePath.split('/')
    const fileNameAndExtension = pathSplit[pathSplit.length - 1]
    const fileNameAndExtensionSplit = fileNameAndExtension.split('.')
    const fileName = fileNameAndExtensionSplit[0]
    return fileName
}

const readFile = (sourcePath) => {
    const content = fs.readFileSync(sourcePath, { encoding: 'utf-8' })
    return content.split('\n')
}

const processLineByLine = async (sourcePath) => {
    let count = 1

    const sheetName = getFileName(sourcePath)

    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet(sheetName)

    const content = readFile(sourcePath)
    content.forEach(line => {
        if (line) {
            const jsonLine = JSON.parse(line)
            if (count === 1) {
                const columns = []
                columns.push({
                    header: 'id', 
                    key: 'id',
                })

                const headers = Object.keys(jsonLine)
                headers.forEach(header => {
                    columns.push({
                        header, 
                        key: header,
                    })
                })                    

                sheet.columns = columns
            } 
            const row = {
                id: count,
                ...jsonLine
            }
            sheet.addRow(row)
            
            count ++
        }
    })
    const outputPath = `./src/output/${sheetName}.xlsx`
    workbook.xlsx.writeFile(outputPath)
}

const main = async (sourcePath) => {
    await processLineByLine(sourcePath)
}

module.exports = main