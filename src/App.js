import React, { useState, useEffect, Fragment } from "react";

const Cita = ({ cita, eliminarCita, index }) => {
  return (
    <div className="cita">
      <p>
        Mascota: <span>{cita.mascota}</span>
      </p>
      <p>
        Dueño: <span>{cita.propietario}</span>
      </p>
      <p>
        Fecha: <span>{cita.fecha}</span>
      </p>
      <p>
        Hora: <span>{cita.hora}</span>
      </p>
      <p>
        Síntomas: <span>{cita.sintomas}</span>
      </p>
      <button
        onClick={() => eliminarCita(index)}
        className="button eliminar u-full-width"
      >
        Eliminar X
      </button>
    </div>
  );
};

const Formulario = ({ agregarCita }) => {
  const stateInicial = {
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: ""
  };

  const [cita, actualizarCita] = useState(stateInicial);

  const handleChange = e => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // pasar la cita hacia el componente principal
    agregarCita(cita);
    // Reiniciar el state (reiniciar el form)
    actualizarCita(stateInicial);
  };

  return (
    <Fragment>
      <h2>Crear Cita</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={handleChange}
          value={cita.mascota}
        />

        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de la Mascota"
          onChange={handleChange}
          value={cita.propietario}
        />

        <label>Fecha</label>
        <input
          type="date"
          className="u-full-width"
          name="fecha"
          onChange={handleChange}
          value={cita.fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          className="u-full-width"
          name="hora"
          onChange={handleChange}
          value={cita.hora}
        />

        <label>Sintomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={handleChange}
          value={cita.sintomas}
        ></textarea>

        <button type="submit" className="button-primary u-full-width">
          Agregar
        </button>
      </form>
    </Fragment>
  );
};

const App = () => {
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));

  if (!citasIniciales) {
    citasIniciales = [];
  }

  const [citas, guardarCita] = useState(citasIniciales);
  console.log(citas);

  const agregarCita = cita => {
    guardarCita([...citas, cita]);
  };

  const eliminarCita = index => {
    const cita = citas.filter(item => item !== citas[index]);
    guardarCita(cita);
  };

  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem("citas"));

    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas]);

  /* el segundo parametro de useEffects es para que se ejecute solo cuando cambie "citas", y no ante cualquier otro cambio */

  const titulo =
    citas.length === 0 ? "No hay Citas" : "Administrar las Citas aquí";

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario agregarCita={agregarCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita, index) => (
              <Cita
                key={index}
                index={index}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
