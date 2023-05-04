import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import DataTable , { createTheme } from 'react-data-table-component'
import Layout from './compo/layout'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React , { useEffect,useState } from 'react'



const inter = Inter({ subsets: ['latin'] })

 export default function Home() {

  const [product, setProduct] = useState([])
  const [search , setSearch] = useState(" ");
  const [allProducts ,setallProducts] = useState([]);
  const getProducts = async () => {
         const res = await axios.get(`https://api.escuelajs.co/api/v1/products/`)
        setProduct(res.data)
        setallProducts(res.data)
        console.log(product)
  }

  const edit = () => {
    toast.warn("Edit is success !" , {
      theme : "colored",
      autoClose: 1000,
      position: "bottom-right",
    });
  };

  const deleted = () => {
    toast.error("Delete is success !" , {
      theme : "colored",
      autoClose: 1000,
      position: "bottom-right",
    });
  };

  const columns= [
    {
        name: "Product Name",
        selector: row => row.title,
        sortable: true,
    },
    {
        name: "Price",
        selector: row => row.price,
    },
    {
      name: "Category",
      selector: row => row.category.name,
  },
    {
        name: "Photo",
        selector: row => <img src={row.images} width={100} />
        ,
    },
    {
      name: "Action Edit",
      cell: (row) =>  <button className='btn btn-warning' onClick={edit}>Edit</button>
      ,
    },
    {
      name: "Action Delete",
      cell: (row) =>  <button className='btn btn-danger' onClick={deleted}>Delete</button>
      ,
    },
]

  useEffect(() => {
      getProducts();
  },[])

  useEffect(() => {
      const result = product.filter(products => {
        return products.title.toLowerCase().match(search.toLowerCase());
      });
      setallProducts(result);
  },[search])


  return (
    <Layout className='bg-white'>
    <main className='container bg-light '>
        <h1> Products Collection in Table</h1>
        <DataTable
        title='All Products List'
        columns={columns}
        data={allProducts}
        pagination
        fixedHeader
        fixedHeaderScrollHeight='500px'
        subHeader
        subHeaderComponent={
          <input type='text'
           placeholder='Search Here'
            className='form-control w-25'
            value={search}
            onChange={(e) => setSearch(e.target.value)}/>
        }
        />
        <ToastContainer/>
        </main>
        </Layout>
   

    
  )
}


