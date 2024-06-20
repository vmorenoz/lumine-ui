import {html} from "lit";
import {customElement, property} from "lit/decorators.js";

import style from "./select.scss?inline";
import {TailwindElement} from "../../../shared/tailwind.element";

export interface ISelectOption {
    value: string;
    text: string;
    selected?: boolean;
    disabled?: boolean;
}

@customElement("lumine-select")
export class Select extends TailwindElement(style) {
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

    @property({type: Array})
    options: Array<ISelectOption> = [
        {
            value: "1",
            text: "Opción 1",
        },
        {
            value: "2",
            text: "Opción 2",
        },
        {
            value: "3",
            text: "Opción 3",
        }
    ];

    override connectedCallback() {
        super.connectedCallback();
        this.options = this.options.map(option => ({...option, selected: option.value == this.value}));
    }

    renderLabel() {
        return this.label ? html`<label>${this.label}</label>` : null;
    }

    render() {
        return html`
            ${this.renderLabel()}
            <select id="${this.id}"
                    ?disabled="${this.disabled}"
                    name="${this.name}"
                    @input="${this.handleInput}"
                    @focus="${this.handleFocus}"
                    @blur="${this.handleBlur}">
                ${this.options.map(option => html`
                    <option value="${option.value}"
                            ?selected="${option.selected ?? false}"
                            ?disabled="${option.disabled ?? false}">
                        ${option.text}
                    </option>
                `)}
            </select>
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
