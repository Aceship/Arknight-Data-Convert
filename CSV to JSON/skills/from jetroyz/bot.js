var fs = require('fs')
const splitEasy = require("csv-split-easy");
const XLSX = require('xlsx')
// var jbinary = require('jbinary')
// if (process.argv.length <= 2) {
//     console.log("Usage: " + __filename + " path/to/directory");
//     process.exit(-1);
// }

// var workbook = XLSX.readFile('./input/skill.xlsx');
// console.log(workbook)

// console.log(workbook.SheetNames[0])
// console.log(workbook.Sheets[workbook.SheetNames[0]])
// console.log()

// console.log(SheetNames)
// let data = fs.readFileSync("./input/vanguard.csv", 'utf8')
// let progress = fs.readFileSync("./input/progress.csv", 'utf8')
let charadetail = JSON.parse(fs.readFileSync("../../../json/excel/character_table.json","utf8"))
let unreadablename = JSON.parse(fs.readFileSync("./extra/tl-unreadablename.json","utf8"))
let datacol = [
    'caster',
    'defender',
    'guard',
    'medic',
    'sniper',
    'specialist',
    'supporter',
    'vanguard'
    // 'all'
]
console.log(datacol.length)
// for(i=0;i<datacol.length+1  ;i++){
//     var currsheetName = workbook.SheetNames[i]
//     var currentsheet = workbook.Sheets[workbook.SheetNames[i]]
//     // var csv = XLSX.utils.sheet_to_csv(currentsheet,{FS:"\t",RS:"\n"})
//     var maxlength = XLSX.utils.sheet_to_json(currentsheet).length
//     // console.log(maxlength)
//     var currsheet = []
//     for(r=0;r<maxlength;r++){
//         var currRow = `"`
//         for(c=0;c<8;c++){
//             var cell_address = {c:c, r:r}
//             var cellref = XLSX.utils.encode_cell(cell_address)
//             var currCell = currentsheet[cellref]?currentsheet[cellref].v?currentsheet[cellref].v:"" : ""
//             // console.log(currCell)
//             currRow+=currCell+`","`
//         }
//         currRow+=`"`
//         currsheet.push(currRow)
//     }
//     // console.log(currsheet)
//     // var cell_address = {c:0, r:0}
//     // var cellref = XLSX.utils.encode_cell(cell_address)
//     // var customcsv = currentsheet[cellref]
//     // console.log(customcsv)
//     fs.writeFile(`./input/${currsheetName.toLowerCase()}.csv`, currsheet.join("\n"), function (err) {
//         if (err) {
//             return console.log(err);
//         }
//     })
// }
let customjson = {}

Object.keys(charadetail).forEach(element => {
    var currchara = charadetail[element]
    var currname = currchara.appellation
    if(unreadablename[currchara.appellation]){
        currname = `${currchara.appellation} (${unreadablename[currchara.appellation]})`
    }
    // console.log(currname)
    // console.log(currchara.skills)
    customjson[currname]={}
    customjson[currname].skills = currchara.skills
    // customjson
});
console.log(customjson)

var alljson = []
datacol.forEach(element => {
    var currdata = fs.readFileSync(`./input/${element}.csv`, 'utf8')
    var currsplit = splitEasy(currdata)
    currsplit.shift()
    // console.log(currsplit)
    alljson = alljson.concat(currsplit)
    // console.log(alljson)
});
// console.log(alljson)
// fs.writeFile(`./output/string.json`, JSON.stringify(alljson, null, '\t'), function (err) {
//     if (err) {
//         return console.log(err);
//     }
// })
// console.log(customjson)
// let collectionData = []
// datacol.forEach(element => {
//     let currdata = fs.readFileSync(`./input/${element}.csv`,`utf8`)
//     collectionData.push(ParseCSV(currdata))
// });

// let combinedData = {}
// collectionData.forEach(element => {
//     Object.assign(combinedData,element)
// });

// fs.writeFile(`./output/tl-skills.json`, JSON.stringify(combinedData, null, '\t'), function (err) {
//         if (err) {
//             return console.log(err);
//         }
//     })
// fs.readFile("./input/caster.csv")
// console.log(data)

// ParseCSV(data)

// let curr = splitEasy(data)
// var progresscsv = splitEasy(progress)
// console.log(curr)

let fulljson = createJSON(alljson)
// console.log(charadetail)
fs.writeFile(`./output/tl-skills.json`, JSON.stringify(fulljson, null, '\t'), function (err) {
        if (err) {
            return console.log(err);
        }
    })

function createJSON(csv){
    var json ={}
    // console.log(csv)
    var currChara =''
    var charcount = 0
    var charskillname = ''
    // console.log(csv[980])
    for (i=0;i<csv.length;i++){
        var currRow = csv[i]
        if(currRow[0]!=''){
            if(currChara == currRow[0]){
                charcount +=1
            }else{
                charcount=0
            }
            currChara = currRow[0]
            charskillname = currRow[2]
            // console.log(currChara)
            // console.log(charcount)
            
            // console.log(customjson[currChara].skills[charcount].skillId)
            // console.log(currChara)
            
        }
        // console.log(currChara)
        console.log(currChara)
        var currskillid = customjson[currChara].skills[charcount].skillId
        if(!json[currskillid]){
            json[currskillid]={}
            json[currskillid].name = charskillname  
            json[currskillid].desc = []
        }

        if(json[currskillid].desc){
            json[currskillid].desc[currRow[3]-1]=currRow[4]
        }
    }
    return json
}
