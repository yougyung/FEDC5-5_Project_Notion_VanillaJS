import { Popup } from "../../Popup.js";

export const enablePopupFeature = ($editor) => {
    const { $popup, checkSelectionAndDisplayPopup } = Popup();

    $editor.appendChild($popup);

    $editor.addEventListener("mouseup", () => {
        checkSelectionAndDisplayPopup();
    });

    $editor.addEventListener("keyup", () => {
        checkSelectionAndDisplayPopup();
    });
};
