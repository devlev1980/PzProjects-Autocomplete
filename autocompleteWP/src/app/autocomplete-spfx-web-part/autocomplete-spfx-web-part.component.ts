import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input, OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {SharepointService} from '../services/sharepoint.service';
import {environment} from '../../environments/environment';
import {IProfile} from '../models/profile.model';
import {SubSink} from 'subsink';

@Component({
  selector: 'app-autocomplete-spfx-web-part',
  templateUrl: './autocomplete-spfx-web-part.component.html',
  styleUrls: ['./autocomplete-spfx-web-part.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteSpfxWebPartComponent implements OnInit, OnDestroy {
  @ViewChild('autocomplete') autoComplete: ElementRef;
  profiles: IProfile[] = [];
  selectedEmployee: IProfile;
  isShowAutocomplete: boolean = false;
  selectedProfile: string = '';
  searchIcon: string = environment.searchICon;
  private sink = new SubSink();
  ulHeight: number = 0;


  isShowFooterForAutocomplete: boolean = false;
  smallAutocomplete: boolean = false;
   miniAutocomplete: boolean = false;
   onlyFooter: boolean = false;
   lastElement: boolean = false;

  /*
* Close autocomplete on click outside
* */
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event) {
    if (!this.autoComplete.nativeElement.contains(event.target)) {
      this.isShowAutocomplete = false;
    }
  }
  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    // visible height + pixel scrolled >= total height
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      console.log("End");
      this.lastElement = true;
    }else{
      this.lastElement = false;
    }
  }

  constructor(private spService: SharepointService,
              private renderer: Renderer2,
              private cdr: ChangeDetectorRef) {
  }

  /**
   * get profiles from cache
   */
  ngOnInit() {
    this.sink.add(this.spService.getProfilesCached()
      .subscribe((data) => {
        this.getFields(data);
        this.cdr.detectChanges();
      }))
  }


  /**
   * transform profiles values to keys
   * add fullname property to profile
   * remove duplicates from profiles
   * @param profiles
   */
  getFields(profiles) {
    for (const profile of profiles) {
      const profileObject: IProfile = {
        EmployeeID: '',
        FirstName: '',
        LastName: '',
        PictureUrl: '',
        MobilePhone: '',
        WorkPhone: '',
        WorkEmail: '',
        FullName: '',
        FirstNameRankOnStart: null,
        FirstNameRankNotStart: null,
        LastNameRankOnStart: null,
        LastNameRankNotOnStart:null,
        Rank: 0
      };
      for (const profileElement of profile) {
        if (
          (profileElement.Key === 'EmployeeID' && profileElement.Value !== '' && profileElement.Value !== null) ||
          (profileElement.Key === 'FirstName' && profileElement.Value !== '') ||
          (profileElement.Key === 'WorkEmail' && profileElement.Value !== null ||
            (profileElement.Key === 'MobilePhone' && profileElement.Value !== '' && profileElement.Value !== null) ||
            (profileElement.Key === 'WorkPhone' && profileElement.Value !== '' && profileElement.Value !== null) ||
            (profileElement.Key === 'PictureUrl' && profileElement.Value !== null && profileElement.value !== '') ||
            (profileElement.Key === 'FullName' && profileElement.Value !== '') ||
            (profileElement.Key === 'LastName' && profileElement.Value !== null))) {
          profileObject.FullName = null
          profileObject[profileElement.Key] = profileElement.Value;
          this.profiles.push(profileObject);
        }
      }
    }
    this.profiles = this.profiles.filter((item, index) => this.profiles.indexOf(item) === index);
    this.setFullName(this.profiles);
  }

  /**
   * Add property 'FullName' to profiles
   * @param profiles
   */
  setFullName(profiles: IProfile[]) {
    this.profiles = profiles.map(profile => {
      profile.FullName = profile.FirstName + ' ' + profile.LastName;
      return profile
    });
  }

  /**
   * Show/hide autocomplete on typing
   *
   */
  onInput(): void {
    this.isShowAutocomplete = this.selectedProfile !== '';
    this.changeHeightOfAutocompleteDynamically()
    this.cdr.detectChanges();
  }

  /**
   *  Change height of the autocomplete dynamically
   */
  changeHeightOfAutocompleteDynamically() {
    if (this.isShowAutocomplete) {
      setTimeout(() => {
        this.ulHeight = 2;
        this.isShowFooterForAutocomplete = true;
        const virtualScroll = document.querySelector('.users');
        if(virtualScroll){
          const vsChildren = virtualScroll.children
          const children = vsChildren[0].children;
          const ul = children[0];
          for (let i = 0; i < ul.children.length; i++) {

            if (i <= 4) {
              this.ulHeight += (<HTMLElement>ul.children[i]).getBoundingClientRect().height + 5;
              this.cdr.detectChanges();

              if(this.ulHeight < 346){
                this.smallAutocomplete = true;
                this.miniAutocomplete = false;
                this.lastElement = false;
                this.cdr.detectChanges();

                if(this.ulHeight === 68){
                  this.miniAutocomplete = true;
                  this.smallAutocomplete = false;
                  this.cdr.detectChanges();
                }

              }else{
                this.smallAutocomplete = false;
                this.miniAutocomplete = false;
                this.cdr.detectChanges();
              }
            }
          }
        }
      }, 500);
    }
  }

  /**
   * show user in Input after select specific user
   * hide autocomplete
   * @param profile
   */
  onSelectUser(profile: IProfile): void {
    this.selectedProfile = profile.FirstName + ' ' + profile.LastName;
    window.location.href = environment.searchPageUrl + '/?profile=' + this.selectedProfile;
    this.isShowAutocomplete = false;
  }

  /**
   * click on search icon in input to navigate to the 'Search page'
   * with 'selectedUser' parameter
   */
  onIcon() {
    if (this.selectedProfile !== '') {
      window.location.href = environment.searchPageUrl + '/?profile=' + this.selectedProfile;

    } else {
      window.location.href = environment.searchPageUrl;
    }
  }



  /**
   * Click on 'X' to clear the input field
   */
  onClearInput() {
    this.selectedProfile = '';
    this.isShowAutocomplete = false;
  }

  /**
   * Redirect to the Search page with selected profile parameters
   */
  onSelectUserByEnter(selectedProfile: string) {
    if(selectedProfile){
      window.location.href = environment.searchPageUrl + '/?profile=' + this.selectedProfile;
    }
  }
  ngOnDestroy() {
    this.sink.unsubscribe();
  }
}


