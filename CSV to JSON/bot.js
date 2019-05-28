var fs = require('fs')
// var jbinary = require('jbinary')
// if (process.argv.length <= 2) {
//     console.log("Usage: " + __filename + " path/to/directory");
//     process.exit(-1);
// }
let data = fs.readFileSync("./input/sniper.csv", 'utf8')
let datacol = [
    'caster',
    'defender',
    'guard',
    'medic',
    'sniper',
    'specialist',
    'supporter',
    'vanguard'
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

fs.writeFile(`./output/skills-tl.json`, JSON.stringify(combinedData, null, '\t'), function (err) {
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
// let json1 = JSON.parse(fs.readFileSync(`./json/akhr.json`, 'utf8'))
// let json2 = JSON.parse(fs.readFileSync(`./json/akhr-cn.json`, 'utf8'))
// var jsonArr = []
// var tagArr= []
// var campArr=[]
// var typeArr=[]
// for (i=0;i<json1.length;i++){
//     var json = {}
//     let js1 = json1[i]
//     let js2 = json2[i]
//     json.name_cn = js2.name;
//     json.name_en = js1.name;
//     if(!isDoubleByte(js2.name)){
//         json.name_jp = js2.name;
//         json.name_kr = js2.name;
//     }else{
//         json.name_jp = "";
//         json.name_kr = "";
//     }
//     json.characteristic_cn = js2.characteristic;
//     json.characteristic_en = js1.characteristic;
//     json.characteristic_jp = "";
//     json.characteristic_kr = "";
//     json.camp = js2.camp;
//     json.type = js2.type;
//     json.level = js2.level;
//     json.sex = js2.sex;
//     json.tags = js2.tags;
//     json.hidden = js2.hidden;
//     jsonArr.push(json)
//     //tag maker
//     if (js2.tags){
//         for(j=0;j<js2.tags.length;j++){
//             var json ={}
//             var isfound = false
//             tagArr.forEach(element => {
//                 if(element.tag_cn==js2.tags[j]){
//                     isfound = true;
//                 }
//             });
//             if(isfound==false){
//                 json.tag_cn = js2.tags[j]
//                 json.tag_en = js1.tags[j]
//                 json.tag_jp = ""
//                 json.tag_kr = ""
//                 tagArr.push(json)
//             }
//         }
//     }
//     //type maker
//     var json={}
//     var isfound = false
//     typeArr.forEach(element => {
//         if(element.type_cn==js2.type){
//             isfound = true;
//         }
//     });
//     if(isfound == false){
//         json.type_cn = js2.type
//         json.type_en = js1.type
//         json.type_jp = ""
//         json.type_kr = ""
//         typeArr.push(json)
//     }
//     //camp maker
//     var json={}
//     var isfound = false
//     campArr.forEach(element => {
//         if(element.camp_cn==js2.camp){
//             isfound = true;
//         }
//     });
//     if(isfound == false){
//         json.camp_cn = js2.camp
//         json.camp_en = js1.camp
//         json.camp_jp = ""
//         json.camp_kr = ""
//         campArr.push(json)
//     }

// }
// // console.log(jsonArr)
// // console.log(tagArr)
// tagArr.sort((a,b)=>{
//     return a-b
// })

// function isDoubleByte(str) {
//     for (var i = 0, n = str.length; i < n; i++) {
//         if (str.charCodeAt( i ) > 255) { return true; }
//     }
//     return false;
// }


// // fs.writeFile(`./json/tl-tags.json`, JSON.stringify(tagArr, null, '\t'), function (err) {
// //     if (err) {
// //         return console.log(err);
// //         callback(undefined);
// //     }
// // })
// // fs.writeFile(`./json/tl-type.json`, JSON.stringify(typeArr, null, '\t'), function (err) {
// //     if (err) {
// //         return console.log(err);
// //         callback(undefined);
// //     }
// // })
// fs.writeFile(`./json/tl-camp.json`, JSON.stringify(campArr, null, '\t'), function (err) {
//     if (err) {
//         return console.log(err);
//         callback(undefined);
//     }
// })