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
      offices: {
        value: null,
        type: 'select',
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
        props: {
          label: i18n.tr('isite.cms.form.date'),
          mask: dateFormat
        }
      }
    },
    gammaOffice: [],
    dailyAvailabilities: [],
    selectedOffice: null,
    selectedDate: null
  })

  // Computed
  const computeds = {
    // key: computed(() => {})
    isOfficeSelected: computed(() => state.selectedOffice),
    nextDays: computed(() => methods.getNextDays()),
    /*
    cols: computed(() => {
      return methods.getNextDays().map(day => {
        return {
          name: day.date, 
          label: day.date, 
          field: 'value'
        }
      })
    }),
    rows: computed(() => {
      return state.dailyAvailabilities.map(day => {
        return {
          value: day.quantity
        }
      })
    })
      */
  }

  // Methods
  const methods = {
    // methodKey: () => {}
    init(){
      //state.loading = true

    },
    getAvailability(gammaOfficeId, date){
      const fullDate = moment(date).format(dateFormat)
      return state.dailyAvailabilities.filter(daily => daily.gammaOfficeId == gammaOfficeId &&  moment(daily.date).format(dateFormat) == fullDate  )
    },
    getDailyAvailabilities(){
      const ids = state.gammaOffice.map(gamma => gamma.id)
      if(!ids.length) return
      state.loading = true
      const from = state.selectedDate
      services.getDailyAvailabilities({
        ids,
        from,
        to: moment(from).add(30, "days").format(dateFormat),
      }).then(response => {
        state.dailyAvailabilities = response || []
        state.loading = false
        console.log(response)
      })
    },
    getGammaOffice(){
      services.getGammaOffice(state.selectedOffice).then(response => {
        if(response){
          state.gammaOffice = response
        }
      })
    },
    getNextDays(){
      const startDate = moment(state.selectedDate)
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
