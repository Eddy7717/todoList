import Icon from "@mdi/react";
import { mdiEmoticonSadOutline } from "@mdi/js";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Error() {
  const { t } = useTranslation();
  return (
    <>
      <div className="error">
        <div className="container">
          <div className="py-3">
            <h1 className="text-7xl font-bold">{t("error.title")}</h1>
            <Icon
              path={mdiEmoticonSadOutline}
              size={10}
              className="mx-auto my-5"
            />
            <p className="text-3xl py-4">{t("error.message")}</p>
            <Link className="text-xl opacity-70 hover:underline" to="/">
              {t("error.link")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Error;
