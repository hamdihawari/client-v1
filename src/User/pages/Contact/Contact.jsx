import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import style from './style.module.css'
import rtlStyle from './rtl.module.css'

import { useTranslation } from 'react-i18next'
import axios from 'axios'

const Contact = () => {

  const { i18n, t } = useTranslation();
  const [data, setData] = useState([])
  const currentLanguage = i18n.language
  const contactDataUrl = "http://localhost:9000/contactData"
  const isArabic = currentLanguage === 'ar'
  const [labels, setLabels] = useState({});

  const schema = yup.object().shape({
    firstname: yup.string().required("your First Name is required!"),
    lastname: yup.string().required("your Last Name is required!"),
    email: yup.string().email().required(),
    message: yup.string().required("type your message please!"),
  })

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      message: ""
    }
  });

  const submitForm = (data) => {
    console.log(data)
    reset()
  }

  useEffect(() => {
    axios.get(contactDataUrl)
      .then((res) => {
        console.log('Response data:', res.data);
        setData(res.data[currentLanguage]);
        /* setLabels(res.data.contactData[currentLanguage][0]); */
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentLanguage]);
  { console.log(data) }

  return (
    <>
    <div className={style.contact}>
      {data.map((data) => {
        return (
          <div key={data.id} className={style.contactContener}>

            <div className={`${style.formHeader} ${isArabic && rtlStyle.formHeader}`}>
              <h1>{data.title}</h1>
              <p> {data.description}
                <Link id={style.link} to="/contact" 
                className={`${style.link} ${isArabic && rtlStyle.link}`}>
                  <strong>hamdi.hawari@gmx.com</strong></Link>
              </p>
            </div>

            <form onSubmit={handleSubmit(submitForm)}>
              <label name="firstname">First Name:</label>
              <input type="text" id={style.firstname} control={control} {...register("firstname")} />
              <span id={style.err}>{errors?.firstname?.message}</span>

              <label name="lastname">Last Name:</label>
              <input type="text" id={style.lastname} control={control} {...register("lastname")} />
              <span id={style.err}>{errors?.lastname?.message}</span>

              <label name='email'>Email:</label>
              <input type="email" id={style.email} control={control} {...register("email")} />
              <span id={style.err}>{errors?.email?.message}</span>

              <label name='message'>Message!</label>
              <textarea type="text" id={style.message} control={control} {...register("message")} />
              <span id={style.err}>{errors?.message?.message}</span>

              <button className={style.submit}>Submit</button>

            </form>
          </div>
        )
      })}
    </div>
    </>
  )
}
export default Contact