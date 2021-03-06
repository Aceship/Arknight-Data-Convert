var fs = require('fs')
const splitEasy = require("csv-split-easy");
// var jbinary = require('jbinary')
// if (process.argv.length <= 2) {
//     console.log("Usage: " + __filename + " path/to/directory");
//     process.exit(-1);
// }
let exceldir = "../excel/"
let itemdir = exceldir + "item_table.json"

let furnituredir = exceldir + "building_data.json"
// let data = fs.readFileSync("./input/all.csv", 'utf8')
let itemdetail = JSON.parse(fs.readFileSync(itemdir,"utf8"))
let builddetail = JSON.parse(fs.readFileSync(furnituredir,"utf8"))
// let progress = fs.readFileSync("./input/progress.csv", 'utf8')
// let datacol = [
//     // 'caster',
//     // 'defender',
//     // 'guard',
//     // 'medic',
//     // 'sniper',
//     // 'specialist',
//     // 'supporter',
//     // 'vanguard'
//     'all'
// ]

// console.log(itemdetail.items)
var csv = []

csv.push(`"Item ID","Item Name","Item Description","Item Usage","Item Icon"`)

Object.keys(itemdetail.items).forEach(element => {
    var curritem = itemdetail.items[element]
    var puretext = []
    console.log(curritem)
    csv.push(`"${curritem.itemId}","${curritem.name}","${curritem.description.replace("\\n","\n")}","${curritem.usage}","${curritem.iconId}"`)
});
fs.writeFile(`./output/ItemList.csv`, csv.join("\n"), function (err) {
        if (err) {
            return console.log(err);
        }
    })

var furnidetail = builddetail.customData.furnitures
var csv = []

csv.push(`"Item ID","Item Name","Item Description","Item Usage","Item Icon"`)

Object.keys(furnidetail).forEach(element => {
    var curritem = furnidetail[element]
    var puretext = []
    console.log(curritem)
    csv.push(`"${curritem.id}","${curritem.name}","${curritem.description.replace("\\n","\n")}","${curritem.usage}","${curritem.iconId}"`)
});
fs.writeFile(`./output/FurniList.csv`, csv.join("\n"), function (err) {
    if (err) {
        return console.log(err);
    }
})
// fs.readFile("./input/caster.csv")
// console.log(data)

// ParseCSV(data)

// let curr = splitEasy(data)
// var progresscsv = splitEasy(progress)
// // console.log(curr)

// let fulljson = createJSON(curr)

// fs.writeFile(`./output/tl-voiceline.json`, JSON.stringify(fulljson, null, '\t'), function (err) {
//         if (err) {
//             return console.log(err);
//         }
//     })

// function createJSON(csv){
//     var json ={}
//     // console.log(csv[980])
//     for (i=2;i<csv.length;i++){
//         var currRow = csv[i]
//         if(!json[currRow[0]]){
//             json[currRow[0]]={}
//             var currentcredits = progresscsv.find(search=> search[0]==currRow[1])
//             console.log(currentcredits)
//             json[currRow[0]].name = currRow[1]
//             json[currRow[0]].translator= currentcredits[1]
//             json[currRow[0]].proofreader= currentcredits[2]
//         }
//         if(!json[currRow[0]].voiceline){
//             json[currRow[0]].voiceline={}
//         }
//         if(!json[currRow[0]].voiceline[currRow[2]]){
//             json[currRow[0]].voiceline[currRow[2]]={}
//         }
//         json[currRow[0]].voiceline[currRow[2]].cn = currRow[4]
//         json[currRow[0]].voiceline[currRow[2]].en = currRow[5]
//         json[currRow[0]].voiceline[currRow[2]].jp = currRow[6]
//     }
//     console.log(json)
//     return json
// }
// function ParseCSV(csv){
//     let splitted = csv.split("\n")
//     // console.log(splitted)
//     let header = splitted[2].split(",")
//     console.log(splitted[3].split(","))

//     // let charaname = ""
//     // let skillid =""
//     // let skillname = ""
//     // let collectionJson = {}
//     for(i=2;i<3;i++){
//         let regex = /(?:^|,)(?=[^"]|(")?)"?((?(1)[^"]*|[^,"]*))"?(?=,|$)/g
//         let check = regex.exec(splitted[i])
//         // console.log(splitted[i])
//         // let currentSplit = splitted[i].split(",")
//         // if(currentSplit[0]!=""){
//         //     // charaname = currentSplit[0]
//         //     // skillname= currentSplit[3]
//         //     // skillid = currentSplit[2]
//         //     // // if(!collectionJson[charaname])
//         //     // //     collectionJson={}
//         //     // collectionJson[skillid]={}

//         //     // collectionJson[skillid].name=currentSplit[3]
//         //     // collectionJson[skillid].desc=[]
//         // }
//         // // let currjson = {}

//         // let regex = /(?:^|,)(?=[^"]|(")?)"?((?(1)[^"]*|[^,"]*))"?(?=,|$)/
//         // let check = regex.exec(splitted[i])
//         // if(check){
//         //     collectionJson[skillid].desc.push(check[2])     
//         // }else{
//         //     collectionJson[skillid].desc.push(currentSplit[9])     
//         // }
           
        
//     }
//     // fs.writeFile(`./output/sniper.json`, JSON.stringify(collectionJson, null, '\t'), function (err) {
//     //     if (err) {
//     //         return console.log(err);
//     //     }
//     // })
//     // return collectionJson
//     // console.log(collectionJson)
// }
