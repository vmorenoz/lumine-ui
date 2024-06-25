import {html} from "lit";
import {customElement, property} from "lit/decorators.js";

import style from "./textarea.scss?inline";
import {TailwindElement} from "../../../shared/tailwind.element";
import {ColorVariant} from "../../../enums/color-variant.enum";

@customElement("lumine-textarea")
export class Textarea extends TailwindElement(style) {
    @property()
    label!: string;

    @property()
    placeholder!: string;

    @property()
    id!: string;

    @property()
    name!: string;

    @property({attribute: true})
    value!: string;

    @property({type: Boolean})
    disabled: boolean = false;

    @property({type: Boolean})
    required: boolean = false;

    @property({type: Number})
    rows: number = 3;

    @property({type: String})
    type: string = "text";

    @property()
    color: ColorVariant = ColorVariant.default;

    renderLabel() {
        return this.label ? html`<label class="label-${this.color}">${this.label}
            ${this.required ? html`<span class="text-red-500">*</span>` : null}</label>` : null;
    }

    render() {
        return html`
            ${this.renderLabel()}
            <textarea
                    rows="${this.rows}"
                    type="${this.type}"
                    class="textarea-${this.color}"
                    placeholder="${this.placeholder}"
                    id="${this.id}"
                    ?disabled="${this.disabled}"
                    name="${this.name}"
                    @input="${this.handleInput}"
                    @focus="${this.handleFocus}"
                    @blur="${this.handleBlur}"
            >${this.value?.trim()}</textarea>
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
