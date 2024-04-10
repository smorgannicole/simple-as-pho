import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal'

const Menu = ({ plate, handleOrderAdd, index }) => {
  const { item, price, img, ingredientImg } = plate
  const [isHovered, setIsHovered] = useState(false)
  const [addHovered, setAddHovered] = useState(false)
  const [moreHovered, setMoreHovered] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const backgroundColors = ['#90EE90', '#F9C3BE', '#AED6F1', '#D8BFD8']

  const handleMoreInfoClick = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }
    
  return (
    <>
      <div className='help'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <div className={`${isHovered ? 'display-info' : 'hide-info'}`}>
          <span style={{ color: '#fff' }}>{item}</span>
          <br /> 
          <span style={{ color: '#fff' }}>Price: ${price}.00</span>
          <br /> 
          <div 
            onMouseEnter={() => setMoreHovered(true)}
            onMouseLeave={() => setMoreHovered(false)}
            onClick={handleMoreInfoClick}>
            <span style={{ color: '#fff' }} className={`${moreHovered ? 'more-hovered' : null}`}>
            More Info{moreHovered ? <FontAwesomeIcon icon={faUpRightFromSquare} size="sm" /> : null }
            </span>
          </div>
        </div>
        <img 
          className={`food-img ${isHovered ? 'food-img-hovered' : ''}`}
          alt='food item' 
          src={img} 
          style={{ backgroundColor: backgroundColors[index] }}>
        </img>
        <div className={`${isHovered ? 'cart-add-icon' : 'hide-info'}`}>
          <FontAwesomeIcon 
          style={{ 
            cursor: 'pointer', 
            transition: 'color 0.2s ease',
            color: addHovered ? '#121832' : '#fff',
            fontSize: '1.5vw' }} 
            onMouseEnter={() => setAddHovered(true)}
            onMouseLeave={() => setAddHovered(false)}
            onClick={() => handleOrderAdd(index, item, price)} 
            icon={faCartPlus} 
            size="xl" />
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Ingredient Modal'
        ariaHideApp={false}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(18, 24, 50, 0.8)'
          },
          content: {
            background: '#0000',
            outline: 'none',
            border: 'none',
            padding: '0px',
          }
        }}>
        <div className="ingreds-cont">
          <img className='ingreds' src={ingredientImg} alt='Ingredient' />
          <button className='close-modal' onClick={closeModal}>{`Close ${item}`}</button>
        </div>
      </Modal>
    </>
  )
}

export default Menu