import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className=""></div>
            <div className=""></div>
            <div className="text-right">
              <p className="text-sm">© Edouard Salembier</p>
              <p className="text-xs">{t("footer.by")} Edouard Salembier</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
