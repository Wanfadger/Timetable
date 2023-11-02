export interface SystemGroup{
  id: string,
  createdDateTime: string,
  updatedDateTime: string,
  status: string,
  code: string,
  name: string,
  description: string,
  defaultGroup: false,
  receiveAlerts: false,
  administrativeRole: false,
  userLevel: string,
  createdBy: string,
  updatedBy: string
}


export interface SystemGroupWithMenus{
  id: string
  createdDateTime: string
  updatedDateTime: string
  status: string
  code: string
  name: string
  description: string
  defaultGroup: false
  receiveAlerts: false
  administrativeRole: false
  userLevel: string
  createdBy: string
  updatedBy: string
  systemMenus:SystemMenu[]
}


export interface CreateSystemGroup{
  code:string,
  name:string,
  description:string,
  userLevel:string
}

// to be removed
export interface CreateSystemUser{
  systemUserGroup:{id:string},
  systemUser:{
   username:string
  },
  generalUserDetail:{
     firstName:string,
     lastName:string,
     phoneNumber:string,
     email:string,
     dob:string,
     nationalId:string,
     gender:string,
     nameAbbrev:string
  }
}

export type LoggedUserProfileDto = {
  profileId:string,
  username:string,
  userLevel:string,
  firstName:string,
  lastName:string,
  phoneNumber:string,
  email:string,
  dob:string,
  nationalId:string,
  gender:string,
  nameAbbrev:string,
  userGroup:string,
  createdDateTime:string,
  updatedDateTime:string,
  administrativeAreas:AdministrativeAreaDto[],
  systemMenus:SystemMenuDto[]
}

export type AdministrativeAreaDto = {
  id:string,
  level:string,
  status:string,
  name:string
}

export type SystemMenuDto = {
  id:string,
  createdDateTime:string,
  updatedDateTime:string,
  status:string,
  navigationMenu:string,
  subMenuItem:string,
  activativationSatus:string
}

// export interface SystemUser {
//   id: string,
//   createdDateTime: string,
//   updatedDateTime: string,
//   status: string,
//   systemUserDTO: {
//       id: string,
//       createdDateTime: string,
//       updatedDateTime: string,
//       status: string,
//       userName: string,
//       enabled: true,
//       configRole: string
//   },
//   systemUserGroupDTO: {
//       id: string,
//       createdDateTime: string,
//       updatedDateTime: string,
//       status: string,
//       code: string,
//       name: string,
//       description: string,
//       defaultGroup: false,
//       receiveAlerts: false,
//       administrativeRole: false,
//       userLevel: string
//   },
//   generalUserDetailDTO: {
//       id: string,
//       createdDateTime: string,
//       updatedDateTime: string,
//       status: string,
//       firstName: string,
//       lastName: string,
//       phoneNumber: string,
//       email: string,
//       dob: string,
//       nationalId: string,
//       gender:string,
//       nameAbbrev:string
//   }

// }



export interface SystemUser {
  id:string,
  username:string,
  userLevel:string,
  firstName:string,
  lastName:string,
  phoneNumber:string,
  email:string,
  dob:string,
  nationalId:string,
  gender:string,
  nameAbbrev:string,
  createdDateTime:string,
  updatedDateTime:string,
  administrativeAreas:AdministrativeAreaDto[],
  userGroup:{id:string , name:string}
}


export interface NewSystemUser {
  username:string,
  firstName:string,
  lastName:string,
  phoneNumber:string,
  email:string,
  dob:string,
  nationalId:string,
  gender:string,
  nameAbbrev:string,
  userGroup:{id:string}
}



export interface CreateSystemMenu  {
  navigationMenu:string,
  subMenuItem:string
 }


 export interface SystemMenu        {
  id: string,
  createdDateTime: string,
  updatedDateTime: string,
  status: string,
  navigationMenu: string,
  subMenuItem: string,
  activativationSatus: string
}


