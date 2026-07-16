type ToastType = "info" | "success" | "error";

class ToastService {
    private duration: number = 5000;
    private container: HTMLElement;

    constructor() {
        this.container = document.createElement('section');
        this.createToastContainer();
    }

    private createToastContainer() {
        this.container.className = "toast-container";
        document.body.append(this.container);
    }


    private displayToast(message: string, type: ToastType) {
        const toast = this.buildToastElement(type);
        this.appendMessage(toast, message);
        const progress = this.createProgressBar(toast);
        const animation = this.showToast(toast, progress);
        this.destroyToast(toast, animation);
    }

    private buildToastElement(type: ToastType) {
        const toast = document.createElement('div');
        toast.classList.add("toast", type);
        this.container.append(toast);
        return toast;
    }

    private appendMessage(toast: HTMLDivElement, message: string) {
        const messageContainer = document.createElement("div");
        messageContainer.className = "toast-message";
        messageContainer.textContent = message;
        toast.append(messageContainer)
    }

    private createProgressBar(toast: HTMLDivElement) {
        const progress = document.createElement('div');
        progress.classList.add("toast-progress");
        toast.append(progress);
        return progress;
    }

    private showToast(toast: HTMLDivElement, progress: HTMLDivElement) {
        requestAnimationFrame(() => toast.classList.add("show"));

        const animation = progress.animate(
            [
                { transform: "ScaleX(1)" },
                { transform: "ScaleX(0)" }
            ],
            {
                duration: this.duration,
                easing: "linear"
            }
        );

        setTimeout(() => {
            toast.classList.remove("show");
        }, this.duration);

        animation.onfinish = () => {
            progress.remove();
            setTimeout(() => {
                toast.remove();
            }, 300);
        }

        return animation;
    }

    private destroyToast(toast: HTMLDivElement, animation: Animation) {
        toast.addEventListener("click", () => {
            toast.classList.remove("show");
            setTimeout(() => {
                animation.cancel();
                toast.remove();
            }, 300);
        });
    }

    public error(message: string) {
        this.displayToast(message, "error");
    }

    public success(message: string) {
        this.displayToast(message, "success");
    }

    public info(message: string) {
        this.displayToast(message, "info");
    }
}

export const toast = new ToastService();