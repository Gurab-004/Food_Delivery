import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu'id='explore-menu'>
        <h1>Explore Our Menu</h1>
        <p className='explore-menu-text'>Discover flavors that excite! From comforting classics to bold new tastes, our menu has something for everyone. Dive in and find your next favorite dish.</p>
        <div className='explore-menu-list'>
            {menu_list.map((item,index) => {
                return(
                    <div onClick={() => setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} className='explore-menu-list-item' key={index}>
                        <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
      
    </div>
  )
}

export default ExploreMenu
