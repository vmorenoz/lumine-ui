import {html} from "lit";
import {customElement, property} from "lit/decorators.js";

import style from "./checkbox.scss?inline";
import {TailwindElement} from "../../../shared/tailwind.element";
import {ColorVariant} from "../../../enums/color-variant.enum";

@customElement("lumine-checkbox")
export class Checkbox extends TailwindElement(style) {
    @property()
    label!: string;

    @property()
    id!: string;

    @property()
    name!: string;

    @property({attribute: true, type: Boolean})
    checked!: boolean;

    @property({type: Boolean})
    disabled: boolean = false;

    @property()
    labelPosition: string = "left";

    @property()
    color: ColorVariant = ColorVariant.default;

    render() {
        return html`
            <label class="flex items-center gap-2 ${this.labelPosition === "left" ? "flex-row" : "flex-row-reverse"} label-${this.color} ${this.disabled ? "label-disabled" : ""}">
                <input type="checkbox"
                       id="${this.id}"
                       class="checkbox-${this.color}"
                       ?disabled="${this.disabled}"
                       name="${this.name}"
                       ?checked="${this.checked}"
                       @focus="${this.handleFocus}"
                       @blur="${this.handleBlur}"
                       @change="${this.handleChange}">
                <span>${this.label}</span>
            </label>
        `;
    }

    handleChange(event: Event) {
        event.preventDefault();
        this.checked = (event.target as HTMLInputElement).checked;
        if (this.disabled) return;
        this.dispatchEvent(new CustomEvent("change", {detail: this.checked}));
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
