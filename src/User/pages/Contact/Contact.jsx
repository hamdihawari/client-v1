import React from 'react'
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import style from './style.module.css'

const Contact = () => {

  const schema = yup.object().shape({
    firstname: yup.string().required("your First Name is required!"),
    lastname: yup.string().required("your Last Name is required!"),
    email: yup.string().email().required(),
    message: yup.string().required("type your message please!"),
    /* age: yup.number().positive().integer().min(18) .required(), */
    /* password: yup.string().min(4).max(16).required() */
    /* confirmPassword: yup.string().oneOf([yup.ref("password"), null]).required */
  })
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      message: ""
      /* age: "", */
    }
  });

  const submitForm = (data) => {
    console.log(data)
    reset()
  }
  return (
    <>
      <div className={style.contactContainer}>
        <div className={style.formHeader}>
          <h1>Get in touch!</h1>
          <p> If you have any quastion please send me an Email, I'll replay ass soon as possible:
            <Link id={style.link} to="/contact"><strong> hamdi.hawari@gmx.com</strong></Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(submitForm)}>
          <label name='firstname'>First Name:</label>
          <input type="text" id={style.firstname} control={control} {...register("firstname")} />
          <span id={style.err}>{errors?.firstname?.message}</span>

          <label name='lastname'>Last Name:</label>
          <input type="text" id={style.lastname} control={control} {...register("lastname")} />
          <span id={style.err}>{errors?.lastname?.message}</span>

          <label name='email'>Email:</label>
          <input type="email" id={style.email} control={control} {...register("email")} />
          <span id={style.err}>{errors?.email?.message}</span>

          <label name='message'>Message!</label>
          <textarea type="text" id={style.message} control={control} {...register("message")} />
          <span id={style.err}>{errors?.message?.message}</span>

          {/* <label name='age'>Age:</label>
          <input type="number" id={style.age} {...register("age")} /> */}

          <button className={style.submit}>Submit</button>

        </form>
        
      </div>
      
    </>
  )
}
export default Contact

/* import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import style from './style.module.css'

const Contact = () => {
  const [firstname, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const onSubmite = (e) => {
    e.preventDefault();
  }

  const submitHandler = () => {
    console.log("First Name:" + firstname, "Last Name: " + lastname, "Email:" + email, "Message " + message)
  }
  return (
    <>
      <div className={style.contactContainer}>
        <div className={style.formHeader}>
          <h1>Get in touch!</h1>
          <p> If you have any quastion please send me an Email, I'll replay ass soon as possible:
            <Link id={style.link} to="/contact"><strong> hamdi.hawari@gmx.com</strong></Link>
          </p>
        </div>

        <form onSubmit={onSubmite}>
          <label>First Name:</label>
          <input className={style.input} type="text" firstname="firstname" onChange={(e) => {
            setName(e.target.value)
          }} />

          <label>Last Name:</label>
          <input type="text" lastname="lastname" onChange={(e) => {
            setLastname(e.target.value)
          }} />

          <label>Email:</label>
          <input type="text" email="email" onChange={(e) => {
            setEmail(e.target.value)
          }} />

          <label>Message!</label>
          <textarea message="message" onChange={(e) => {
            setMessage(e.target.value)
          }} />

        </form>
        <button className={style.submit} type="submit" onClick={submitHandler}>Submit</button>
      </div>

    </>
  )
}
export default Contact */