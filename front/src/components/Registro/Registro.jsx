import React, { useState, useContext } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { environment } from "../../constants";
import "./Registro.css";
import { registerUser } from "../../api";

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

const PasswordInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [showPass, setShowPass] = useState(false);
  const isBad = meta.touched && meta.error;

  return (
    <div className="form-group form-group-pass">
      <label className="label-required" htmlFor={props.id}>
        {label}
      </label>
      <input
        className={"text-input input" + (isBad ? " input-feedback" : "")}
        {...field}
        {...props}
        type={showPass ? "text" : "password"}
      />
      <i
        className={
          "show-pass-icon " + (showPass ? "far fa-eye" : "far fa-eye-slash")
        }
        onClick={() => setShowPass(!showPass)}
        title="Mostrar contraseña"
      ></i>

      {isBad && <small className="small-feedback">{meta.error}</small>}
    </div>
  );
};

function Registro() {
  const history = useHistory();
  const [badRequestMsg, setBadRequestMsg] = useState("");

  return (
    <div className="contenedor-registro">
      <Formik
        initialValues={{
          userName: "",
          email: "",
          password: "",
          repassword: "",
          universidad: "",
        }}
        validationSchema={Yup.object({
          userName: Yup.string().required("Este campo es obligatorio"),
          universidad: Yup.string().required("Este campo es obligatorio"),
          email: Yup.string()
            .email("El email es inválido")
            .required("Este campo es obligatorio"),
          password: Yup.string()
            .min(6, "La contraseña debe tener más de 6 caracteres")
            .required("Este campo es obligatorio"),
          repassword: Yup.string()
            .min(6, "La contraseña debe tener más de 6 caracteres")
            .required("Este campo es obligatorio")
            .oneOf(
              [Yup.ref("password"), null],
              "Las contraseñas deben ser iguales"
            ),
        })}
        onSubmit={async (values) => {
          // Valores capturados del form
          const usuario = {
            username: values.userName,
            email: values.email,
            contrasena: values.password,
            universidad: values.universidad,
          };

          registerUser(usuario);
          history.push("/");
        }}
      >
        <Form className="form-registro">
          <h1>Crear cuenta</h1>

          <div className="double-form-group">
            <TextInput
              label="Nombre de Usuario"
              name="userName"
              type="text"
              id="userName"
              placeholder="Ingrese su usuario"
            />
            <TextInput
              label="Correo Electrónico"
              name="email"
              type="email"
              id="email"
              placeholder="Ingrese su correo electrónico"
            />
          </div>
          <TextInput
            label="Universidad"
            name="universidad"
            type="text"
            id="universidad"
            placeholder="Ingrese su universidad"
          />
          <PasswordInput
            label="Contraseña"
            name="password"
            id="password"
            placeholder="Ingrese su contraseña"
          />
          <TextInput
            label="Confirmar contraseña"
            name="repassword"
            type="password"
            id="repassword"
            placeholder="Repita su contraseña"
          />

          {badRequestMsg && (
            // si badRequestMsg != "", hay msg de error del back
            <p className="form-feedback">{badRequestMsg}</p>
          )}

          <button className="btn btn-primario btn-sm" type="submit">
            Registrarse
          </button>

          <p className="text-muted">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="link">
              Iniciar sesión
            </Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
}

export default Registro;
