import {AfterViewChecked, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appMatchHeight]'
})
export class MatchHeightDirective implements AfterViewChecked {

  @Input() myMatchHeight: string;

  constructor(private el: ElementRef) {
  }

  ngAfterViewChecked(): void {
    // this.matchHeight(this.el.nativeElement,this.myMatchHeight)
    // call our matchHeight function here later
  }

  matchHeight(parent: HTMLElement, className: string) {
    // // match height logic here
    // if (!parent) {
    //   return
    // }
    // const children = parent.getElementsByClassName(className);
    //
    // if (!children) {
    //   return;
    // }
    // let sum = 0
    // const itemHeights = Array.from(children).map((child) => {
    //   sum += child.getBoundingClientRect().height;
    //   return sum
    // });
    // console.log('li height', itemHeights)
  }

}
