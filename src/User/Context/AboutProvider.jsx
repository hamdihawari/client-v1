import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export const AboutContext = createContext();

// eslint-disable-next-line react/prop-types
const AboutProvider = ({ children }) => {
    const [aboutData, setAboutData] = useState(null);
    const [translationData, setTranslationData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { i18n } = useTranslation(); // Get i18n instance
    const aboutDataUrl = "http://localhost:8080/about_me"; // URL for about data
    const translationDataUrl = "http://localhost:8080/about_me_translation"; // URL for translation data

    // Fetch about data only once on component mount
    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const aboutRes = await axios.get(aboutDataUrl);
                setAboutData(aboutRes.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAboutData();
    }, [aboutDataUrl]);

    // Fetch translation data based on current language
    useEffect(() => {
        const fetchTranslationData = async () => {
            try {
                setLoading(true); // Set loading state before fetching
                // Fetch data based on current language
                const translationRes = await axios.get(`${translationDataUrl}?lang=${i18n.language}`);
                setTranslationData(translationRes.data); // Update translation data
            } catch (err) {
                setError(err); // Handle error
            } finally {
                setLoading(false); // Reset loading state
            }
        };

        fetchTranslationData();
    }, [i18n.language, translationDataUrl]); // Fetch when language changes

    return (
        <AboutContext.Provider value={{ aboutData, translationData, loading, error }}>
            {children}
        </AboutContext.Provider>
    );
};

export default AboutProvider;
