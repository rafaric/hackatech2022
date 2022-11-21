import React, { useState } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { environment } from "../../constants";
import "./FormCrearReview.css";

const TextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  const [field, meta] = useField(props);
  const isBad = meta.touched && meta.error;

  return (
    <div className="form-group">
      <label className="label-required" htmlFor={props.id}>
        {label}
      </label>
      <input
        className={"text-input input" + (isBad ? " input-feedback" : "")}
        {...field}
        {...props}
      />

      {isBad && <small className="small-feedback">{meta.error}</small>}
    </div>
  );
};

const TextArea = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  const [field, meta] = useField(props);
  const isBad = meta.touched && meta.error;

  return (
    <div className="form-group double-form-group">
      <label className="label-required" htmlFor={props.id}>
        {label}
      </label>
      <textarea
        className={"text-input input text-area" + (isBad ? " input-feedback" : "")}
        {...field}
        {...props}
      ></textarea>

      {isBad && <small className="small-feedback">{meta.error}</small>}
    </div>
  );
};

function FormCrearReview() {
  const { BASE_URL } = environment;
  const history = useHistory();
  const [badRequestMsg, setBadRequestMsg] = useState("");

  return (
    <div className="contenedor-form">
      <Formik
        initialValues={{
          carrera: "",
          descripcion: "",
          nivelCurso: "",
          dificultad: "",
        }}
        validationSchema={Yup.object({
          carrera: Yup.string().required("Este campo es obligatorio"),
          descripcion: Yup.string().required("Este campo es obligatorio"),
          nivelCurso: Yup.number().required("Este campo debe ser un número"),
          dificultad: Yup.number()
            .required("Debe ser un número entre 1 y 5")
            .oneOf([1, 2, 3, 4, 5], "Valor entre 1 y 5"),
        })}
        onSubmit={async (values) => {
          // Valores capturados del form
          const usuario = {
            carrera: values.carrera,
            descripcion: values.descripcion,
            nivelCurso: values.nivelCurso,
            dificultad: values.dificultad,
          };
        }}
      >
        <Form className="form-crear-review">
          <h1>Nueva Reseña</h1>

          <TextInput
            label="Carrera"
            name="carrera"
            type="text"
            id="carrera"
            placeholder="Ingrese su carrera"
          />
          <div className="double-form-group">
            <TextInput
              label="Año que está cursando"
              name="nivelCurso"
              type="number"
              id="nivelCurso"
              placeholder="Ingrese el año"
            />
            <TextInput
              label="Dificultad de la carrera"
              name="dificultad"
              type="number"
              id="dificultad"
              placeholder="Dificultad que considera"
            />
          </div>

          <TextArea
            label="Descripción"
            name="descripcion"
            id="descripcion"
            rows="20"
            defaultValue=""
            placeholder="Redacte su reseña..."
            maxLength="2000"
          ></TextArea>

          {badRequestMsg && (
            // si badRequestMsg != "", hay msg de error del back
            <p className="form-feedback">{badRequestMsg}</p>
          )}

          <button className="btn btn-primario btn-sm" type="submit">
            Crear nueva reseña
          </button>

        </Form>
      </Formik>
    </div>
  );
}

export default FormCrearReview;
