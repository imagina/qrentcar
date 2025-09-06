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
  dailyAvailabilities: `${urlBase}/daily-availabilities`,

  transmissionTypes: `${urlBase}/transmission-types`,
  fuelTypes: `${urlBase}/fuel-types`,
  vehicleTypes: `${urlBase}/vehicle-types`,

}
