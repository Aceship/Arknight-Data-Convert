var fs = require('fs');
var XLSX = require('xlsx');
// var buf = fs.readFileSync("./input/Arknights Talents.xlsx");
// var wb = XLSX.read(buf, {type:'buffer'});

const wb = XLSX.readFile("./input/skill.xlsx",);


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
    XLSX.writeFile(workbook, `./input/${element.toLowerCase()}.csv`, { bookType: "csv" });
});
