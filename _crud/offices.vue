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
        apiRoute: 'apiRoutes.qrentcar.offices',
        permission: 'irentcar.offices',
        create: {
          title: this.$tr('irentcar.cms.newOffice')
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
          requestParams: { include: 'locatable,translations' },
          filters: {
            countryId: {
              value: null,
              type: 'select',
              props: {
                label: this.$tr('ilocations.cms.form.country'),
                clearable: true
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qlocations.countries',
                requestParams: {include: 'translations'},
                select: { label: 'name', id: 'id' },
                filterByQuery: true
              }
            },
            provinceId: {
              value: null,
              type: 'select',
              props: {
                label: this.$tr('ilocations.cms.form.province'),
                clearable: true
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qlocations.provinces',
                requestParams: {include: 'translations'},
                select: { label: 'name', id: 'id' },
                filterByQuery: true
              }
            },
            cityId: {
              value: null,
              type: 'select',
              props: {
                label: this.$tr('isite.cms.form.city'),
                clearable: true
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qlocations.cities',
                requestParams: {include: 'translations'},
                select: { label: 'name', id: 'id' },
                filterByQuery: true
              }
            }
          }
        },
        update: {
          title: this.$tr('irentcar.cms.updateOffice'),
          requestParams: { include: 'locatable,translations' },
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
          },
					statusId: {
            value: 1,
            type: 'select',
            props: {
              label: this.$tr('isite.cms.form.status'),
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qrentcar.statuses'
            }
          },
        },
        formRight: {
          address: {
            value: '',
            type: 'input',
            fakeFieldName: 'locatable',
            props : {
              label: `${this.$tr('isite.cms.form.address')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            }
          },
          countryId: {
            value: null,
            type: 'select',
            fakeFieldName: 'locatable',
            props: {
              label: this.$tr('isite.cms.label.country'),
              clearable: true,
            },
            loadOptions: {
              filterByQuery: true,
              apiRoute: 'apiRoutes.qlocations.countries',
              requestParams: { include: 'translations' },
              select: { label: 'name', id: 'id' },
            },
          },
          provinceId: {
            value: null,
            type: 'select',
            fakeFieldName: 'locatable',
            props: {
              label: this.$tr('isite.cms.label.department'),
              readonly: this.crudInfo.locatable?.countryId ? false : true,
              clearable: true,
            },
            loadOptions: {
              apiRoute: this.crudInfo.locatable?.countryId
                ? 'apiRoutes.qlocations.provinces'
                : false,
              select: { label: 'name', id: 'id' },
              requestParams: {
                filter: { country: this.crudInfo.locatable?.countryId },
                include: 'translations'
              },
            },
          },
          cityId: {
            value: null,
            type: 'select',
            fakeFieldName: 'locatable',
            props: {
              label: this.$tr('isite.cms.form.city'),
              readonly: this.crudInfo.locatable?.provinceId ? false : true,
              clearable: true,
            },
            loadOptions: {
              apiRoute: this.crudInfo.locatable?.provinceId
                ? 'apiRoutes.qlocations.cities'
                : false,
              select: { label: 'name', id: 'id' },
              requestParams: {
                filter: { province_id: this.crudInfo.locatable?.provinceId },
                include: 'translations'
              },
            },
          },
					map: {
            value: null,
            type: 'positionMarkerMap',
            help: { description: this.$tr('icommerce.cms.form.mapHelp') },
            isFakeField: true,
            props: {
              label: `${this.$tr('isite.cms.label.search')}...`,
              emitDefault: (this.crudInfo.typeForm === 'create')
            }
          }

        },
        getDataForm(data, type) {
          return new Promise(resolve => {
            //replace name value
            if (data.options) {
              data.locatable.lat = data.options.map?.lat,
              data.locatable.lng = data.options.map?.lng
            }
            //Response
            resolve(data);
          });
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
