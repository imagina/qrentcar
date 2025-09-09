import {computed, reactive, ref, onMounted, toRefs, watch, getCurrentInstance} from "vue";
import services from 'modules/qrentcar/_pages/availability/services'
import moment from 'moment';

import { i18n } from 'src/plugins/utils';

export default function controller(props: any, emit: any) {

  const dateFormat = 'YYYY-MM-DD'

  // Refs
  const refs = {
    // refKey: ref(defaultValue)
  }

  // States
  const state = reactive({
    // Key: Default Value
    loading: false,
    title: 'Ready Rent Cars',

    dynamicFields: {      
      quantity: {
        type: 'input',
        props: {
          label: i18n.tr('isite.cms.form.quantity'),
          type: 'number',
          rules: [
            val => !!val || i18n.tr('isite.cms.message.fieldRequired'),
                val => /^[0-9]+$/.test(val) || 'Only digits allowed'

          ],
        }
      },
      price: {
        type: 'input',
        props: {
          label: i18n.tr('isite.cms.form.price'),
          type: 'number',
          rules: [
            val => !!val || i18n.tr('isite.cms.message.fieldRequired')
          ],
        }
      },
      reason: {
        type: 'input',
        props: {
          label: i18n.tr('isite.cms.form.reason'),
        }
      },
    },

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
        value: null,
        type: 'date',
        quickFilter: true,
        props: {
          label: i18n.tr('isite.cms.form.date'),
          mask: dateFormat
        }
      },
    },

    filterValues: {
      office: null,
      date: null
    },

  

    modelValues: {
      quantity: null,
      price: null,
      reason: null
    },

    gammaOffice: [],
    dailyAvailabilities: [],
    selectedOffice: null,
    selectedDate: null
  })

  // Computed
  const computeds = {
    // key: computed(() => {})
    showCalendar: computed(() => state.gammaOffice.length > 1 && !state.loading && state.filterValues.date ),
    nextDays: computed(() => methods.getNextDays())    
  }

  // Methods
  const methods = {
    // methodKey: () => {}
    init(){
      //state.loading = true

    },
    setAvailabilityModal(availability){
      state.modelValues.quantity = availability.quantity
      state.modelValues.price = availability.price
      state.modelValues.reason = availability.reason
    },
    async updateAvailability(availability){
      state.loading = true
      availability.quantity =  state.modelValues.quantity,
      availability.price =  state.modelValues.price
      availability.reason = state.modelValues.reason

      if(availability.id){
        await  services.updateAvailability(availability.id, {...availability})
      } else {
        delete availability.reservedQuantity
        await services.createAvailability(availability)
      }
      state.loading = false
      methods.getDailyAvailabilities()
    },
    getAvailability(gammaOffice, date){
      const fullDate = moment(date).format(dateFormat)
      const availability = state.dailyAvailabilities.find(daily => daily.gammaOfficeId == gammaOffice.id &&  moment(daily.availableDate).format(dateFormat) == fullDate  ) || null
      const result = {
        id: availability?.id || null,
        gammaOfficeId: gammaOffice.id,
        availableDate: fullDate,
        reservedQuantity: availability?.reservedQuantity || 0,
        quantity: availability?.quantity || gammaOffice.quantity,
        price: availability?.price || gammaOffice.price,
        reason : availability?.reason || '',
      }
      return result
    },
    async updateDynamicFilterValues(values){
      if(state.filterValues.office != values.office){
        state.filterValues.office = values.office
        await methods.getGammaOffice()
      }

      state.filterValues.date = values.date
      await methods.getDailyAvailabilities()
    }, 
    getDailyAvailabilities(){
      if(!state.filterValues.office || !state.filterValues.date) return
      state.loading = true
      const from = state.filterValues.date
      services.getDailyAvailabilities({
        officeId: state.filterValues.office.id,
        from,
        to: moment(from).add(30, "days").format(dateFormat),
      }).then(response => {
        state.dailyAvailabilities = response || []
        state.loading = false
      })
    },
    async getGammaOffice(){
      state.loading = true
      await services.getGammaOffice(state.filterValues.office).then(response => {
        if(response){
          state.gammaOffice = response
          state.gammaOffice.unshift({
            title: '',
            gamma: null
          })
        }
      })
      state.loading = false
    },
    getNextDays(){
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
