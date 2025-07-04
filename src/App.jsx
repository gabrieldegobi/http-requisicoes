import { useEffect, useState } from 'react'
import './App.css'



const url = 'http://localhost:3000/products'

function App() {
  const [products, setProducts] = useState([])


  useEffect(() => {
    async function fecthData() {
      const res = await fetch(url)
      const data = await res.json()
      setProducts(data)
    }
    fecthData()
  }, [])


  console.log(products)


  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ul>
        {
          products.map((product)=>(
            <li key={product.id}>
              {product.name} - R$: {product.price}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
