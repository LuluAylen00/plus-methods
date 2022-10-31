let creator = function(){
    Array.prototype.group = function(callback){
        if (typeof callback != 'function') {
            throw new Error('Debe recibir un callback como parámetro')
        }
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

    Array.prototype.randomQ = function (n){
        if(typeof n === "number"){
            let data = this;
            let currentIndex = data.length,
                randomIndex;
            while (currentIndex != 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [data[currentIndex], data[randomIndex]] = [
                    data[randomIndex],
                    data[currentIndex],
                ];
            };
            return data.filter((p, index)=> index < n);
        } else {
            throw new Error("Debe recibir un parámetro numérico y se ha recibido un "+ typeof n)
        }
    }
    
    Array.prototype.randomize = function (){
        let array = this;
        let currentIndex = array.length,
            randomIndex;
        // El while hará la cuenta regresiva para ir cambiando los elementos
        while (currentIndex != 0) {
            // Escojo un elemento aleatorio
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // Y lo cambio por el elemento actual del index
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
        return array;
    }
}
module.exports = creator();