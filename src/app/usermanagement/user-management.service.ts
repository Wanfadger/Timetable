
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedUserProfileDto } from './user-management-dto';
import { ResponseDto } from 'src/shared/school-filter/school-filter.service';


@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private httpClient:HttpClient = inject(HttpClient)
  private USER_BASE_URL = `${environment.BASE_URL}/SystemUserProfiles`
  // private SYSTEM_GROUP_MENU_BASE_URL = `${environment.BASE_URL}/SystemUserGroupSystemMenus`

  loggedUserProfile():Observable<ResponseDto<LoggedUserProfileDto>>{
    return this.httpClient.get<ResponseDto<LoggedUserProfileDto>>(`${this.USER_BASE_URL}/loggedUserProfile`).pipe(retry(3));
  }

  get LoggedUserProfile():LoggedUserProfileDto{
    const profileStr =  (<string>localStorage.getItem(environment.LOGGED_USER_PROFILE))
    return JSON.parse(profileStr);
   }

  // get LoggedUserMenus():SystemMenu[]{
  //   //console.log("permissions" , this.LoggedUserProfile.systemMenus)
  //   return this.LoggedUserProfile.systemMenus;
  // }

  // can = (routeMenu:string):boolean => {
  //   return this.LoggedUserMenus.some(menu => menu.subMenuItem === routeMenu);
  // }

  // get LoggedUserAdministrativeAreas():AdministrativeAreaDto[]{
  //   return this.LoggedUserProfile.administrativeAreas;
  // }




  // createSystemMenu(dto:CreateSystemMenu):Observable<ResponseDto<string>>{
  //   return this.httpClient.post<ResponseDto<string>>(this.SYSTEM_MENU_BASE_URL , dto);
  // }

  // getAllSystemMenu():Observable<ResponseDto<SystemMenu[]>>{
  //   return this.httpClient.get<ResponseDto<SystemMenu[]>>(this.SYSTEM_MENU_BASE_URL).pipe(retry(3));
  // }

  // createSystemUser(dto:NewSystemUser){
  //   return this.httpClient.post<ResponseDto<string>>(this.USER_BASE_URL , dto);
  // }


//  updateSystemUser(id:string , dto:NewSystemUser){
//     return this.httpClient.put<ResponseDto<string>>(`${this.USER_BASE_URL}/${id}` , dto);
//   }


//   getAllSystemUsers():Observable<ResponseDto<SystemUser[]>>{
//     return this.httpClient.get<ResponseDto<SystemUser[]>>(this.USER_BASE_URL).pipe(retry(3));
//   }

//   public createSystemGroup(dto:CreateSystemGroup):Observable<ResponseDto<string>>{
//     return this.httpClient.post<ResponseDto<string>>(this.GROUP_BASE_URL , dto);
//   }

//   getAllSystemGroups():Observable<ResponseDto<SystemGroupWithMenus[]>>{
//     return this.httpClient.get<ResponseDto<SystemGroupWithMenus[]>>(this.GROUP_BASE_URL).pipe(retry(3));
//   }

  // addRemoveGroupMenus(groupId:string , menuIds:string[]){
  //   return this.httpClient.put<ResponseDto<string>>(`${this.GROUP_BASE_URL}/${groupId}/addRemoveMenus` , menuIds);
  // }


}
