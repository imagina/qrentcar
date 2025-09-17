<template>
</template>
<script>
import moment from 'moment';

const colors = [
  'tw-bg-orange-400',
  'tw-bg-sky-400',
  'tw-bg-red-600',
  'tw-bg-green-400',
];

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
              name: 'pickupDate', label: this.$tr('irentcar.cms.form.pickupDate'), field: 'pickupDate', align: 'center',
              format: val => val ?  `${moment(val).format('l')} ${moment(val).format('LT')} `  : '-'
            },
            {
              name: 'pickupOffice', label: this.$tr('irentcar.cms.form.pickupOffice'), field: 'pickupOffice', align: 'rigth',
              format: val => val ? val.title : '-'
            },
            {
              name: 'dropoffDate', label: this.$tr('irentcar.cms.form.dropoffDate'), field: 'dropoffDate', align: 'center',
              format: val => val ?  `${moment(val).format('l')} ${moment(val).format('LT')} `  : '-'
            },

            {
              name: 'dropoffOffice', label: this.$tr('irentcar.cms.form.dropoffOffice'), field: 'dropoffOffice', align: 'rigth',
              format: val => val ? val.title : '-'
            },

            {
              name: 'rentalDays', label: this.$tr('irentcar.cms.form.rentalDays'), field: 'rentalDays', align: 'center'
            },

            {
              name: 'statusId', label: this.$tr('isite.cms.form.status'), field: 'status', align: 'rigth',
              format: val => val ?  `<div class="${colors[val.id]} tw-p-2 tw-rounded-md tw-text-white">${val.title}</div>`    : '-'
            },

            {
              name: 'user', label: this.$tr('isite.cms.label.user'), field: 'user', align: 'rigth',
              format: val => val ? `${val.fullName} : ${val.email}` : '-'
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
              name: 'extrasData', label: this.$tr('irentcar.cms.label.extras'), field: 'extrasData', align: 'rigth',
              format: val =>  val.map(x =>  x.extra.title).join(', ')
            },

            /*
            {
              name: 'created_at', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt', align: 'left',
              format: val => val ? this.$trd(val) : '-'
            },
            {
              name: 'updated_at', label: this.$tr('isite.cms.form.updatedAt'), field: 'updatedAt', align: 'left',
              format: val => val ? this.$trd(val) : '-'
            },
            */
            {
              name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'
            }
          ],
          requestParams: {
              include: 'pickupOffice,dropoffOffice,user',
              filter: {order: {field: 'pickupDate', way: 'desc'}}
            },
          filters: {
            officeId: {
              value: null,
              type: 'select',
              props: {
                label: this.$tr('irentcar.cms.label.office'),
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qrentcar.offices',
                select: {label: 'title', id: 'id'}
              }
            }
          }
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
