var GenerateSku = function generateSku(name){
    var maximum = 1000;
    var minimum = 1;
    var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    return name.substring(0,3)+randomnumber;
}

module.exports = {
    GenerateSku
};
