import React, { useState } from 'react';
import style from './style.module.css'
import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import TranslateIcon from '@mui/icons-material/Translate';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [languageToggle, setLanguageToggle] = useState(false)
  const toggleLanguage = () => {
    setLanguageToggle(!languageToggle);
  };

    return (
    <div className={style.LanguageSelector}>
      <div className={style.btn}>
        <IconButton className={style.languageIcon}  onClick={toggleLanguage}>
          <TranslateIcon style={{ color: '#000000', fontSize: '26px' }} />
        </IconButton>
      </div>
      <div className={style.controll}>
        {languageToggle && (
          <nav className={style.languageNav}>
            <Link className={style.languageLink} onClick={() => {i18n.changeLanguage('de'); toggleLanguage('de')}}>Deutsch</Link>  {/* onClick={() => {i18n.changeLanguage('de');  */}
            <Link className={style.languageLink} onClick={() => {i18n.changeLanguage('en'); toggleLanguage('en')}}>English</Link>
            <Link className={style.languageLink} onClick={() => {i18n.changeLanguage('ar'); toggleLanguage('ar')}}>عربي</Link>
          </nav>
        )}
      </div>
    </div>
  );
}

export default LanguageSwitcher;