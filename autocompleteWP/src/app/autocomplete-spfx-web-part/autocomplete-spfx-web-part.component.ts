import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {SharepointService} from '../services/sharepoint.service';
import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';
import {environment} from '../../environments/environment';
import {IProfile} from '../models/profile.model';
import { setTheme } from 'ngx-bootstrap/utils';
@Component({
  selector: 'app-autocomplete-spfx-web-part',
  templateUrl: './autocomplete-spfx-web-part.component.html',
  styleUrls: ['./autocomplete-spfx-web-part.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteSpfxWebPartComponent implements OnInit {
  @Input() description: string;
  profiles: IProfile[] = [];
  // profiles$: Observable<any>;
  selectedEmployee: IProfile;
  userProfiles: any;
  showUsers: boolean = false;
  selectedUser: string = '';
  inputForm: FormGroup;
  @ViewChild('username') userName: ElementRef;
  @ViewChild('autocomplete') autoComplete: ElementRef;
  searchIcon: string = environment.searchICon;

  /*
  * Close autocomplete on click outside
  * */
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event) {
    if (!this.autoComplete.nativeElement.contains(event.target)) {
      this.showUsers = false;
    }
  }

  constructor(private spService: SharepointService, private renderer: Renderer2,private cdr: ChangeDetectorRef) {
  }
  /**
   * get profiles from cache
   */
  ngOnInit() {

    this.spService.getPofilesCached()
      .subscribe(data => {
        this.getFields(data);
        this.cdr.detectChanges();
      });


  }

  /**
   * transform profiles values to keys
   * add fullname property to profile
   * remove duplicates from profiles
   * sorting profiles by firstname
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
        FullName: ''
      };
      for (const j of profile) {
        if (
          (j.Key === 'EmployeeID' && j.Value !== '' && j.Value !== null) ||
          (j.Key === 'FirstName' && j.Value !== '' ) ||
          (j.Key === 'WorkEmail' && j.Value !== null ||
          (j.Key === 'MobilePhone' && j.Value !== '' && j.Value !== null) ||
          (j.Key === 'WorkPhone' && j.Value !== '' && j.Value !== null) ||
          (j.Key === 'PictureUrl' && j.Value !== null && j.value !== '') ||
          (j.Key === 'FullName' && j.Value !== '') ||
          (j.Key === 'LastName' && j.Value !== null))) {
          profileObject.FullName = ''
          profileObject[j.Key] = j.Value;
          this.profiles.push(profileObject);
        }
      }
    }

     this.profiles = this.profiles.filter((item, index) => this.profiles.indexOf(item) === index);
    this.profiles = this.profiles.sort((a, b) => {
      if (a.FullName > b.FullName) {
        return 1;
      } else {
        return -1;
      }
    });
    this.setFullName(this.profiles);
    console.log('--',this.profiles);
  }

  /**
   * Set property FullName to profiles
   * @param profiles
   */
  setFullName(profiles) {
    this.profiles = profiles.map(profile => {
      profile.FullName = profile.FirstName + ' ' + profile.LastName;
      return profile
    });

  }

  /**
   * Show/hide autocomplete on typing
   * highlight character of FirstName,LastName or FullName on searching
   */
  onInput() {
    this.showUsers = this.selectedUser !== '';
  }

  /**
   * show user in Input after select specific user
   * hide autocomplete
   * @param user
   */
  onSelectUser(user: IProfile) {
    this.selectedUser = user.FirstName + ' ' + user.LastName;
    this.showUsers = false;
    // TODO : redirect to Search page and pass this.selectedUser as parameter
  }
}


