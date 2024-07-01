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

    @property()
    value!: string;

    @property({type: Boolean})
    disabled: boolean = false;

    @property({type: Boolean, reflect: true})
    checked: boolean = false;

    @property()
    labelPosition: string = "left";

    @property()
    color: ColorVariant = ColorVariant.default;

    render() {
        return html`
            <label class="flex items-center gap-2 ${this.labelPosition === "left" ? "flex-row" : "flex-row-reverse"} label-${this.color} ${this.disabled ? "label-disabled" : ""}">
                <input type="radio"
                       id="${this.id}"
                       name="${this.name}"
                       class="radio-${this.color} status-${this.checked ? 'checked' : 'unchecked'}"
                       ?disabled="${this.disabled}"
                       value="${this.value}"
                       ?checked="${this.checked}"
                       @click="${this.handleChecked}">
                <span>${this.label}</span>
            </label>
        `;
    }

    handleChecked(event: Event) {
        if (this.checked === (event.target as HTMLInputElement).checked) return;

        this.checked = (event.target as HTMLInputElement).checked;
        this.dispatchEvent(new CustomEvent('checked', {detail: {value: this.value}, bubbles: true}));
    }
}
