import React from 'react'
import restaurant from '../img/restaurant.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'

const Blurb = () => {
  return (
    <>
      <div className='restaurant-cont'>
        <img className='restaurant-img' src={restaurant} alt="Simple as Pho storefront" />
      </div>
      <p className='blurb'>Experience the joy of simplicity in every bowl. We invite you to savor the rich aromas, vibrant flavors, and warm hospitality that define Vietnamese cuisine. Come and discover why sometimes, the simplest things are the most extraordinary.</p>
      <div className="socials">
        <p><span style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faInstagram} /> simple_as_pho</span></p>
        <p><span style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faXTwitter} /> restaurant_simple_pho</span></p>
      </div>
    </>
  )
}

export default Blurb