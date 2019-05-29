var fs = require('fs')
// var jbinary = require('jbinary')
// if (process.argv.length <= 2) {
//     console.log("Usage: " + __filename + " path/to/directory");
//     process.exit(-1);
// }
let data = fs.readFileSync("./input/sniper.csv", 'utf8')
let datacol = [
    // 'caster',
    // 'defender',
    // 'guard',
    // 'medic',
    // 'sniper',
    // 'specialist',
    // 'supporter',
    // 'vanguard'
    'all'
]
let collectionData = []
datacol.forEach(element => {
    let currdata = fs.readFileSync(`./input/${element}.csv`,`utf8`)
    collectionData.push(ParseCSV(currdata))
});

let combinedData = {}
collectionData.forEach(element => {
    Object.assign(combinedData,element)
});

fs.writeFile(`./output/tl-skills.json`, JSON.stringify(combinedData, null, '\t'), function (err) {
        if (err) {
            return console.log(err);
        }
    })
// fs.readFile("./input/caster.csv")
// console.log(data)


function ParseCSV(csv){
    let splitted = csv.split("\n")
    // console.log(splitted)
    let header = splitted[0].split(",")
    console.log(header)
    let charaname = ""
    let skillid =""
    let skillname = ""
    let collectionJson = {}
    for(i=1;i<splitted.length;i++){
        // console.log(splitted[i])
        let currentSplit = splitted[i].split(",")
        if(currentSplit[0]!=""){
            charaname = currentSplit[0]
            skillname= currentSplit[3]
            skillid = currentSplit[2]
            // if(!collectionJson[charaname])
            //     collectionJson={}
            collectionJson[skillid]={}

            collectionJson[skillid].name=currentSplit[3]
            collectionJson[skillid].desc=[]
        }
        // let currjson = {}

        let regex = /(,")(.*)(",)/
        let check = regex.exec(splitted[i])
        if(check){
            collectionJson[skillid].desc.push(check[2])     
        }else{
            collectionJson[skillid].desc.push(currentSplit[9])     
        }
           
        
    }
    // fs.writeFile(`./output/sniper.json`, JSON.stringify(collectionJson, null, '\t'), function (err) {
    //     if (err) {
    //         return console.log(err);
    //     }
    // })
    return collectionJson
    // console.log(collectionJson)
}
