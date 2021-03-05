let xlsx = require('node-xlsx').default,
    fs = require('fs');

let pathXLSX = "locale.xlsx",
    pathLocales = "D:\\JS\\Chrome\\Youtube-filter\\_locales",
    json = xlsx.parse(`${__dirname}/${pathXLSX}`)[0].data,
    array = [];



json.forEach((arr, i) => {
    array.push({});
    arr.forEach((string, j) => {
        if (j == 0) {
            array[i][json[0][j]] = string.split(' ')[0];
        } else {
            array[i][json[0][j]] = {};
            array[i][json[0][j]].message = string;
        }
    });
});

array.slice(1, array.length - 1).forEach((obj, i) => {
    let path = `${pathLocales}\\${obj.locale}`;
    if (fs.existsSync(path)) {
        fs.rmdirSync(path, { force: true, recursive: true });
    }
    fs.mkdir(path, (err) => {
        if (err) console.log(err);

        delete obj.locale;

        fs.writeFile(`${path}\\messages.json`, JSON.stringify(obj), (err) => {
            if (err) console.log(err);
        });
    });
});