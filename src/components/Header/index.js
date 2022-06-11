import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './styles.css';

export default function Header(){
    const reserveQtd = useSelector(state => state.reserve);

    return (
        <header className='container'>
            <Link to = "/">
                <img className='logo' src={logo} alt="Logo do projeto"/>
            </Link>

            <Link className = 'reserva' to = "/reservas">
                <div>
                    <strong>Minhas reservas</strong>
                    <span>{reserveQtd.length} Reservas</span>
                </div>
            </Link>
        </header>
    );
}