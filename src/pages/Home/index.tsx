import './styles.css';
import dogImage from '../../assets/dogup.png';
import dogImage2 from "../../assets/midleDog.png";
import pata from '../../assets/pata.png';
import bruna from '../../assets/bruna.png';
import cati from '../../assets/catIcon.png';
import dogi from '../../assets/dogIcon.png';
import qr from '../../assets/QR_Code_Afinz 1.png';
import { collection, getDocs } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebase';
import { useEffect, useState } from 'react';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { Link } from 'react-router-dom';


interface Animais{

  id:number,
  nome:string,
  resumo:string,
  descricao:string,
  especie:string,
  imagens?:string[],

}

export function Home() {

const [texto , setTexto] = useState<Animais[]>([]);
const [animalB , setAnimalB] = useState('cachorro')

useEffect(() =>{

   const getDados= async () => {

  const getCollection = collection(db, 'animais');
  const getData= await getDocs(getCollection);

  const getPetsDados = await Promise.all(getData.docs.map(async (doc)=>{
     const data = doc.data();
    
     const imagesRef = ref(storage, `animais/${data.id}`);

     const listResults = await listAll(imagesRef);
     const urlImagens = await listResults.items.map(item => getDownloadURL(item));
     const imagens = await Promise.all(urlImagens)
     console.log(imagens)
     return{
       id : data.id,
       nome : data.nome,
       resumo : data.resumo,
       descricao : data.descricao,
       especie : data.especie,
       imagens : imagens
     }as Animais;
  }));

   setTexto(getPetsDados);
   };
   getDados();

},[]);

const buttaoGato= () => {
  setAnimalB('gato');
}

const buttaoCachorro = () => {
  setAnimalB('cachorro');
}

const temAnimal = texto.length > 0 

  return (
    <div className='containerHome'>
      <div className='backStart'>
        <div className='backStartContent'>
          <div className='startText'>
            <h1>Conheça o adota pe</h1>
            <p> nós dedicamos a resgatar, cuidar e encontrar lares amorosos para animais abandonados. Localizada no coração da cidade, a organização conta com uma equipe de voluntários apaixonados que oferecem cuidados médicos, alimentação e muito carinho aos animais resgatados. </p>
            <button>veja mais</button>
          </div>
          <div className='startimage'>
            <img src={dogImage} alt='cachorro' />
          </div>
          <div className='midleAnimals'>
            <img src={dogImage2} alt="dog" />
            <div className='startAnimalsContent'>
              <div className='limitStartAnimalsContent'>
                { temAnimal ? (
                  <>
              {texto.slice(0, 3).map(animal =>(
              
              <div className='animalStart'>
              <Link to={`/animal/${animal.id}`} style={{textDecoration:'none', color:'inherit'}}>
              <img src={animal.imagens?.[0]}/>
              <h3>{animal.nome}</h3>
               <p>{animal.resumo}</p>   
              </Link>
              </div>             
              ))
              }                    
                  </>
                ):(
                  <>
                  <h1>Não temos animais para adoção 🎉</h1>
                  </>
                )}
              
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='contetMidle'>
         <img src={pata}alt='pata'/>
         <h1>Um pouco sobre nos</h1>
         <div className='contetMidleImageInfo'>
          <img src={bruna}alt='bruna'/>
          <div className='contetMidleInfo'>
            <h1>Adota pe - Bruna Marinho</h1>
            <p>
              nós dedicamos a resgatar, cuidar e encontrar lares amorosos para animais abandonados. Localizada no coração da cidade, a organização conta com uma equipe de voluntários apaixonados que oferecem cuidados médicos, alimentação e muito carinho aos animais resgatados. Além disso, a Adotape promove eventos de adoção e campanhas de conscientização sobre a importância da adoção responsável. Com a ajuda da comunidade, a ONG já conseguiu mudar a vida de centenas de animais, proporcionando-lhes uma nova chance de ser felizes.
            </p>
          </div>
         </div>
      </div>
    <div className='contentAdote'>
      <h1>Animais disponiveis para adoção</h1>
      <button className='button1' onClick={buttaoGato}>
        <img src={cati} alt='cat'/>
        </button>
      <button className='button2' onClick={buttaoCachorro}>
        <img src={dogi} alt='dog'/>
      </button>
      { temAnimal ?
       (
      <div className='contentdisplayAnimais'>
        {texto.map( animal =>{ 
          
          if(animal.especie == animalB){
          return(
        <Link to={`/animal/${animal.id}`} style={{textDecoration:'none', color:'inherit'}}>
         <div className='Animal'>
          <img src={animal.imagens?.[0]} alt='animal'/>
           <h2>{animal.nome}</h2>
           <p>{animal.descricao.slice(0, 120)} <br/><span>...Para ver mais clique no animal</span> </p>
         </div>
        </Link>
        )} 
        return null
        })}
      </div>      
      ):(<h1>Não temos animais para adoção 🎉</h1>)}

    </div>
    <div className='donateback'>       
     <div className='dotaneArea'>
       <div className='titleDonate'>
        <h1>Faça sua doação ou nos ajude de alguma outra forma</h1>
       </div>
       <div className='donateText'>
         <h1>Maneiras de nos ajudar</h1>
         <p>Peço desculpas pelo erro. O TypeScript está apontando que a propriedade 'style' não existe no tipo 'Element' porque o tipo 'Element' não inclui a propriedade 'style' por padrão. Para resolver isso, podemos converter o tipo do elemento para 'HTMLElement', que inclui a propriedade 'stylePeço desculpas pelo erro. O TypeScript está apontando que a propriedade 'style' não existe no tipo 'Element' porque o tipo 'Element' não inclui a propriedade 'style' por padrão. Para resolver isso, podemos converter o tipo do elemento para 'HTMLElement', que inclui a propriedade 'style</p>
       </div>
       <div className='donateQr'>
        <h1>faça sua doação</h1>
         <div className='qrCode'>
          <img src={qr}alt='qr'/>
         </div>
       </div>
      </div>
    </div>
    </div>
  )
}