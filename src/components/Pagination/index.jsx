import React, { useEffect, useState } from 'react'
import './index.css'
import ListItem from '../ListItem/ListItem'
import { PAGE_SIZE } from '../../assets/Constants/Constants';

const Pagination = () => {

    
    const [products,setProducts]=useState([]);
    const [currentPage,setCurretPage]=useState(0);
    const [pageSize,setPageSize]=useState(PAGE_SIZE);
    // Fetch Data 
    const fetchProducts= async()=>{
     const data= await  fetch('https://dummyjson.com/products?limit=0')
     const productsData=await data.json();
      setProducts(productsData.products);
    
    }
    // use Effect Hook
    useEffect(()=>{
        fetchProducts();
    },[])

    const totalProducts=products.length;
    const noOfPages=Math.ceil(totalProducts/pageSize);
    const startSize=currentPage * pageSize;
    const endSize=startSize + pageSize;
    const handlePageChange=(n)=>{
        setCurretPage(n);
    }
    const handlePaginationNext=()=>{
            setCurretPage((prev=>prev+1));
    }
    const handlePaginationPrev=()=>{
        setCurretPage((prev=>prev-1));
    }
    const handleChangePageSize=(e)=>{
        setPageSize(e.target.value);
    }
  return (
    <>
        <div>Pagination Component</div>
        <div className='paginationControls'>
        <div className='paginationControlSelect'>
            <label>Results: {currentPage}-{noOfPages} of {totalProducts} </label>
        </div>
            <div className='paginationControlBtns'>
             {/* Previous button  */}
            <button className='paginationArrow' onClick={handlePaginationPrev} disabled={currentPage===0}>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.507129 6.39844L6.10713 0.698438C6.50713 0.298438 7.10713 0.298438 7.50713 0.698438C7.90713 1.09844 7.90713 1.69844 7.50713 2.09844L2.60713 6.99844L7.50713 11.8984C7.70713 12.0984 7.80713 12.2984 7.80713 12.5984C7.80713 13.1984 7.40713 13.5984 6.80713 13.5984C6.50713 13.5984 6.30713 13.4984 6.10713 13.2984L0.407128 7.59844C0.107128 7.39844 0.107129 6.79844 0.507129 6.39844Z" fill="black"/>
                </svg>
            </button>
            {/* creating an array with index of number of page */}
            {[...Array(noOfPages).keys()].map((number)=><button type='button' 
            key={number} 
            className={`paginationButtons ${currentPage==number?'active':''}`} 
            onClick={()=>handlePageChange(number)}>
                {number}</button>
            )}
        {/* Next Button */}
        <button className='paginationArrow' onClick={handlePaginationNext}  disabled={currentPage==noOfPages-1}>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.49287 6.39844L1.89287 0.698438C1.49287 0.298438 0.892871 0.298438 0.492871 0.698438C0.0928713 1.09844 0.0928713 1.69844 0.492871 2.09844L5.39287 6.99844L0.492871 11.8984C0.292871 12.0984 0.192871 12.2984 0.192871 12.5984C0.192871 13.1984 0.592871 13.5984 1.19287 13.5984C1.49287 13.5984 1.69287 13.4984 1.89287 13.2984L7.59287 7.59844C7.89287 7.39844 7.89287 6.79844 7.49287 6.39844Z" fill="black"/>
                </svg>
        </button>
        </div>
        <div className='paginationControlSelect'>
            <label>Page Size: </label>
            <select className='selectPageSize' onChange={handleChangePageSize}>
                <option value='10' selected>10</option>
                <option value='20'>20</option>
                <option value='30'>30</option>
            </select>
        </div>
        </div>
            {
                !products.length?<p>Items not Found</p>
                :<div className='productsWrapper'>
                {
                    products.slice(startSize,endSize).map((product)=>(
                        <ListItem product={product} key={product.id} />
                    ))
                }
                </div>
            }
    </>
  )
}

export default Pagination