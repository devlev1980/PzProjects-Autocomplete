import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AutocompleteSpfxWebPartComponent } from './autocomplete-spfx-web-part/autocomplete-spfx-web-part.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {FormsModule} from '@angular/forms';
import { Search_byPipe } from './pipes/search_by.pipe';
import { HighlightPipe } from './pipes/highlight.pipe';
import {MatIconModule} from '@angular/material/icon';
import { SortCardsPipe } from './pipes/sort-cards.pipe';

@NgModule({
  declarations: [
    AutocompleteSpfxWebPartComponent,
    Search_byPipe,
    HighlightPipe,
    SortCardsPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ScrollingModule,
    FormsModule,
    MatIconModule,
  ],
  providers: [],
  entryComponents: [AutocompleteSpfxWebPartComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(AutocompleteSpfxWebPartComponent, { injector: this.injector });
    customElements.define('app-autocomplete-spfx-web-part', el);
  }
}
