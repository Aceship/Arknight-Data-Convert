var fs = require('fs')
// var jbinary = require('jbinary')
// if (process.argv.length <= 2) {
//     console.log("Usage: " + __filename + " path/to/directory");
//     process.exit(-1);
// }
let exceldir = "../excel/"
let itemdir = exceldir + "item_table.json"
let furnituredir = exceldir + "building_data.json"
let stagedir = exceldir+"stage_table.json"
// let data = fs.readFileSync("./input/all.csv", 'utf8')
let itemdetail = JSON.parse(fs.readFileSync(itemdir,"utf8"))
let builddetail = JSON.parse(fs.readFileSync(furnituredir,"utf8"))
let stageDetail =  JSON.parse(fs.readFileSync(stagedir,"utf8"))
let keys = JSON.parse(fs.readFileSync("./input/tl-stagedesc.json","utf8"))



// console.log(stageDetail.stages)
// var keys = {}
Object.keys(stageDetail.stages).forEach(element => {
    var currentStage = stageDetail.stages[element]
    if(currentStage.description.includes("\\n")){
        // console.log(currentStage.description)
        var currentreplace = currentStage.description.split("\\n")
        // console.log(currentreplace)
        currentreplace.forEach(keying => {
            if(!keys[keying]){
                console.log(keying)
                keys[keying]=""
            }
        });
    }
    
});

fs.writeFile(`./output/tl-stagedesc.json`, JSON.stringify(keys, null, '\t'), function (err) {
    if (err) {
        return console.log(err);
    }
})

// Object.keys(stageDetail.stages).forEach(element => {
//     var currentStage = stageDetail.stages[element]
//     if(currentStage.description.includes("\\n")){
//         // console.log(currentStage.description)
//         var currentreplace = currentStage.description.split("\\n")
//         // console.log(currentreplace)
//         currentreplace.forEach(keying => {
//             if(keys[keying]&&keys[keying]!=""){
                
//             }
//         });
//     }
    
// });
