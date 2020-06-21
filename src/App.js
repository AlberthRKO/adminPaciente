import React, { Fragment, useState, useEffect } from 'react';

import Formulario from './components/Formulario';
import Cita from './components/Cita';


function App() {
  

  //creamos el arreglo de citas que se visualizaran cuando guarde

  const [citas, guardarCitas] = useState([])


  // use effect para realizar ciertas operaciones cuando el state cambia


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
 