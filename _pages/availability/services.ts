import baseService from 'modules/qcrud/_services/baseService'

export default {
  /* gamma Office */
  getGammaOffice(criteria){
    return new Promise((resolve, reject) => {
      const requestParams = {
        refresh: true,
        params: {
          include: 'office,gamma', 
          filter: {
            officeId: criteria            
          }

        }
      }      
      baseService.index('apiRoutes.qrentcar.gammaOffice', requestParams).then(response => {
        resolve(response.data)
      }).catch(error => reject(error));
    })
  }, 

  createGammaOffice(data, params = {params: {}}): Promise<any> {
    return new Promise((resolve, reject) => {      
      //Request
      baseService.create('apiRoutes.qrentcar.gammaOffice', data).then(response => {
        resolve(response)
      }).catch(error => reject(error))
    })
  },

  /*availabilities*/
  getDailyAvailabilities(query){
    return new Promise((resolve, reject) => {
      const requestParams = {
        refresh: true,
        params: {
          filter: {            
            date: {            
              field: 'available_date',
              from: query.from,
              to: query.to
            }            
          }
        }
      }      
      baseService.index('apiRoutes.qrentcar.dailyAvailabilities', requestParams).then(response => {
        resolve(response.data)
      }).catch(error => reject(error));
    })

  },

  createAvailability(data, params = {params: {}}): Promise<any> {
    return new Promise((resolve, reject) => {      
      //Request
      baseService.create('apiRoutes.qrentcar.dailyAvailabilities', data).then(response => {
        resolve(response)
      }).catch(error => reject(error))
    })
  },

  updateAvailability(criteria, data, params = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestParams = {
        ...params,
      }
      baseService.update('apiRoutes.qrentcar.dailyAvailabilities', criteria, data, requestParams).then(response => {
        resolve(response.data)
      }).catch(error => reject(error))
    })
  },
}
