import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input, OnDestroy,
  OnInit, QueryList,
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
  @Input() description: string;
  @ViewChild('autocomplete') autoComplete: ElementRef;
  profiles: IProfile[] = [];
  selectedEmployee: IProfile;
  isShowAutocomplete: boolean = false;
  selectedProfile: string = '';
  searchIcon: string = environment.searchICon;
  private sink = new SubSink();
  ulHeight: number = 0;

  /*
  * Close autocomplete on click outside
  * */
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event) {
    if (!this.autoComplete.nativeElement.contains(event.target)) {
      this.isShowAutocomplete = false;
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
        Rank: null
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
    // this.profiles = this.profiles.sort((a,b)=> a.FullName.localeCompare(b.FullName))

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
   */
  onInput(): void {
    this.isShowAutocomplete = this.selectedProfile !== '';
    if (this.isShowAutocomplete) {
      setTimeout(() => {
         this.ulHeight = 0;

        let virtualScroll = document.querySelector('.users');
        let vsChildren = virtualScroll.children
        console.log('vs_children', vsChildren)
        let children = vsChildren[0].children;
        let ul = children[0];
        console.log(ul)
        // let children = ul[0].children as any
        for (let i = 0; i < ul.children.length; i++) {
          if (i <= 4) {
            this.ulHeight += (<HTMLElement>ul.children[i]).getBoundingClientRect().height;
            this.cdr.detectChanges();
          }
        }
      }, 500);


    }

    // if (this.isShowAutocomplete) {
    //
    //   setTimeout(() => {
    //     this.profiles.forEach((profile, index) => {
    //       if (index <= 4) {
    //         console.log(profile);
    //         if (profile.MobilePhone) {
    //           // let children = ul[0].children as any
    //               let li = document.getElementsByClassName('example-item') as HTMLCollection;
    //           for (let i = 0; i < li.length; i++) {
    //             if (i <= 4) {
    //              li[i].classList.add('mobile')
    //               this.cdr.detectChanges();
    //             }
    //           }
    //         }
    //       }
    //     })
    //   }, 300)
    // }
    this.cdr.detectChanges();


  }

  /**
   * show user in Input after select specific user
   * hide autocomplete
   * @param profile
   */
  onSelectUser(profile: IProfile): void {
    this.selectedProfile = profile.FirstName + ' ' + profile.LastName;
    this.isShowAutocomplete = false;
  }

  /**
   * click on search icon in input to navigate to the 'Search page'
   * with 'selectedUser' parameter
   */
  onIcon() {
    if (this.selectedProfile !== '') {
      window.location.href = environment.searchPageUrl + '/profile?=' + this.selectedProfile;

    } else {
      window.location.href = environment.searchPageUrl;
    }
  }

  ngOnDestroy() {
    this.sink.unsubscribe();
  }

  onClearInput() {
    this.selectedProfile = '';
    this.isShowAutocomplete = false;

  }


}


