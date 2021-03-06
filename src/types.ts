

import { ITime } from './date-time';

export interface IDictionary<TValue> {
  [id: string]: TValue;
}

export interface IActionConfig {
  name?: string,
  service: string,
  service_data?: IDictionary<any>,
  icon?: string,
  variable?: IActionVariableConfig,
  routine?: boolean
}

export interface IActionElement extends IActionConfig {
  id: string,
  name: string,
  service: string,
  service_data?: IDictionary<any>,
  icon: string,
  variable?: IActionVariable
  routine: boolean
}

export interface IEntityConfig {
  icon?: string,
  name?: string,
  actions: IActionConfig[]
}

export interface IDomainConfig {
  icon?: string,
  name?: string,
  actions: IActionConfig[]
}
export interface IEntityElement extends IEntityConfig {
  id: string,
  name: string,
  icon: string
  actions: IActionElement[]
}

export interface IGroupConfig {
  domains?: string[],
  entities?: string[],
  name?: string,
  icon?: string,
}

export interface IGroupElement extends IGroupConfig {
  id: string,
  domains: string[],
  entities: string[],
  name: string,
  icon?: string,
}

export interface IConfig {
  groups?: IDictionary<IGroupConfig>,
  domains?: IDictionary<IDomainConfig>,
  entities?: IDictionary<IEntityConfig>,
  discover_existing?: boolean,
  standard_configuration?: boolean,
}

export interface IConfigFull extends IConfig {
  groups: IDictionary<IGroupConfig>,
  domains: IDictionary<IDomainConfig>,
  entities: IDictionary<IEntityConfig>,
  discover_existing: boolean,
  standard_configuration: boolean,
}

export interface IUserSelection {
  group?: string,
  entity: string,
  action: string,
  newItem: boolean,
  actionConfirmed: boolean,
  editItem?: string,
  time: ITime,
  daysCustom: number[],
  daysType: string,
  levelEnabled: boolean | null,
  level: number | null,
  plannerSlots?: ITimeSlot[],
  activePlannerSlot?: number | null
}

export interface IHassEntry {
  time?: ITime,
  days?: number[],
  actions: number[]
}

export interface IHassAction {
  service: string,
  entity: string,
  service_data?: IDictionary<any>
}

export interface IHassData {
  entries: IHassEntry[],
  actions: IHassAction[]
}

// export interface IScheduleAction {
//   entity: string,
//   action: string,
//   level?: number
// }

export interface IActionVariableConfig {
  field: string,
  name?: string,
  min?: number,
  max?: number,
  step?: number
  optional?: boolean,
  show_percentage?: boolean
}

export interface IActionVariable {
  field: string,
  unit: string,
  name: string,
  min: number,
  max: number,
  step: number,
  optional: boolean,
  show_percentage: boolean
}

export interface IUserConfig {
  sunrise: number | null,
  sunset: number | null,
  title: boolean | string,
  am_pm: boolean,
  time_step: number,
}

export interface IEntry {
  time: ITime,
  days: number[]
  action: string,
  entity: string,
  level?: number | null,
  levelEnabled?: boolean | null,
}

export interface IScheduleEntry {
  id: string,
  enabled: boolean,
  entries: IEntry[],
}

export interface ITimeSlot {
  startTime: number,
  endTime: number,
  action?: string,
  level?: number,
  levelEnabled?: boolean
}
