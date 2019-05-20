import React from 'react';

export default function ReviewStars(props) {
  let {valor} = props;  
  let full_star = require('../../../img/star-full-yellow.svg');
  let middle_star = require('../../../img/star-middle-yellow.svg');
  let empty_star = require('../../../img/star-empty-yellow.svg');

  if(valor>0){
  return (
    <div className='review-stars'>
       {//"Primera estrella" 
       }
       {(valor<0.5 && <img className='star' src={empty_star} alt="Estrellas" />)}
       {((valor>=0.5 && valor<1) && <img className='star' src={middle_star} alt="Estrellas" />)}
       {((valor>=1) && <img className='star' src={full_star} alt="Estrellas" />)}

       {//"Segunda estrella" 
       }
       {(valor<1.5 && <img className='star' src={empty_star} alt="Estrellas" />)}
       {((valor>=1.5 && valor<2) && <img className='star' src={middle_star} alt="Estrellas" />)}
       {((valor>=2) && <img className='star' src={full_star} alt="Estrellas" />)}

       {//"Tercera estrella" 
       }
       {(valor<2.5 && <img className='star' src={empty_star} alt="Estrellas" />)}
       {((valor>=2.5 && valor<3) && <img className='star' src={middle_star} alt="Estrellas" />)}
       {((valor>=3) && <img className='star' src={full_star} alt="Estrellas" />)}

       {//"Cuarta estrella" 
       }
       {(valor<3.5 && <img className='star' src={empty_star} alt="Estrellas" />)}
       {((valor>=3.5 && valor<4) && <img className='star' src={middle_star} alt="Estrellas" />)}
       {((valor>=4) && <img className='star' src={full_star} alt="Estrellas" />)}

       {//"Quinta estrella" 
       }
       {(valor<4.5 && <img className='star' src={empty_star} alt="Estrellas" />)}
       {((valor>=4.5 && valor<5) && <img className='star' src={middle_star} alt="Estrellas" />)}
       {((valor>=5) && <img className='star' src={full_star} alt="Estrellas" />)}

       {"  ("+valor+")"}

    </div>
  )}

  else{
    return (<div className='review-stars'>{valor}</div>);
  }
}


// {valor}
//        <img className='star' src={full_star} alt="Estrellas" />
//        <img className='star' src={middle_star} alt="Estrellas" />
//        <img className='star' src={empty_star} alt="Estrellas" />