import {computed, reactive, ref, onMounted, toRefs, watch, getCurrentInstance} from "vue";
import services from 'modules/qrentcar/_pages/availability/services'
import moment from 'moment';

import { i18n } from 'src/plugins/utils';

export default function controller(props: any, emit: any) {

  const dateFormat = 'YYYY-MM-DD'

  // Refs
  const refs = {
    // refKey: ref(defaultValue)
    gammaOfficeExtra: ref(),
    gammaOfficeForm: ref()
  }

  // States
  const state = reactive({
    // Key: Default Value
    loading: false,
    requestLoading: {
      id: null,
      date: null
    },
    title: 'Ready Rent Cars',
    rows: [],

    dynamicFilter: {
      office: {
        value: null,
        type: 'select',
        quickFilter: true,
        props: {
          label: i18n.tr('irentcar.cms.sidebar.adminOffices'),
        },
        loadOptions: {
          apiRoute: 'apiRoutes.qrentcar.offices'
        }
      },
      date: {
        value: moment().format(dateFormat),
        type: 'date',
        quickFilter: true,
        props: {
          label: i18n.tr('isite.cms.form.date'),
          mask: dateFormat
        }
      }
    },
    filterValues: {
      office: null,
      date: null
    },

    modalGammaOffice: {
      show: false,
      actions : [
        {
          props: { label: i18n.tr("isite.cms.label.cancel")},
          action: () => state.modalGammaOffice.show = false
        },
        {
          props: { label: i18n.tr("isite.cms.label.save"), color: "green" },
          action: () => refs.gammaOfficeForm.value.submit()
        },

      ]
    },

    modelValues: {
      availability: {
        quantity: null,
        price: null,
        reason: null
      },
      gammaOffice: {
        id: null,
        gammaId : null,
        tax: null,
        statusId: null
      }
    },

    gammaOffice: [],
    dailyAvailabilities: [],

  })

  // Computed
  const computeds = {
    // key: computed(() => {})

    dynamicFields: computed(() =>  {
      return {
        availability: {
          quantity: {
            type: 'input',
            props: {
              label: i18n.tr('isite.cms.form.quantity'),
              type: 'number',
              rules: [
                val => /^[0-9]+$/.test(val) || i18n.tr('isite.cms.message.fieldRequired')
              ],
            }
          },
          price: {
            type: 'input',
            props: {
              label: i18n.tr('isite.cms.form.price'),
              type: 'number',
              rules: [
                val => /^[0-9]+$/.test(val) || i18n.tr('isite.cms.message.fieldRequired')
              ],
            }
          },
          reason: {
            type: 'input',
            props: {
              label: i18n.tr('irentcar.cms.form.reason'),
            }
          }
        },

        gammaOffice: {

          officeId: {
            value: state.filterValues.office,
            type: 'select',
            props: {
              label: i18n.tr('irentcar.cms.label.office'),
              readonly: true,
              ///vIf: state.filterValues.office
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qrentcar.offices',
              select: {label: 'title', id: 'id'}
            }
          },

          gammaId: {
            value: null,
            type: 'select',
            props: {
              label: i18n.tr('irentcar.cms.label.gamma'),
              vIf: !state.modelValues.gammaOffice.id,
              rules: [
                val => /^[0-9]+$/.test(val) || i18n.tr('isite.cms.message.fieldRequired')
              ],
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qrentcar.gammas',
              requestParams: {
                filter: {
                  id: {where: 'notIn', value: state.gammaOffice.map((x) => x.gamma.id)      }
                }
              },
              select: {label: 'title', id: 'id'}
            }
          },

          statusId: {
            value: 1,
            type: 'select',
            props: {
              label: i18n.tr('isite.cms.form.status'),
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qrentcar.statuses'
            }
          },

          quantity: {
            value: '0',
            type: 'input',
            props: {
              label: i18n.tr('isite.cms.form.quantity'),
              type: 'number',
              rules: [
                val => /^[0-9]+$/.test(val) || i18n.tr('isite.cms.message.fieldRequired')
              ],
            }
          },
          price: {
            value: '0',
            type: 'input',
            props: {
              label: i18n.tr('isite.cms.form.price'),
              type: 'number',
              rules: [
                val => /^[0-9]+$/.test(val) || i18n.tr('isite.cms.message.fieldRequired')
              ],
            }
          },
          tax: {
            value: '0',
            type: 'input',
            props: {
              label: i18n.tr('isite.cms.form.tax'),
              type: 'number',
              rules: [
                val => /^[0-9]+$/.test(val) || i18n.tr('isite.cms.message.fieldRequired')
              ],
            }
          }
        }
      }
    }),


    extraActions: computed( () => {
      return [
      {
        vIf: state.filterValues.office,
        props: {
          label: i18n.tr('irentcar.cms.label.addGammaOffice'),
          icon: 'fa-light fa-plus',
          textColor: 'primary',
          round: false,
          rounded: true,
          padding: '5px 15px',
        },
        action: () => methods.openModalGammaOffice()
      }]
    }),

    extrasCustomData: computed(() => {
      return {
        read: {
          requestParams: {
            include: 'extra',
            filter: {gammaOfficeId: state.modelValues.gammaOffice?.id }
          },
        },
        formLeft: {
          gammaOfficeId: {
            value: state.modelValues.gammaOffice.id,
            type: 'select',
            props: {
              label: i18n.tr('irentcar.cms.label.gamma'),
              readonly: true,
              options: [
                { label: state.modelValues.gammaOffice?.gamma.title,
                  value: state.modelValues.gammaOffice?.id
                }
              ]
            }
          },
          extraId: {
            value: null,
            type: 'select',
            props: {
              label: i18n.tr('irentcar.cms.label.extra'),
              readOnly: true
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qrentcar.extras',
              select: {label: 'title', id: 'id'}
            }
          },
          price: {
            value: '',
            type: 'input',
            props: {
              label: `${i18n.tr('isite.cms.form.price')}*`,
              rules: [
                val => !!val || i18n.tr('isite.cms.message.fieldRequired')
              ]
            }
          },
        }
      }
    }),
    showCalendar: computed(() => state.gammaOffice.length && !state.loading ),
    nextDays: computed(() => methods.getNextDays())    
  }

  // Methods
  const methods = {
    // methodKey: () => {}
    init(){
      //state.loading = true

    },

    /* Availability */
    setAvailabilityModal(availability){
      state.modelValues.availability.quantity = availability.quantity
      state.modelValues.availability.price = availability.price
      state.modelValues.availability.reason = availability.reason
    },
    async updateAvailability(availability, fullDate){
      state.requestLoading.id = availability.gammaOfficeId
      state.requestLoading.date = fullDate

      availability.quantity =  state.modelValues.availability.quantity,
      availability.price =  state.modelValues.availability.price
      availability.reason = state.modelValues.availability.reason

      if(availability.id){
        await  services.updateAvailability(availability.id, {...availability})
      } else {
        delete availability.reservedQuantity
        await services.createAvailability(availability)
      }

      await methods.getDailyAvailabilities(false)
      state.requestLoading.id = null
      state.requestLoading.date = null
    },
    getAvailability(gammaOffice, date){
      const fullDate = moment(date).format(dateFormat)
      const availability = state.dailyAvailabilities.find(daily => daily.gammaOfficeId == gammaOffice.id &&  moment(daily.availableDate).format(dateFormat) == fullDate  ) || null
      const result = {
        id: availability?.id || null,
        gammaOfficeId: gammaOffice.id,
        availableDate: fullDate,
        reservedQuantity: availability ? availability.reservedQuantity : 0,
        quantity: availability ? availability.quantity : gammaOffice.quantity,
        price: availability ? availability.price : gammaOffice.price,
        reason : availability?.reason || '',
      }
      return result
    },
    async getDailyAvailabilities(showLoading = true){
      if(!state.filterValues.office || !state.filterValues.date) return
      if(showLoading) state.loading = true

      const from = state.filterValues.date
      await services.getDailyAvailabilities({
        officeId: state.filterValues.office.id,
        from,
        to: moment(from).add(30, "days").format(dateFormat),
      }).then(response => {
        state.dailyAvailabilities = response || []
        if(showLoading) state.loading = false
      })
    },

    /* gamma office */
    async openModalGammaOffice(gammaOffice = false){
      if (gammaOffice){
        state.modelValues.gammaOffice = {...gammaOffice}
      } else {
        /* init form for new */
        state.modelValues.gammaOffice.quantity = null
        state.modelValues.gammaOffice.price = null
        state.modelValues.gammaOffice.gammaId = null
        state.modelValues.gammaOffice.tax = null
        state.modelValues.gammaOffice.id = null
      }
      state.modalGammaOffice.show = true
    },

    async getGammaOffices(){
      state.loading = true
      await services.getGammaOffice(state.filterValues.office).then(response => {
        if(response){
          const head = {title: '', gamma: null }
          state.rows = [head, ...response]
          state.gammaOffice = response
        }
      })
      state.loading = false
    },

    async createGammaOffice(){
      if( await refs.gammaOfficeForm.value.validate()){
        state.modalGammaOffice.show = false
        state.loading = true
        if(state.modelValues.gammaOffice.id){
          await services.updateGammaOffice(state.modelValues.gammaOffice.id, state.modelValues.gammaOffice).then( async (response)  => {
            await methods.getGammaOffices()
            await methods.getDailyAvailabilities()
          })
        } else {
          if(state.modelValues.gammaOffice.id){
            delete state.modelValues.gammaOffice.id
          }
          await services.createGammaOffice(state.modelValues.gammaOffice).then( async (response)  => {
            await methods.getGammaOffices()
            await methods.getDailyAvailabilities()
          })
        }
        state.loading = false
      }
    },

    /* reservations */
    getReservationsParams(gammaOfficeId, date){
      return {
        read: {
          requestParams: {
            include: 'pickupOffice,dropoffOffice,user',
            filter: {
              pickupDate: {where: 'date', value: date, operator: '<=' },
              dropoffDate: {where: 'date', value: date, operator: '>=' },
              gammaOfficeId: gammaOfficeId,
              statusId: {where: 'notIn', value: 2 }, //2 cancele statusID
            }
          },
          filters: null
        },
      }
    },

    /* utils */
    async updateDynamicFilterValues(values){
      if(state.filterValues.office != values.office){
        state.filterValues.office = values.office
        state.modelValues.gammaOffice.officeId = values.office
        await methods.getGammaOffices()
      }

      state.filterValues.date = values.date
      await methods.getDailyAvailabilities()
    },

    getNextDays(){
      if(!state.filterValues.date) return []
      const startDate = moment(state.filterValues.date)
      let nextDays = []

      for (let i = 0; i <= 30; i++) {
        let day = moment(startDate).add(i, "days");
        nextDays.push({
          fullDate: day.format(dateFormat),
          label: day.format("ddd"),
          date: day.format("D"),
          name: day.format("ddd")
        });
      }
      return nextDays
    },
    isWeekend(date){
      const day =  moment(date).isoWeekday()
      return (day == 6 ||  day == 7)
    },
    showSpinner(item, fullDate){
       return state.requestLoading.id == item.id && state.requestLoading.date == fullDate
    }
  }

  // Mounted
  onMounted(() => {
    methods.init()
  })

  // Watch
  // watch(key, (newField, oldField): void => {
  //
  // }, {deep: true})

  return {...refs, ...(toRefs(state)), ...computeds, ...methods}
}
