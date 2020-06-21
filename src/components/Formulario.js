import React, {Fragment, useState} from 'react';
import uuid from 'uuid/dist/v4';
// forma de documentar un proyecto
import PropTypes from 'prop-types';


const Formulario = ({crearCita}) => {
    // creamos el state para el formulario

    const [cita, actualizarCita]=useState({
        //creamos un objeto xq ahi tendra todos los campos que queremos
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    }) //lo creamos vacio xq se ira llenando cuando el usuario escriba en los inputs lo llenara la funcion actualizarCita


    // Nuevo state para la validacion
    const [error , actualizarError] = useState(false)  // si no pasa la validacion mandara true

     //agregamos un evento e
    //  e.target.name   indica en que campo estas escribiendo
    // e.target.vakue te da el valor de lo que escribes
    const actualizarState = e =>{
        actualizarCita({
            // usamos destructuring para llenar el state desde la funcion segunda de cita sin modificar directamente
            // para que no se reescriba en el objeto crearemos una copia y q se vaya llenando
            ...cita,
            [e.target.name] : e.target.value
            
        })
    } 

    //extraemos los valores para ponerlo en cada input y recibir desde app.js
    // llenamos el objeto con los valores de la cita
    const {mascota, propietario, fecha, hora, sintomas} = cita;


    //evento de enviar la cita
    const enviarCita= e =>{
        // para evitar enviar los parametros del query vacios creamos un evento por default
        e.preventDefault()
        
        // Pasos para el Formulario

        // Validar
        // .trim() si el usuario poen espacios en blanco al comienzo y al final los eliminara
        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            actualizarError(true)
            return;  //le damos un return para q no siga con lo demas
        }
        actualizarError(false)


        // Asignar un Id
        // le pasamos un id desde el plugin uuid
        cita.id= uuid()
         

        // Crear la cita
        // recibe el crearCita de app y le pasamos nuestra cita agregada
        crearCita(cita)


        // Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })


    }

    return ( 
        <Fragment> 
            <h2>Crear Cita</h2>
            {/* ponemos un ternario para la validacion */}
            { error ? <p className="alerta-error">Todos los campos son requeridos</p>   : null }

            <form
                onSubmit = {enviarCita}
            >
                <label htmlFor="mascota">Nombre Mascota</label>
                <input
                    type="text"
                    id="mascota"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    //creamos una funcion que cuando  escriba en el input ara un cambio
                    onChange={actualizarState}
                    value = {mascota}
                />
                
                <label htmlFor="propietario">Nombre Dueño</label>
                <input
                    type="text"
                    id="propietario"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño"
                    onChange={actualizarState}
                    value = {propietario}
                />
                <label htmlFor="fecha">Fecha</label>
                <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value = {fecha}
                />
                <label htmlFor="hora">Hora</label>
                <input
                    type="time"
                    id="hora"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value = {hora}
                />
                <label htmlFor="sintomas">Sintomas</label>
                <textarea
                    type="text"
                    id="sintomas"
                    name="sintomas"
                    className="u-full-width"
                    placeholder="Mencione sus sintomas"
                    onChange={actualizarState}
                    value = {sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
                
            </form>
        </Fragment>

     );
}



Formulario.propTypes = {
    // le indicamo que formulario recibe la funcion de crearcita y es obligatorio
    crearCita : PropTypes.func.isRequired
}
 
export default Formulario;