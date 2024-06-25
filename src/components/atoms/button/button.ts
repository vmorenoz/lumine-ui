import {html} from "lit";
import {customElement, property} from "lit/decorators.js";

import style from "./button.scss?inline";
import {TailwindElement} from "../../../shared/tailwind.element";
import {ColorVariant} from "../../../enums/color-variant.enum";
import {ButtonVariantEnum} from "../../../enums/button-variant.enum";

@customElement("lumine-button")
export class Button extends TailwindElement(style) {
    @property()
    text!: string;

    @property()
    type = 'button';

    @property({type: Boolean})
    disabled: boolean = false;

    @property()
    color: ColorVariant = ColorVariant.default;

    @property()
    variant: ButtonVariantEnum = ButtonVariantEnum.raised;

    render() {
        return html`
            <button ?disabled="${this.disabled}" @click="${this.handleClick}" type="${this.type}"
                    class="btn-${this.color} btn-${this.variant}">
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
