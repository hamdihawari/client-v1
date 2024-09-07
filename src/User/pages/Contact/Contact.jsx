import React, { useState } from 'react';
import style from './style.module.css';
import rtlStyle from './rtl.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const postContactUrl = "http://localhost:8080/contact";

    const isArabic = currentLanguage === 'ar';

    // Statische Daten basierend auf der aktuellen Sprache
    const contactData = {
        en: {
            id: 5000,
            firstname: "First Name:",
            lastname: "Last Name:",
            email: "Email:",
            message: "Message!",
            title: "Get in touch!",
            description: "If you have any question please email me, I'll reply as soon as possible:",
            submit: "Submit"
        },
        de: {
            id: 5000,
            firstname: "Vorname:",
            lastname: "Nachname:",
            email: "Email:",
            message: "Nachricht!",
            title: "In Kontakt kommen!",
            description: "Falls Sie eine Frage stellen möchten, senden Sie mir bitte eine E-Mail. Ich werde so schnell wie möglich antworten:",
            submit: "Absenden"
        },
        ar: {
            id: 5000,
            firstname: "الإسم الأول:",
            lastname: "اسم العائلة:",
            email: "أيميل:",
            message: "رسالة!",
            title: "تواصل معنا",
            description: ":إذا كان لديك أي سؤال، يرجى مراسلتي عبر البريد الإلكتروني وسأرد في أقرب وقت ممكن",
            submit: "إرسال"
        }
    };

    // Dynamisches Yup-Validierungsschema basierend auf der Sprache
    const schema = yup.object().shape({
        firstname: yup.string().required(i18n.t("validation.firstname")),
        lastname: yup.string().required(i18n.t("validation.lastname")),
        email: yup.string().email(i18n.t("validation.invalidEmail")).required(i18n.t("validation.email")),
        message: yup.string().required(i18n.t("validation.message")),
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            message: ""
        }
    });

    const submitForm = async (formData) => {
        try {
            const response = await axios.post(postContactUrl, formData);
            console.log("Form submission successful:", response);
            reset(); // Formular zurücksetzen nach erfolgreicher Einsendung
        } catch (error) {
            if (error.response) {
                console.error(`Submission failed: ${error.response.data.message || "Unknown error"}`);
            } else if (error.request) {
                console.error("No response from server. Please check your connection.");
            } else {
                console.error("An error occurred: " + error.message);
            }
        }
    };

    const renderInput = (name, type = "text", label) => (
        <>
            <label htmlFor={name}>{label}</label>
            {type === "textarea" ? (
                <textarea id={name} {...register(name)} />
            ) : (
                <input type={type} id={name} {...register(name)} />
            )}
            <span id={style.err}>{errors?.[name]?.message}</span>
        </>
    );

    const contact = contactData[currentLanguage];

    return (
        <div className={style.contact}>
            <div className={style.contactContainer}>
                <div className={`${style.formHeader} ${isArabic ? rtlStyle.formHeader : ''}`}>
                    <h1>{contact.title}</h1>
                    <p>
                        {contact.description}
                        <Link id={style.link} to="/contact" className={`${style.link} ${isArabic ? rtlStyle.link : ''}`}>
                            <strong>info@hamdihawari.com</strong>
                        </Link>
                    </p>
                </div>

                <form onSubmit={handleSubmit(submitForm)} className={`${style.form} ${isArabic ? rtlStyle.form : ''}`}>
                    {renderInput("firstname", "text", contact.firstname)}
                    {renderInput("lastname", "text", contact.lastname)}
                    {renderInput("email", "email", contact.email)}
                    {renderInput("message", "textarea", contact.message)}

                    <button type="submit" className={style.submit}>{contact.submit}</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;

/*
// Contact.jsx
import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import rtlStyle from './rtl.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { i18n } = useTranslation();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const currentLanguage = i18n.language;
    const contactDataUrl = `http://localhost:8080/contact/language/${currentLanguage}`;
    const postContactUrl = "http://localhost:8080/contact";

    const isArabic = currentLanguage === 'ar';

    // Dynamisches Yup-Validierungsschema basierend auf der Sprache
    const schema = yup.object().shape({
        firstname: yup.string().required(i18n.t("validation.firstname")),
        lastname: yup.string().required(i18n.t("validation.lastname")),
        email: yup.string().email(i18n.t("validation.invalidEmail")).required(i18n.t("validation.email")),
        message: yup.string().required(i18n.t("validation.message")),
    });

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            message: ""
        }
    });

    const submitForm = async (formData) => {
        try {
            const response = await axios.post(postContactUrl, formData);
            console.log("Form submission successful:", response);
            reset(); // Formular zurücksetzen nach erfolgreicher Einsendung
        } catch (error) {
            if (error.response) {
                setError(`Submission failed: ${error.response.data.message || "Unknown error"}`);
            } else if (error.request) {
                setError("No response from server. Please check your connection.");
            } else {
                setError("An error occurred: " + error.message);
            }
        }
    };

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const response = await axios.get(contactDataUrl);
                if (isMounted) {
                    setData(response.data);
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Error fetching data:", error);
                    setError("Failed to load data. Please try again later.");
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [currentLanguage]); // Aktualisiere bei Sprachwechsel

    const renderInput = (name, type = "text", label) => (
        <>
            <label htmlFor={name}>{label}</label>
            {type === "textarea" ? (
                <textarea id={name} {...register(name)} />
            ) : (
                <input type={type} id={name} {...register(name)} />
            )}
            <span id={style.err}>{errors?.[name]?.message}</span>
        </>
    );

    if (error) {
        return <p>{error}</p>;
    }

    if (data.length === 0) {
        return <p>No data available</p>;
    }

    return (
        <div className={style.contact}>
            {data.map((item) => (
                <div key={item.id} className={style.contactContainer}>
                    <div className={`${style.formHeader} ${isArabic ? rtlStyle.formHeader : ''}`}>
                        <h1>{item.title}</h1>
                        <p>
                            {item.description}
                            <Link id={style.link} to="/contact" className={`${style.link} ${isArabic ? rtlStyle.link : ''}`}>
                                <strong>info@hamdihawari.com</strong>
                            </Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(submitForm)} className={`${style.form} ${isArabic ? rtlStyle.form : ''}`}>
                        {renderInput("firstname", "text", item.firstname)}
                        {renderInput("lastname", "text", item.lastname)}
                        {renderInput("email", "email", item.email)}
                        {renderInput("message", "textarea", item.message)}

                        <button type="submit" className={style.submit}>{item.submit}</button>
                    </form>
                </div>
            ))}
        </div>
    );
};

export default Contact;
*/
