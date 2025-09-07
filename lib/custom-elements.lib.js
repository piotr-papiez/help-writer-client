export default function registerCustomElements() {
    if (typeof window !== "undefined" && !customElements.get("v-btn")) {
        class VBtn extends HTMLElement {
            constructor() {
                super();
            }

            connectedCallback() {
                this.setAttribute("role", "text");
            }
        }

        customElements.define("v-btn", VBtn)
    }

    if (typeof window !== "undefined" && !customElements.get("v-code")) {
        class VCode extends HTMLElement {
            constructor() {
                super();
            }

            connectedCallback() {
                this.setAttribute("role", "text");
            }
        }

        customElements.define("v-code", VCode)
    }

    if (typeof window !== "undefined" && !customElements.get("v-path")) {
        class VPath extends HTMLElement {
            constructor() {
                super();
            }

            connectedCallback() {
                this.setAttribute("role", "text");
            }
        }

        customElements.define("v-path", VPath)
    }
}