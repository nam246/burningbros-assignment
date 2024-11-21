import { useState, useEffect, useContext } from "react";

import { Product as PRD } from '../type'

import Product from "../components/Product";

export default function Home() {

    const [products, setProducts] = useState<PRD[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [next, setNext] = useState(0);

    const [searchQuery, setSearchQuery] = useState<string>('');

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch(`https://dummyjson.com/products?limit=20&skip=${next}`)
            const data = await res.json()

            setProducts(prev => [...prev, ...data.products])
            setNext(current => current + 20)
        } catch (error: any) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
            return
        }
        fetchData();
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, [isLoading])

    const fetchSearchData = async (q: string) => {
        const res = await fetch(`https://dummyjson.com/products/search?q=${q}`);
        const data = await res.json();

        setProducts(data.products)
    }

    useEffect(() => {
        fetchSearchData(searchQuery);
    }, [searchQuery])

    return (
        <>
            <input className="search-bar" type="text" name="search" id="search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <section>
                <div className="products">
                    {products.map((product, index) => (
                        <Product key={index} product={product} />
                    ))}
                </div>
            </section>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
        </>
    )
}