<template>
</template>
<script>

export default {
  data() {
    return {
      crudId: this.$uid()
    };
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        apiRoute: 'apiRoutes.qrentcar.reservations',
        permission: 'irentcar.reservations',
        create: false,
        read: {
          columns: [
            {
              name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'
            },
            {
              name: 'pickupDate', label: this.$tr('irentcar.cms.form.pickupDate'), field: 'pickupDate', align: 'rigth',
              format: val => val ? this.$trd(val) : '-'
            },
            {
              name: 'pickupOffice', label: this.$tr('irentcar.cms.form.pickupDate'), field: 'pickupOffice', align: 'rigth',
              format: val => val ? val.title : '-'
            },
            {
              name: 'dropoffDate', label: this.$tr('irentcar.cms.form.dropoffDate'), field: 'dropoffDate', align: 'rigth',
              format: val => val ? this.$trd(val) : '-'
            },

            {
              name: 'dropoffOffice', label: this.$tr('irentcar.cms.form.dropoffOffice'), field: 'dropoffOffice', align: 'rigth',
              format: val => val ? val.title : '-'
            },

            {
              name: 'statusId', label: this.$tr('isite.cms.form.status'), field: 'status', align: 'rigth',
              format: val => val ? val.title : '-'
            },            
            {
              name: 'gammaData', label: this.$tr('irentcar.cms.label.gamma'), field: 'gammaData', align: 'rigth',
              format: val => val ? val.title : '-'
            },
            {
              name: 'totalPrice', label: this.$tr('isite.cms.form.price'), field: 'totalPrice', align: 'rigth',
              format: val => parseFloat(val) ? this.$trn(parseFloat(val)) : '-'
            },
            {
              name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-'
            },
            {
              name: 'updated_at', label: this.$tr('isite.cms.form.updatedAt'), field: 'updatedAt', align: 'left',
              format: val => val ? this.$trd(val) : '-'
            },
            {
              name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'
            }
          ],
          requestParams: {
              include: 'pickupOffice,dropoffOffice',
              filter: {order: {field: 'pickupDate', way: 'desc'}}},
          filters: {}
        },
        update: {
          title: this.$tr('irentcar.cms.updateOffice'),
        },
        delete: false,
        formLeft: {
					statusId: {
            value: null,
            type: 'select',
            props: {
              label: this.$tr('isite.cms.form.status'),
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qrentcar.reservationStatuses'
            }
          }
        },
        formRight: {}
      };
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {};
    }
  }
};
</script>
