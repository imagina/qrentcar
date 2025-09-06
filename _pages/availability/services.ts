import baseService from 'modules/qcrud/_services/baseService'

export default {
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

  getDailyAvailabilities(query){
    return new Promise((resolve, reject) => {
      const requestParams = {
        refresh: true,
        params: {
          filter: {
            gammaOfficeId: query.ids, 
            date: {
              field: 'date',
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

  }
}
