import React, { Fragment, useState, useEffect } from 'react';

import Formulario from './components/Formulario';
import Cita from './components/Cita';


function App() {

  // Citas en localStorage
  // obtenemos la cita y si no hay nada comenzara con un arreglo vacio
  // parseamos el arreglo yta q solo lee strings
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))
  if (!citasIniciales) {
    citasIniciales = [];
  }




  //creamos el arreglo de citas que se visualizaran cuando guarde
  // como en el local storage empieza vacio se le pasa al listado de citas y si ya vienen con un valor ..comenzara desde ahi
  const [citas, guardarCitas] = useState(citasIniciales)


  // use effect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
    // cuando el state este por cambiar guardara la cita anterior
    // en caso que haiga una cita.. le pasamos al localStorage
    if (citasIniciales) {
      localStorage.setItem('citas' , JSON.stringify(citas))
    }
    // si no hay ..le pasamo un vacio
    else{
      localStorage.setItem('citas', JSON.stringify([]))
    }
    // al tener citas como depencia cunado vea un cambio pondra ese valor en localStorage
  }, [citas, citasIniciales])


  // funcion que tomara las citas actuales y agrege la nueva
  const crearCita = cita =>{
    guardarCitas([
      ...citas,
      cita
    ])
  }

  const eliminarCita = id =>{
    // obtenemos el id de la funcion que le mandamos a Cita y imprimos para ver resultados
    // console.log(id)
    // asemos un filter para q filtre todos los que son diferentes al id para conservarlos
    const nuevaCita = citas.filter( cita => cita.id !== id )
    guardarCitas(nuevaCita)
  }


  //mensaje condicional
  // console.log(citas.length); tamaño de las citas
  const titulo = citas.length === 0 ? 'No hay Citas' : ' Administra tus Citas' 

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita = {crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita 
              // a cita le pasamos los datos de id y la cita completa para q los reciba y los muestre
                key={cita.id}
                cita = {cita}
                eliminarCita = {eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
 