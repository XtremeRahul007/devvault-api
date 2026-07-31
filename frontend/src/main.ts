import "./styles/main.css";
import { initPopUpController } from "./components/popupMenu";
import { initUploadFile } from "./components/uploadDialog";
import { initThemeController } from "./utils/themeManager";
import { fileListRenderingService } from "./services/fileService";
import { initMultiSelect } from "./components/multiFileSelection";


async function initApp() {
    try {
        initThemeController();
        initPopUpController();
        await fileListRenderingService();
        initUploadFile();
        initMultiSelect();
    } catch (error) {
        console.error(error);
    }
}

initApp();
