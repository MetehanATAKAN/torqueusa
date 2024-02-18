import React from 'react'
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className={`container fluid`}>
            <div className='header' >
                <Link to={'/'}>
                <img src={require('../../images/torque-180.jpg')} alt="torque" />
                </Link>
                <Link to={'/basket'}>
                <div className='basket'><ShoppingCartOutlined  /></div>
                </Link>
            </div>
        </header>
      )
}

export default Header