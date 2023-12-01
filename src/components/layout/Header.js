import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Header() {
  const { t, i18n } = useTranslation();
  const currentLanguage = useRef(i18n.language);

  useEffect(() => {
    const handleLanguageChange = () => {
      currentLanguage.current = i18n.language;
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  });

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="flex">
            <Link to="/" className="mr-4">
              <img
                src="/logo192.png"
                alt="Logo"
                className="header__logo"
                width="50"
                height="50"
              />
            </Link>
            <nav>
              <Link to="/">{t("nav.homepage")}</Link>
              <Link to="/contact">{t("nav.contact")}</Link>
              <Link to="/contact">{t("nav.about")}</Link>
              <div className="ml-4">
                {currentLanguage.current === "en" ? (
                  <button onClick={() => changeLanguage("fr")}>FR</button>
                ) : (
                  ""
                )}

                {currentLanguage.current === "fr" ? (
                  <button onClick={() => changeLanguage("en")}>EN</button>
                ) : (
                  ""
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
