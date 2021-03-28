import { Directive, HostListener, Input, OnInit } from "@angular/core";
import { NgControl } from "@angular/forms";
import * as MASK from "../utils/mask";

@Directive({
  selector: "[formControlName][ngxMask]"
})

@Directive({
  selector: "[ngxMask]"
})
export class NgxMaskDirective implements OnInit {
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

  ngOnInit() {
    if (!this.ngControl || !this.ngControl.valueAccessor) {
      return;
    }
    const originalWriteVal = this.ngControl.valueAccessor.writeValue.bind(this.ngControl.valueAccessor);
    this.ngControl.valueAccessor.writeValue = (val: any) => originalWriteVal(MASK.mask(val, this.ngxMask));

    const originalChange = (<any>this.ngControl.valueAccessor)['onChange'].bind(this.ngControl.valueAccessor);
    this.ngControl.valueAccessor.registerOnChange((val: any) => originalChange(MASK.unmask(val, this.ngxMask)));

    // this.formGroup.disabled
    // console.log(this.ngControl)
    this._setVal(MASK.mask(this.ngControl.value || '', this.ngxMask));
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

  private _setVal(val: string) {
    if (this.ngControl.control) {
      this.ngControl.control.setValue(val, { emitEvent: false });
    }
  }
}
