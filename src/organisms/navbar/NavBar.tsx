import React, { useEffect, useState } from 'react';
import './navbar.css';
import image from '../../assets/logo.jpg';
import Swal from 'sweetalert2';

const NavBar: React.FC = () => {
  const [userName, setUserName] = useState('');

  /* Maneja el nombre del usuario, busca en el storage y si no tiene setea uno random */
  useEffect(() => {
    const userNameStorage = localStorage.getItem('user');
    if (userNameStorage) {
      setUserName(userNameStorage);
    } else {
      const randomInt = Math.floor(Math.random() * (999 - 1 + 1)) + 1;
      const generateUserName = `usuario ${randomInt}`;
      setUserName(generateUserName);
      localStorage.setItem('user', generateUserName);
    }
  }, []);

  const handleClickUser = () => {
    Swal.fire({
      title: 'Ingrese un nombre',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setUserName(result.value);
        localStorage.setItem('user', result.value);
        Swal.fire({
          title: `${result.value} has cambiado tu nombre exitosamente.`,
          icon: 'success',
        });
      }
    });
  };
  return (
    <div className="container-navbar">
      <img src={image} alt="Logo reddit" className="image-navbar" />
      <input className="input-navbar" />
      <h3 className="user-navbar" onClick={handleClickUser}>
        {userName}
      </h3>
    </div>
  );
};

export default NavBar;
