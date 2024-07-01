import {html} from "lit";
import {customElement, property, queryAssignedElements} from "lit/decorators.js";

import style from "./radio-button-group.scss?inline";
import {TailwindElement} from "../../../shared/tailwind.element";
import {ColorVariant} from "../../../enums/color-variant.enum";
import {RadioButton} from "../radio-button/radio-button";

@customElement("lumine-radio-button-group")
export class RadioButtonGroup extends TailwindElement(style) {
    @queryAssignedElements()
    radioButtons!: Array<RadioButton>;

    @property()
    value!: string;

    @property({type: Boolean})
    disabled: boolean = false;

    @property()
    labelPosition: string = "left";

    @property()
    color: ColorVariant = ColorVariant.default;

    render() {
        return html`
            <slot @checked=${this.handleChecked}></slot>
        `;
    }

    handleChecked(event: CustomEvent) {
        this.value = event.detail.value;
        this.radioButtons.forEach(button => {
            button.checked = button.value === this.value;
        });

        this.dispatchEvent(new CustomEvent('change', {detail: {value: this.value}}));
    }
}
