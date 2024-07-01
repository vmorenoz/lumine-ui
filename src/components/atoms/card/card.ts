import {html} from "lit";
import {customElement, property} from "lit/decorators.js";

import style from "./card.scss?inline";
import {TailwindElement} from "../../../shared/tailwind.element";
import {ColorVariant} from "../../../enums/color-variant.enum";

@customElement("lumine-card")
export class Card extends TailwindElement(style) {
    @property({attribute: 'title-text'})
    titleText!: string;

    @property({attribute: 'subtitle-text'})
    subtitleText!: string;

    @property()
    id!: string;

    @property()
    name!: string;

    @property()
    color: ColorVariant = ColorVariant.default;

    renderTitle() {
        return this.titleText || html`
            <slot name="title"></slot>
        `;
    }

    renderSubtitle() {
        return this.subtitleText || html`
            <slot name="subtitle"></slot>
        `;
    }

    render() {
        return html`
            <div class="lumine-card lumine-card-${this.color}">
                <div class="lumine-card-title">
                    ${this.renderTitle()}
                </div>
                <div class="lumine-card-subtitle">
                    ${this.renderSubtitle()}
                </div>
                <div class="lumine-card-content">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}
