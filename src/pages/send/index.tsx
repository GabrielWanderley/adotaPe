import { useEffect, useState } from 'react';
import './styles.css';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, } from "firebase/firestore";
import {  deleteObject, getDownloadURL, listAll, ref, uploadBytes, uploadBytesResumable} from 'firebase/storage';
import { db, storage } from '../../firebase/firebase';


interface Animais{

    id:number,
    nome:string,
    resumo:string,
    descricao:string,
    especie:string,
    imagens?:string[],

}

export function Send(){
 
 const [nome , setNome] = useState('');
 const [resumo , setResumo] = useState('');
 const [descricao , setDescricao] = useState('');
 const [especie , setEspecie] = useState('');
 const [imag1 , setImag1] = useState<File | null>();
 const [imag2 , setImag2] = useState<File | null>();
 const [imag3 , setImag3] = useState<File | null>();
 const [imag4 , setImag4] = useState<File | null>();
 const [progressUpload, setProgressUpload] = useState(0)

 const [texto , setTexto] = useState<Animais[]>([]);

 const [nomeEdit , setNomeEdit] = useState('');
 const [resumoEdit , setResumoEdit] = useState('');
 const [descricaoEdit , setDescricaoEdit] = useState('');
 const [especieEdit , setEspecieEdit] = useState('');

// imagens
 const imagem1 = (files:any)=>{
    if (files && files[0].size < 10000000) {
        setImag1(files[0]);
      } else {
        alert('arquivo muito grande')
      }
}
const imagem2 = (files:any)=>{
    if (files && files[0].size < 10000000) {
        setImag2(files[0]);
      } else {
        alert('arquivo muito grande')
      }
}
const imagem3 = (files:any)=>{
    if (files && files[0].size < 10000000) {
        setImag3(files[0]);
      } else {
        alert('arquivo muito grande')
      }
}
const imagem4 = (files:any)=>{
    if (files && files[0].size < 10000000) {
        setImag4(files[0]);
      } else {
        alert('arquivo muito grande')
      }
}

// enviar um novo animal
const handleClick = async(e:any) => {
  e.preventDefault();
  const id = Math.random();
  
  try {
    //if de textos
    if(nome && descricao && resumo && especie){
    //enviando imagens
    if(imag1){
    const name = imag1.name;
    const storageRef = ref(storage,`animais/${id}/${name}`);
    const uploadImage1 = uploadBytesResumable(storageRef, imag1);

    uploadImage1.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100

          setProgressUpload(progress) })
    setImag1(null) 
    }else{
        console.log('deu merda');
    }
    if(imag2){
        const name = imag2.name;
        const storageRef = ref(storage,`animais/${id}/${name}`);
        uploadBytes(storageRef, imag2);
        setImag1(null) 
        }else{
            console.log('deu merda');
        }
    if(imag3){
        const name = imag3.name;
        const storageRef = ref(storage,`animais/${id}/${name}`);
        uploadBytes(storageRef, imag3);
        setImag1(null) 
        }else{
            console.log('deu merda');
        }
    if(imag4){
    const name = imag4.name;
    const storageRef = ref(storage,`animais/${id}/${name}`);
     uploadBytes(storageRef, imag4);
    setImag1(null) 
    }else{
        console.log('deu merda');
    }

    //enviar texto
    addDoc(collection(db, 'animais'),{
       nome: nome,
       id: id,
       descricao: descricao,
       resumo: resumo,
       especie: especie,
    })
    setNome('');
    setDescricao(''); 
    setResumo('');   
    setEspecie(''); 
}else{
    alert('Porfavor preencha todos os campos')
}
  }catch (error){
    console.log(error);
  }
 

}


//pegar dados firebase

useEffect(()=>{

    const getText = async () => {
        const dataRef = collection(db, "animais");
        const getData = await getDocs(dataRef);


        const dadosDosPosts = await Promise.all(getData.docs.map(async (doc) => {
            const data = doc.data();

            // Referência para a pasta de imagens no Firebase Storage
            const imagensRef = ref(storage, `animais/${data.id}/`);

            // Lista todas as imagens dentro da pasta e obtém as URLs
            const listResult = await listAll(imagensRef);
            const imagensPromises = listResult.items.map(item => getDownloadURL(item));
            const imagens = await Promise.all(imagensPromises);
        
            return {
                id: data.id,
                nome: data.nome,
                resumo: data.resumo,
                descricao: data.descricao,
                especie: data.especie,
                imagens: imagens // Adiciona as imagens ao objeto animal
            } as Animais;
        }));

        setTexto(dadosDosPosts);
    };

    getText();
},[])


//excluir animal
const handleExcluir = async (id: number) => {
    try {

        //delete texto
        const querySnapshot = await getDocs(collection(db, 'animais'));

        querySnapshot.forEach(async (queryDocSnapshot) => {
            const docRef = doc(db, 'animais', queryDocSnapshot.id);
            const data = queryDocSnapshot.data();
            if (data.id === id) {
                await deleteDoc(docRef);
                console.log(`Documento com ID ${id} excluído.`);
            }
        });

    } catch (error) {
        console.error('Erro ao excluir documento:', error);
    }

            //delete images    
  try{
            const imagensRef = ref(storage, `animais/${id.toString()}/`);
            const listResult = await listAll(imagensRef);
           await Promise.all(listResult.items.map(async (item) => {
             await deleteObject(item);
            }));
            await deleteObject(imagensRef);
  }catch (error) {
    console.error('Erro ao excluir documento:', error);
  }

      window.location.reload()
};
     
//editar postagem
const editDoc = async (updateDocA : Animais)=>{
    try {

        //delete texto
        const querySnapshot = await getDocs(collection(db, 'animais'));

        querySnapshot.forEach(async (queryDocSnapshot) => {
            const docRef = doc(db, 'animais', queryDocSnapshot.id);
            const data = queryDocSnapshot.data();
            if (data.id === updateDocA.id) {
                const updateDada = {
                    nome: updateDocA.nome,
                    descricao: updateDocA.descricao,
                    resumo: updateDocA.resumo,
                    especie: updateDocA.especie
                }
               await updateDoc(docRef, updateDada);
               console.log(`Documento com ID ${updateDocA.id} atualizado com sucesso.`);
            }
        });

    } catch (error) {
        console.error('Erro ao excluir documento:', error);
    }
}

    return (
        <div>
            <div className="form">
                <form >
                    <div className='formTextInput'>
                        <input type="text"
                            placeholder="Nome do Animal"
                            onChange={(e) => setNome(e.target.value)}
                            value={nome} />

                        <input
                            type="text"
                            placeholder="Característica"
                            value={resumo}
                            onChange={(e) => setResumo(e.target.value)}
                            maxLength={20} />
                        <br/>
                        <select onChange={(e)=> setEspecie(e.target.value)}>
                            <option value=''>especie</option>
                            <option value="cachorro">Cachorro</option>
                            <option value="gato">Gato</option>
                        </select>

                    </div>

                    <div className="formTextArea">
                        <h1>Descrição principal</h1>
                        <textarea
                            onChange={(e) => setDescricao(e.target.value)}
                            value={descricao}
                        />
                    </div>
                    <div className="formImagens">
                        <h1>Escolher imagens</h1>
                        <input type="file" onChange={(files) => imagem1(files.target.files)} />
                        <input type="file" onChange={(files) => imagem2(files.target.files)} />
                        <input type="file" onChange={(files) => imagem3(files.target.files)} />
                        <input type="file" onChange={(files) => imagem4(files.target.files)} />
                        <progress value={progressUpload} />
                    </div>
                    <button type='submit' onClick={handleClick}>enviar</button>
                </form>
            </div>

            <div className='displayAnimaisSend'>
            {texto.map(animal => (
                <div className='displayAnimalsend' key={animal.id}>
                    <div className='buttonAnimalSend'>
                    <button onClick={()=>{
                      editDoc({nome: nomeEdit, descricao: descricaoEdit, especie: especieEdit, resumo: resumoEdit, id : animal.id})
                    }} >
                        🖊️
                    </button>
                    <button onClick={() => handleExcluir(animal.id)}>🗑️</button>                        
                    </div>
                    <div className='animalSendImages'>
                    {animal.imagens?.map((imagem, index) => (
                            <img key={index} src={imagem} alt={`Imagem de ${animal.nome}`} />
                        ))}          
                    </div>
                    <div className='displayAnimalSendText'>
                    <h2 >{animal.nome}</h2>
                    <input placeholder='Nome' type='text' onChange={(e)=>setNomeEdit(e.target.value)}/>
                    <p>
                    {animal.descricao}
                    </p>
                    <input placeholder='Caracteristica' type='text' onChange={(e)=>setResumoEdit(e.target.value)}/>
                    <p>{animal.resumo}</p>
                    <textarea placeholder='Descrição' onChange={(e)=>setDescricaoEdit(e.target.value)}/>
                        <p>{animal.especie}</p>
                     <select  onChange={(e)=>setEspecieEdit(e.target.value)}>
                            <option value="cachorro">Cachorro</option>
                            <option value="gato">Gato</option>
                      </select> 
                    </div>
                </div>
                ))}
            </div>

        </div>
    )
}