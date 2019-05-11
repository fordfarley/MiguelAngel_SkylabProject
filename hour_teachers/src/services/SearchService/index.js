

export default class SearchService{

    static eliminarDiacriticosEs = (texto) => {
        return texto
               .normalize('NFD')
               .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
               .normalize();
    }

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
  
    static sortByPrice = (talentList,reversed) =>{
        talentList.sort((a,b)=>{
            return a.price - b.price;
        })

        if(reversed){
            return talentList.reverse();
        }
        return talentList;
    }

    static filterByPrice = (talentList, price, reversed) =>{
        let result=talentList.filter(elem => {
            return elem.price < price;
        });

        return result;
    }


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

    static filterByReviews = (talentList, reviewValue, reversed) =>{
        let result=talentList.filter(elem => {
            let valueElem = (elem.totalReview / elem.reviews.length).toFixed(1);
            return valueElem >= reviewValue;
        });

        return result;
    }
  }