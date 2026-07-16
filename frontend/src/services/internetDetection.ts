import { toast } from "./toastService";

window.addEventListener("online", () => toast.success("Back to online."));
window.addEventListener("offline", () => toast.success("you're offline."));