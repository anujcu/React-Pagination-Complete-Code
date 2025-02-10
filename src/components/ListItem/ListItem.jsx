import React from 'react'

const ListItem = ({product}) => {
    const {images,title,description}=product;
  return (
    <div className='productItemr' >
        <img src={images} alt={title} height="80" width="80"/>
        <p>{description}</p>
    </div>
  )
}

export default ListItem