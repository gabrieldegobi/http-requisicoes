import { useEffect, useState } from 'react'
import style from './App.module.css'
//custom hook
import { useFetch } from './hooks/useFetch'





const url = 'http://localhost:3000/products'

function App() {
  const [products, setProducts] = useState([])

  //custom hook
  const { data: items, httpConfig, loading,erro } = useFetch(url)

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')


  /*
    //1- RESGATANDO DADOS 
    useEffect(() => {
      async function fecthData() {
        const res = await fetch(url)
        const data = await res.json()
        setProducts(data)
      }
      fecthData()
    }, [])
  
  */


  //ADD DE PRODUTOS
  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {
      //como os states tem o mesmo nome dos objetos
      //eu nao preciso colocar a chave e o valor, podemos resumir
      name,
      price
    }


    /*
        //REQUISIÇÃO POST
        const res = await fetch(url, {
          method: "POST", //AQUI COLOCAMOS O METODO DA REQUISIÇÃO, DIFERENTE DO GET QUE JA VEM PADRÃO
          headers: {//CABECALHO DA REQUISIÇÃO
            "Content-Type": "aplication/json"
          },
          body: JSON.stringify(product),
        })
    
    
        // CARREGAMENTO DINAMICO
        const addedProduct = await res.json()
    
        setProducts((prevProducts) => [...prevProducts, addedProduct])
        console.log(products)*/

    //refatorando post

    httpConfig(product, "POST")

    setName('')
    setPrice('')


  }


  return (
    <div>
      <h1>Lista de Produtos</h1>
      {
        loading && <h2>Carregando Dados</h2>
      }

      <ul>
        {items &&
          items.map((product) => (
            <li key={product.id}>
              {product.name} - R$: {product.price}
            </li>
          ))
        }
      </ul>
      <div className={style.add_product}>
        <form onSubmit={handleSubmit}>
          <label >
            Nome:
            <input
              type="text"
              value={name}
              name='name'
              onChange={(e) => setName(e.target.value)} />
          </label>
          <label >
            Preço:
            <input
              type="number"
              value={price}
              name='price'
              onChange={(e) => setPrice(e.target.value)} />
          </label>
          {/*loading no post */}
          {!loading&& <input type="submit" value='criar' />}
          {loading&& <input type="submit" disabled value='Aguarde' />}
          
        </form>
      </div>
    </div>
  )
}

export default App
