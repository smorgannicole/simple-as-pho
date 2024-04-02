import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Order = ({ foodObj, index, handleDelete }) => {

  const taxCalc = (price) => {
    return (price * 0.075).toFixed(2)
  }

  const handleClick = () => {
    handleDelete(index)
  }

  return (
    <div className='order-cont'>
      <div className='food-on-order'>
        <div>{foodObj.item} ${foodObj.price}.00</div>
        <div>Tax: ${taxCalc(foodObj.price)}</div>
      </div>
      <div >
        <FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={handleClick} icon={faTrash} size="sm" />
      </div>
    </div>
  )
}

export default Order
