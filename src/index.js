let creator = function(){
    Array.prototype.group = function(callback){
        console.log();
        let item = {}
        for (let itemDelArray of this) {
            // Limpieza de datos que vengan de una DB
            if (typeof itemDelArray == "object" && itemDelArray.length == undefined) {
                if (itemDelArray.dataValues) {
                    itemDelArray = itemDelArray.dataValues;
                }
                // Valor de la propiedad pasada, de este elemento
                let property = callback(itemDelArray);
                if (property) {
                    // Si el acumulador NO tiene ya este valor
                    if (!item[property]) {
                        item[property] = [itemDelArray] // Creo un acumulador con el primer dato
                    } else { // Si no
                        item[property].push(itemDelArray) // Lo agrego
                    }
                } else {
                    throw new Error("La propiedad no existe en el objeto")
                }
            } else if (typeof itemDelArray == "object" && itemDelArray.length != undefined) {
                throw new Error("El método debe ejecutarse en un arreglo de objetos, éste es un arreglo de "+"array"+"s.")
            } else {
                throw new Error("El método debe ejecutarse en un arreglo de objetos, éste es un arreglo de "+typeof itemDelArray+"s.")
                
            }
        }
        return item;
    }
}
module.exports = creator();