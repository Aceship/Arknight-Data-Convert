var fs = require('fs')
// var jbinary = require('jbinary')
// if (process.argv.length <= 2) {
//     console.log("Usage: " + __filename + " path/to/directory");
//     process.exit(-1);
// }
let charadetail = JSON.parse(fs.readFileSync("./excel/character_table.json","utf8"))
let unread = JSON.parse(fs.readFileSync("./ace/tl-unreadablename.json","utf8"))
var charalist= []
Object.keys(charadetail).forEach(element => {
    let currobject = charadetail[element]
    charalist.push({name:currobject.appellation,id:element})
});
console.log(charalist)
// let data = fs.readFileSync("./input/vanguard.csv", 'utf8')
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

fs.writeFile(`./output/tl-talents.json`, JSON.stringify(combinedData, null, '\t'), function (err) {
        if (err) {
            return console.log(err);
        }
})
// fs.readFile("./input/caster.csv")
// console.log(data)
// var data = fs.readFileSync("./input/supporter.csv","utf8")
// ParseCSV(data)

function ParseCSV(csv){
    let splitted = csv.split("\n")
    // console.log(splitted)
    let header = splitted[0].split(",")
    console.log(header)
    let charaname = ""
    let skillid =""
    let talentname = ""
    let collectionJson = {}
    let currenttalentnum =0
    let currenttalentgroup = 0
    for(i=1;i<splitted.length;i++){
        // console.log(splitted[i])
        let currentSplit = splitted[i].split(",")
        if(currentSplit[0]!=""){
            charaname = currentSplit[0]
            talentname= currentSplit[3]
            
            if(!collectionJson[charaname]){
                var currunread= unread.find(search2=>charaname.includes(search2.name))
                var namesearch = ""
                if(currunread){
                    console.log("found")
                    namesearch = ` (${currunread.name_en})`
                }
                console.log(charaname)
                charaname = charalist.find(search=>{
                    
                    if(search.name+namesearch==charaname){
                        
                        return search.id
                    }
                        
                    // else if(charaname.includes(search.name))
                    //     return search.id
                }).id
                currenttalentnum=0
                currenttalentgroup=0
            }
            
            // console.log(charadetail)
            
            
            collectionJson[charaname]=[]
            collectionJson[charaname].push([])
            // collectionJson[skillid].name=currentSplit[3]
            // collectionJson[skillid].desc=[]
        }
        if(charadetail[charaname].talents[currenttalentgroup]){
            
            if(!charadetail[charaname].talents[currenttalentgroup].candidates[currenttalentnum]){
                currenttalentgroup+=1
                currenttalentnum=0
                collectionJson[charaname].push([])
            }
            currenttalentnum+=1
        }
        let currjson = {}
        // console.log(currenttalentgroup)
        // console.log(currenttalentnum)
        // console.log(collectionJson[charaname])
        // console.log(splitted[i])
        let regex = /(,")(.*)(",)/
        let check = regex.exec(splitted[i])
        if(check){
            let regex2 = /(.*)(,)(.*)(,")/
            let check2 = regex2.exec(splitted[i])
            collectionJson[charaname][(currenttalentgroup)].push({name:check2[3],desc:check[2]})     
        }else{
            collectionJson[charaname][(currenttalentgroup)].push({name:currentSplit[2],desc:currentSplit[3]})     
        }
        
           
        
    }
    console.log(collectionJson)
    return collectionJson
    // console.log(collectionJson)
}
