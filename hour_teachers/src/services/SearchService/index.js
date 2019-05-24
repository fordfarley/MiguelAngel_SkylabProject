

export default class SearchService{

    //Método que recibe un string y elimina los acentos 
    static eliminarDiacriticosEs = (texto) => {
        return texto
               .normalize('NFD')
               .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
               .normalize();
    }

    //Metodo que recibe una lista de talents y devuelve aquellos en los que 
    //se encuentran las palabras a buscar en el nombre, la descripción,
    //el nombre del profesor o los tags
    static searchTheWords = (talentList,search) =>{
        search = search.split(" ");
        let results=[];

        talentList.forEach(element => {
            search.forEach(searchingWord =>{

                //Que la palabra a buscar esté en el nombre del talent
                if(element.name.toLowerCase().includes(searchingWord)){
                    results.push(element);
                }
                
                //Que la palabra a buscar esté en el nombre del teacher
                else if(element.teacherName.toLowerCase().includes(searchingWord)){
                    results.push(element);
                }

                //Que la palabra a buscar esté en la descripción
                else if(element.description.toLowerCase().includes(searchingWord)){
                    results.push(element);
                }

                //Que la palabra a buscar esté contenida en los tags de cada talent
                else{
                    element.tags.forEach(tag => {
                        if(tag.toLowerCase().includes(searchingWord)){
                            results.push(element);
                        }
                    })
                }

            });
        });


        return results;
    }
  
    //Metodo que devuelve la lista de talents ordenada por precio. De mayor a menor.
    //Si le pasamos un true en reversed nos la devolverá al revés
    static sortByPrice = (talentList,reversed) =>{
        talentList.sort((a,b)=>{
            return a.price - b.price;
        })

        if(reversed){
            return talentList.reverse();
        }
        return talentList;
    }

    //Metodo que devuelve la lista de talents con un precio menor al pasado por parámetro.
    static filterByPrice = (talentList, price) =>{
        let result=talentList.filter(elem => {
            // console.log("elem price",parseFloat(elem.price),"max price",parseFloat(price));
            return parseFloat(elem.price) <= parseFloat(price);
        });

        return result;
    }

    //Método que ordena la talent list que recibe en función de las valoraciones recibidas.
    //De mayor valoración a menor. Si le pasamos reversed a true la devuelve al revés.
    static sortByReviews = (talentList,reversed) =>{
        talentList.sort((a,b)=>{
            let valuea = a.totalReview / a.reviews.length;
            let valueb = b.totalReview / b.reviews.length;

            return valuea - valueb;
        })

        if(reversed){
            return talentList;
        }
        return talentList.reverse();
    }

    //Método que devuelve los talentos con máyor calificación en las reviews de las que le pasamos por parámetro.
    static filterByReviews = (talentList, reviewValue) =>{
        let result=talentList.filter(elem => {
            let valueElem = (elem.totalReview / elem.reviews.length).toFixed(1);
            if(isNaN(valueElem)){valueElem=0;}
            return valueElem >= reviewValue;
        });

        return result;
    }

    //Método que filtra aquellos talentos que estén más cerca de nosotros que la distancia definida
    static filterByDistance = (talentList, userPoint, distanceLimit) =>{
        let result=talentList.filter(elem => {
            if(elem.location!==null){
                let valueDistance = (this.distanceBetween(elem.location,userPoint));
                return valueDistance <= distanceLimit;
            }
            return false;
        });

        return result;
    }

    //Método que ordena por distancia.
    static sortByDistance = (talentList,userPoint,reversed) =>{
        talentList.sort((a,b)=>{
            let distanciaA = this.distanceBetween(a.location,userPoint);
            let distanciaB = this.distanceBetween(b.location,userPoint);
            return distanciaA - distanciaB;
        })

        if(reversed){
            return talentList;
        }
        return talentList.reverse();
    }


    //Métodos auxiliares para el método que filtra y ordena por distancia
    static distanceBetween = (point1,point2)=>{
        var lat1 = this.graRad(point1.lat);
		var long1 = this.graRad(point1.long);
		
		var lat2 = this.graRad(point2.lat);
		var long2 = this.graRad(point2.long);
		// calcula la distancia
		var d = Math.acos( Math.sin(lat1)*Math.sin(lat2) +
							Math.cos(lat1)*Math.cos(lat2) * 
							Math.cos(long2-long1) ) * 6371;
		return d;
    } 

    static graRad=(grados)=>{
        var radianes = (grados * Math.PI)/180;
        return radianes;
    }	

    //Método que utiliza al resto para conseguir un resultado de búsqueda con filtros aplicados.
    static searchFiltered(words,useWords,talentList,maxPrice,orderPrice,minReviews,orderReview,maxDistance,location,useLocation){
        let searchResults = talentList.slice();

        //Filtrado por palabras si estas se deben usar...__________________________________
        if(useWords){
            words = this.eliminarDiacriticosEs(words);
            searchResults = this.searchTheWords(searchResults,words);
        }

        //Filtrado por precio______________________________________________________________
        searchResults = this.filterByPrice(searchResults,maxPrice);
        //Ordenamos el resultado si es necesario. 
        if(orderPrice!=="disabled"){
            searchResults=this.sortByPrice(searchResults,(orderPrice==="descend"));
        }

        //Filtrado por reviews______________________________________________________________
        searchResults = this.filterByReviews(searchResults,minReviews);
        //Ordenamos el resultado si es necesario.
        if(orderReview!=="disabled"){
            searchResults=this.sortByReviews(searchResults,(orderReview==="ascend"));
        }

        //Filtrado por distancia____________________________________________________________
        if(useLocation){
            searchResults = this.filterByDistance(searchResults, location, maxDistance);
            searchResults = this.sortByDistance(searchResults, location, true);
        }

        return searchResults;
    
    }

// var Barcelona ={lat : 41.3833, long : 2.1833}
// var Madrid ={lat : 40.4000, long : -3.6833}

}