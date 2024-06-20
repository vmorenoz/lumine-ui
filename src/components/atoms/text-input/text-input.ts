import {html} from "lit";
import {customElement, property} from "lit/decorators.js";

import style from "./text-input.scss?inline";
import {TailwindElement} from "../../../shared/tailwind.element";

@customElement("lumine-text-input")
export class TextInput extends TailwindElement(style) {
    @property()
    label!: string;

    @property()
    placeholder!: string;

    @property()
    id!: string;

    @property()
    name!: string;

    @property()
    value!: string;

    @property({type: Boolean})
    disabled: boolean = false;

    @property({type: String})
    type = 'text';

    renderLabel() {
        return this.label ? html`<label>${this.label}</label>` : null;
    }

    render() {
        return html`
            ${this.renderLabel()}
            <input type="${this.type}"
                   value="${this.value}"
                   placeholder="${this.placeholder}"
                   id="${this.id}"
                   ?disabled="${this.disabled}"
                   name="${this.name}"
                   @input="${this.handleInput}"
                   @focus="${this.handleFocus}"
                   @blur="${this.handleBlur}">
        `;
    }

    handleInput(event: Event) {
        event.preventDefault();
        this.value = (event.target as HTMLInputElement).value;
        if (this.disabled) return;
        this.dispatchEvent(new CustomEvent("input", {detail: this.value}));
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
