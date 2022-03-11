import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
  constructor(
    public viewContainerRef: ViewContainerRef // donne la position où un component est utilisé
  ) {}

}
