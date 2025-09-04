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
        apiRoute: 'apiRoutes.qrentcar.gammas',
        permission: 'irentcar.gammas',
        create: {
          title: this.$tr('irentcar.cms.newGamma')
        },
        read: {
          columns: [
            {
              name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'
            },
						{
              name: 'title', label: this.$tr('isite.cms.form.title'), field: 'title', align: 'rigth'
            },
						{
              name: 'passengersNumber', label: this.$tr('irentcar.cms.form.passengersNumber'), field: 'passengersNumber', align: 'center',
            },

						{
              name: 'doors', label: this.$tr('irentcar.cms.form.doors'), field: 'doors', align: 'center',
            },
						{
              name: 'luggage', label: this.$tr('irentcar.cms.form.luggages'), field: 'luggage', align: 'center',
            },
						{
              name: 'vehicleType', label: this.$tr('irentcar.cms.form.vehicleType'), field: 'vehicleType', align: 'left',
              format: val => val ? val.title : '-'
            },
						{
              name: 'fuelType', label: this.$tr('irentcar.cms.form.fuelType'), field: 'fuelType', align: 'left',
              format: val => val ? val.title : '-'
            },

            {
              name: 'transmissionType', label: this.$tr('irentcar.cms.form.transmissionType'), field: 'transmissionType', align: 'left',
              format: val => val ? val.title : '-'
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
          filters: {
						transmissionTypeId: {
							value: null,
							type: 'select',
							props: {
								label: this.$tr('irentcar.cms.form.transmissionType'),
							},
							loadOptions: {
								apiRoute: 'apiRoutes.qrentcar.transmissionTypes'
							}
						},
						fuelTypeId: {
							value: null,
							type: 'select',
							props: {
								label: this.$tr('irentcar.cms.form.fuelType'),
							},
							loadOptions: {
								apiRoute: 'apiRoutes.qrentcar.fuelTypes'
							}
						},
						vehicleTypeId: {
							value: null,
							type: 'select',
							props: {
								label: this.$tr('irentcar.cms.form.vehicleType'),
							},
							loadOptions: {
								apiRoute: 'apiRoutes.qrentcar.vehicleTypes'
							}
						},
          }
        },
        update: {
          title: this.$tr('irentcar.cms.updateGamma'),
        },
        delete: true,
        formLeft: {
          title: {
            value: '',
            type: 'input',
            props: {
              label: `${this.$tr('isite.cms.form.title')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ]
            }
          },
          summary: {
            value: '',
            type: 'input',
            props: {
              label: `${this.$tr('isite.cms.form.summary')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ]
            }
          },
          description: {
            name : "description",
            value: '',
            type: 'html',
            props: {
              label: `${this.$tr('isite.cms.form.description')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          }
        },
        formRight: {
          transmissionTypeId: {
            value: null,
            type: 'select',
            props: {
              label: this.$tr('irentcar.cms.form.transmissionType'),
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qrentcar.transmissionTypes'
            }
          },
          fuelTypeId: {
            value: null,
            type: 'select',
            props: {
              label: this.$tr('irentcar.cms.form.fuelType'),
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qrentcar.fuelTypes'
            }
          },
          vehicleTypeId: {
            value: null,
            type: 'select',
            props: {
              label: this.$tr('irentcar.cms.form.vehicleType'),
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qrentcar.vehicleTypes'
            }
          },
          passengersNumber: {
            value: '0',
            type: 'input',
            props: {
              label: this.$tr('irentcar.cms.form.passengersNumber'),
              type: 'number'
            }
          },
          luggage: {
            value: '0',
            type: 'input',
            props: {
              label: this.$tr('irentcar.cms.form.luggages'),
              type: 'number'
            }
          },
          doors: {
            value: '0',
            type: 'input',
            props: {
              label: this.$tr('irentcar.cms.form.doors'),
              type: 'number'
            }
          },
          mediasSingle: {
            value: {},
            type: 'media',
            props: {
              label: this.$tr('isite.cms.form.image'),
              zone: 'mainimage',
              entity: "Modules\\Irentcar\\Models\\Gamma",
              entityId: null
            }
          }
        }
      };
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {};
    }
  }
};
</script>
