import { useEffect, useState } from "react"

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)
    const [callFetch, setCallFetch] = useState(null)


    //loading
    const [loading, setLoading] = useState(false)

    //tratando erros
    const [erro, setErro] = useState(null)

    const httpConfig = (data, method) => {
        if (method === 'POST') {
            setConfig({
                method,
                headers: {
                    'Content-type': 'aplication/json'
                },
                body: JSON.stringify(data)
            })
            setMethod(method)
        }

    }



    useEffect(() => {
        const fetchData = async () => {
            //loading
            setLoading(true)

            try {
                const res = await fetch(url)
                const json = await res.json()
                setData(json)
            } catch (error) {
                console.log(erro.message)
                setErro('Houve algum erro ao carregar os dados')
            }

            setLoading(false)
        }
        fetchData()
    }, [url, callFetch])




    //refatorando post

    useEffect(() => {
        if (method === 'POST') {
            const httpRequest = async () => {
                let fetchOptions = [url, config]

                const res = await fetch(...fetchOptions)

                const json = await res.json()

                setCallFetch(json)
            }
            httpRequest()
        }



    }, [config, method, url])

    return { data, httpConfig, loading, erro }
}