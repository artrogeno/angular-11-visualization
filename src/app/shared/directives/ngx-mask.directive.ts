import { Directive, HostListener, Input } from "@angular/core";
import { NgControl } from "@angular/forms";
import * as MASK from "../utils/mask";

@Directive({
  selector: "[formControlName][ngxMask]"
})
@Directive({
  selector: "[ngxMask]"
})
export class NgxMaskDirective {
  @Input("ngxMask") ngxMask: string;

  constructor(public ngControl: NgControl) {}

  @HostListener("ngModelChange", ["$event"])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener("keydown.backspace", ["$event"])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }

  onInputChange(event, backspace) {
    let val = event.replace(/\D/g, "");
    const mask = (value: any) => MASK.mask(value, this.ngxMask);
    const unmask = (value: any) => MASK.unmask(value, this.ngxMask);
    const validLength = MASK.validLength(this.ngxMask);

    this.ngControl.valueAccessor.writeValue(mask(val));

    this.ngControl.valueAccessor.registerOnChange((val: any) => {
      // if (validLength === unmask(val).length) { }
      this.ngControl.control.setValue(unmask(val), {
        emitEvent: TextTrackCueList
      });
      this.ngControl.valueAccessor.writeValue(mask(val));
      return mask(val);
    });
  }
}
