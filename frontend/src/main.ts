import "./styles/main.css";
import { getFiles } from "./api/file.api";
import { initPopUpController } from "./components/popupMenu";
import { initUploadFile } from "./components/uploadDialog";
import { initThemeController } from "./utils/themeManager";


async function initApp() {
    try {
        initThemeController();
        initPopUpController();
        await getFiles();
        initUploadFile();
    } catch (error) {
        console.error(error);
    }
}

initApp();