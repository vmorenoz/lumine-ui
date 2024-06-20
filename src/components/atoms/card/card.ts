import {html} from "lit";
import {customElement, property} from "lit/decorators.js";

import style from "./card.scss?inline";
import {TailwindElement} from "../../../shared/tailwind.element";

export interface ISelectOption {
    value: string;
    text: string;
    selected?: boolean;
    disabled?: boolean;
}

@customElement("lumine-card")
export class Card extends TailwindElement(style) {
    @property()
    title!: string;

    @property()
    subtitle!: string;

    @property()
    id!: string;

    @property()
    name!: string;

    render() {
        return html`
            <div class="lumine-card">
                <div class="lumine-card-title">
                    ${this.title}
                </div>
                <div class="lumine-card-subtitle">
                    ${this.subtitle}
                </div>
                <div class="lumine-card-content">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}
