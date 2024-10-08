import { useContext } from "react";
import { useTranslation } from 'react-i18next';
import { AboutContext } from '../../Context/AboutProvider.jsx';
import style from './style.module.css';
import rtlStyle from './rtl.module.css';

const AboutComponent = () => {
    const { aboutData, translationData, loading, error } = useContext(AboutContext);
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const currentLanguageTranslations = translationData.filter(item => item.language === i18n.language);

    return (
        <div className={style.about}>
            {aboutData ? (
                <div className={style.aboutContainer}>
                    <img src={aboutData.photo} className={style.personal} alt="personal photo" />
                    <div className={`${style.containerText} ${isArabic ? rtlStyle.containerText : ""}`}>
                        {currentLanguageTranslations.length > 0 ? (
                            currentLanguageTranslations.map(item => (
                                <div key={item.id}>
                                    <h3 className={`${style.title} ${isArabic ? rtlStyle.title : ""}`}>
                                        {t(item.title)} &#128515;
                                    </h3>
                                    <p className={style.description}>{t(item.description)}</p>
                                </div>
                            ))
                        ) : (
                            <p>{t('no_translation_available')}</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>{t('no_data_available')}</p>
            )}
        </div>
    );
};

export default AboutComponent;