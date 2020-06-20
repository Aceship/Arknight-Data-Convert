var fs = require('fs');
var XLSX = require('xlsx');
// var buf = fs.readFileSync("./input/Arknights Talents.xlsx");
// var wb = XLSX.read(buf, {type:'buffer'});

const wb = XLSX.readFile("../../../input/skill.xlsx",);


// console.log(wb.Sheets.Vanguard)

var all = [
    "Vanguard",
    "Guard",
    "Defender",
    "Specialist",
    "Sniper",
    "Caster",
    "Medic",
    "Supporter",]
all.forEach(element => {
    console.log(element)
    console.log(wb.Sheets[element])
    var workbook = XLSX.utils.book_new();
    var ws1 = wb.Sheets[element]
    XLSX.utils.book_append_sheet(workbook, ws1, element);
    var ws2 = XLSX.utils.sheet_to_csv(ws1,{FS:"\t",RS:"-----"})
    ws2 = ws2.replace(/(")/g,``)
    ws2 = ws2.replace(/(\t)/g,`","`)
    ws2 = ws2.replace(/(\n)/g,`</br></br>`)
    ws2 = ws2.replace(/(-----)/g,`"\n"`)
    ws2 = `"${ws2}"`
    fs.writeFile(`./input/${element}.csv`,ws2, function (err) {
        if (err) {
            return console.log(err);
        }
    })
    // XLSX.writeFile(ws2, `./input/${element}.csv`, { bookType: "csv" });
});
