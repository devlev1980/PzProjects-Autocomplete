import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map, shareReplay} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {IProfile} from '../models/profile.model';
const CACHE_SIZE = 1;
@Injectable({
  providedIn: 'root'
})
export class SharepointService {
  private cache$: Observable<any>;
  constructor(private http: HttpClient) {}

  /**
   * Get profiles from cache
   */
  getProfilesCached():Observable<IProfile[]> {
    if (!this.cache$) {
      this.cache$ = this.getProfiles().pipe(
        shareReplay(CACHE_SIZE));
    }
    return this.cache$;
  }

  /**
   * get profiles from sharepoint API
   * @private
   */
  private getProfiles() : Observable<IProfile[]>{
    const appweburl = `_api/search/query`;
    const properties = 'EmployeeID,FirstName,WorkEmail,PictureUrl,LastName,MobilePhone,WorkPhone';
    const httpURL = `${environment.apiUrl}${appweburl}`;
    const httpParams = new HttpParams()
      .set('queryText', `'*'`)
      .set('sourceid', `'${environment.sourceId}'`)
      .set('selectproperties', `'${properties}'`)
      .set('RowLimit', `'10000'`);
    return this.http.get(httpURL, {params: httpParams})
      .pipe(
        map((result: any) => result.PrimaryQueryResult.RelevantResults.Table.Rows),
        map(item => item.map(el => el.Cells)),
      );
  }
}
