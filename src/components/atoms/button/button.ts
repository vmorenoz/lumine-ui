import {html} from "lit";
import {customElement, property} from "lit/decorators.js";

import style from "./button.scss?inline";
import {TailwindElement} from "../../../shared/tailwind.element";

@customElement("lumine-button")
export class Button extends TailwindElement(style) {
    @property()
    text!: string;

    @property()
    type = 'button';

    @property({type: Boolean})
    disabled: boolean = false;

    render() {
        return html`
            <button ?disabled="${this.disabled}" @click="${this.handleClick}" type="${this.type}">
                ${this.text || html`
                    <slot></slot>`}
            </button>
        `;
    }

    handleClick() {
        if (this.disabled) return;
        this.dispatchEvent(new CustomEvent("click"));
    }
}
