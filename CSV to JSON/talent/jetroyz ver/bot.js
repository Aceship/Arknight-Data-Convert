var fs = require('fs')
const splitEasy = require("csv-split-easy");
// var jbinary = require('jbinary')
// if (process.argv.length <= 2) {
//     console.log("Usage: " + __filename + " path/to/directory");
//     process.exit(-1);
// }
let data = fs.readFileSync("./input/vanguard.csv", 'utf8')
// let progress = fs.readFileSync("./input/progress.csv", 'utf8')
let charadetail = JSON.parse(fs.readFileSync("../../../json/excel/character_table.json","utf8"))
let unreadablename = JSON.parse(fs.readFileSync("../../../json/tl-unreadablename.json","utf8"))
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

let customjson = {}

Object.keys(charadetail).forEach(element => {
    var currchara = charadetail[element]
    var currname = currchara.appellation


    // console.log(unreadablename[currchara.appellation])
    var checkUnread = unreadablename.find(search=>search.name == currchara.appellation)
    console.log(checkUnread)
    if(checkUnread){
        currname = `${currchara.appellation} (${checkUnread.name_en})`
    }
    // console.log(currname)
    // console.log(currchara.skills)
    // console.log("------------------------")
    // console.log(currchara)
    customjson[currname]={}
    customjson[currname].id = element
    customjson[currname].talents = []
    if(currchara.talents){
        currchara.talents.forEach(talent => {
            // console.log(talent.candidates)
            currenttalentcandidate =talent.candidates
            if(currenttalentcandidate)
            customjson[currname].talents.push(currenttalentcandidate.length)
        });
    }
    
    // customjson[currname].talents = currchara.skills
    // customjson
});

// console.log(customjson["Shaw"].talents)

// var alljson = []
// datacol.forEach(element => {
//     var currdata = fs.readFileSync(`./input/${element}.csv`, 'utf8')
//     var currsplit = splitEasy(currdata)
//     currsplit.shift()
//     // console.log(currsplit)
//     alljson = alljson.concat(currsplit)
//     // console.log(alljson)
// });
// console.log(alljson)
// fs.writeFile(`./output/string.json`, JSON.stringify(alljson, null, '\t'), function (err) {
//     if (err) {
//         return console.log(err);
//     }
// })
// console.log(customjson)
let collectionData = []
datacol.forEach(element => {
    let currdata = fs.readFileSync(`./input/${element}.csv`,`utf8`)
    collectionData.push(splitEasy(currdata))
});

let combinedData = {}
collectionData.forEach(element => {
    Object.assign(combinedData,createJSON(element))
});

fs.writeFile(`./output/tl-talents.json`, JSON.stringify(combinedData, null, '\t'), function (err) {
        if (err) {
            return console.log(err);
        }
    })
// fs.readFile("./input/caster.csv")
// console.log(data)

// ParseCSV(data)

// let curr = splitEasy(data)

// console.log(curr)
// var currjson = createJSON(curr)

// console.log(currjson)

console.log(customjson)
function createJSON(csv){
    var json={}
    var currChara =''
    var charcount = 0
    var talentgroup = 0
    var talentcount = 0
    for(i=0;i<csv.length;i++){
        var currRow = csv[i]
        if (currRow[0]!=''&&currRow[0]!="Character"){
            currChara = customjson[currRow[0]]
            if(currRow[0]==currChara){
                charcount += 1
            }else{
                charcount = 0
                talentgroup = 0
                talentcount = 0
            }
            console.log(currRow)
            console.log(currChara)
            
            if(!json[currChara.id])json[currChara.id]=[]
            
            
        }
        if(currChara){
            // if(!json[currChara.id][talentgroup])json[currChara.id]["talents"][talentgroup]=[]
            if(!json[currChara.id][talentgroup])json[currChara.id][talentgroup] = []
            json[currChara.id][talentgroup].push({name:currRow[2],desc:currRow[3]})
            talentcount +=1
            if(talentcount==currChara.talents[talentgroup]){
                talentgroup +=1
                talentcount = 0
            }
        }
    }
    return json
}
// var progresscsv = splitEasy(progress)
// console.log(curr)

// let fulljson = createJSON(alljson)
// // console.log(charadetail)
// fs.writeFile(`./output/tl-skills.json`, JSON.stringify(fulljson, null, '\t'), function (err) {
//         if (err) {
//             return console.log(err);
//         }
//     })

// function createJSON(csv){
//     var json ={}
//     // console.log(csv)
//     var currChara =''
//     var charcount = 0
//     var charskillname = ''
//     // console.log(csv[980])
//     for (i=0;i<csv.length;i++){
//         var currRow = csv[i]
//         if(currRow[0]!=''){
//             if(currChara == currRow[0]){
//                 charcount +=1
//             }else{
//                 charcount=0
//             }
//             currChara = currRow[0]
//             charskillname = currRow[2]
//             console.log(currChara)
//             console.log(charcount)
            
//             console.log(customjson[currChara].skills[charcount].skillId)
//             // console.log(currChara)
            
//         }
//         // console.log(currChara)
//         // console.log(charcount)
//         var currskillid = customjson[currChara].skills[charcount].skillId
//         if(!json[currskillid]){
//             json[currskillid]={}
//             json[currskillid].name = charskillname  
//             json[currskillid].desc = []
//         }

//         if(json[currskillid].desc){
//             json[currskillid].desc[currRow[3]-1]=currRow[4]
//         }
//     }
//     return json
// }
