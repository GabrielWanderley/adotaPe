import { useParams } from 'react-router-dom';
import dog from '../../assets/dogup.png'
import './styles.css';

export function Animal(){
   const id1 = useParams()
   const id = id1.id
   
    return(

         <div className='animalsBackImage'>
          <h1>NOME DO ANIMAL</h1>
          <div className='imageAnimalContent'>
          <img src={dog} alt="animal"/>            
          </div>
           <div className='textAnimalContent'>
          <p>              
            nós dedicamos a resgatar, cuidar e encontrar lares amorosos para animais abandonados. Localizada no coração da cidade, a organização conta com uma equipe de voluntários apaixonados que oferecem cuidados médicos, alimentação e muito carinho aos animais resgatados. Além disso, a Adotape promove eventos de adoção e campanhas de conscientização sobre a importância da adoção responsável. Com a ajuda da comunidade, a ONG já conseguiu mudar a vida de centenas de animais, proporcionando-lhes uma nova chance de ser felizes.
          </p>            
           </div>

          </div>
    )
}