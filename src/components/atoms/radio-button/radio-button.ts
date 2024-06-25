import {html} from "lit";
import {customElement, property} from "lit/decorators.js";

import style from "./radio-button.scss?inline";
import {TailwindElement} from "../../../shared/tailwind.element";
import {ColorVariant} from "../../../enums/color-variant.enum";

@customElement("lumine-radio-button")
export class RadioButton extends TailwindElement(style) {
    @property()
    label!: string;

    @property()
    id!: string;

    @property()
    name!: string;

    @property({attribute: true})
    value!: string;

    @property({type: Boolean})
    disabled: boolean = false;

    @property()
    labelPosition: string = "left";

    @property()
    color: ColorVariant = ColorVariant.default;

    render() {
        return html`
            <div class="flex">
                <div class="flex items-center gap-2 ${this.labelPosition === "left" ? "flex-row" : "flex-row-reverse"}">
                    <input type="radio"
                           id="${this.id}"
                           class="radio-${this.color}"
                           ?disabled="${this.disabled}"
                           name="${this.name}"
                           value="${this.value}"
                           @focus="${this.handleFocus}"
                           @blur="${this.handleBlur}"
                           @change="${this.handleChange}">
                    <label for="${this.id}"
                           class="label-${this.color} ${this.disabled ? "label-disabled" : ""}">${this.label}</label>
                </div>
            </div>
        `;
    }

    handleChange(event: Event) {
        event.preventDefault();
        if (this.disabled) return;
        this.dispatchEvent(new CustomEvent("change", {detail: this.value}));
    }

    handleFocus() {
        if (this.disabled) return;
        this.dispatchEvent(new CustomEvent("focus"));
    }

    handleBlur() {
        if (this.disabled) return;
        this.dispatchEvent(new CustomEvent("blur"));
    }
}
