import React from "react";
import { useTranslation } from "react-i18next";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";

function PopupConfirm({ message, onCancel, onConfirm }) {
  const { t } = useTranslation();
  return (
    <div className="popup popup-confirm">
      <div className="popup__content">
        <button type="button" onClick={onCancel} className="popup__close">
          <Icon path={mdiClose} size={1} />
        </button>
        <p className="text-center">{message}</p>
        <div className="flex justify-center mt-2">
          <button onClick={onCancel} className="popup-confirm__cancel mr-1">
            {t("actions.cancel")}
          </button>
          <button onClick={onConfirm} className="popup-confirm__confirm ml-1">
            {t("actions.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopupConfirm;
