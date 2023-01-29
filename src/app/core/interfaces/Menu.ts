export interface Menu{
  label:string
  route?:string,
  children?:Menu[],
  isCollapsed?:boolean,
  isNew?:boolean,
  iconUrl?:string,
  iconClass?:string,
  materialIcon?:string
  id?:string
  target?:string,
  symbol?:string,
  isMobileView?:boolean
  items?:MenuItem[],
  isAbsolute?:boolean,
  isShowWhenAuthorized?:boolean
  isDisabled?:boolean
}
export interface MenuItem{
  label:string
  route:string
  isAbsolute?:boolean
  iconUrl?:string
}
