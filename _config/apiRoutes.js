const moduleName = 'irentcar';
const moduleVersion = 'v1';
const urlBase = `/${moduleName}/${moduleVersion}`


export default {
  urlBase: urlBase,
  version: moduleVersion, 
  offices: `${urlBase}/offices`,
  statuses: `${urlBase}/statuses`,
  gammas: `${urlBase}/gammas`,
  extras: `${urlBase}/extras`,
  gammaOffice: `${urlBase}/gamma-office`,
  gammaOfficeExtra: `${urlBase}/gamma-office-extra`,
  dailyAvailabilities: `${urlBase}/daily-availabilities`,
  reservations: `${urlBase}/reservations`,
  reservationStatuses: `${urlBase}/reservation-statuses`,
  transmissionTypes: `${urlBase}/transmission-types`,
  fuelTypes: `${urlBase}/fuel-types`,
  vehicleTypes: `${urlBase}/vehicle-types`
}
