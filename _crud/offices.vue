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
          requestParams: {
            //include: ''
          },
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
                select: { label: 'name', id: 'id' }
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
                select: { label: 'name', id: 'id' }
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
                select: { label: 'name', id: 'id' }
              }
            }
          }
        },
        update: {
          title: this.$tr('irentcar.cms.updateOficce'),
          requestParams: {
            //include: ''
          },
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
            value: null,
            type: 'select',
            props: {
              label: this.$tr('isite.cms.form.status'),
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qblog.statuses'
            }
          },
        },
        formRight: {
          countryId: {
            value: null,
            type: 'select',
            props: {
              label: this.$tr('isite.cms.label.country')
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qlocations.countries',
							requestParams: { 
                include: 'translations',
							},
              select: { label: 'name', id: 'id' }
            }
          },
          provinceId: {
            value: null,
            type: 'select',
            props: {
              label: this.$tr('isite.cms.label.department'),
              readonly: (this.crudInfo.countryId ? false : true)
            },
            loadOptions: {
              apiRoute: this.crudInfo.countryId ? 'apiRoutes.qlocations.provinces' : false,
              select: { label: 'name', id: 'id' },
              requestParams: { 
                include: 'translations',
                filter: { country: this.crudInfo.countryId } 
                }
            }
          },
          cityId: {
            value: null,
            type: 'select',
            props: {
              label: this.$tr('isite.cms.form.city'),
              readonly: (this.crudInfo.provinceId ? false : true)
            },
            loadOptions: {
              apiRoute: this.crudInfo.provinceId ? 'apiRoutes.qlocations.cities' : false,
              select: { label: 'name', id: 'id' },
              requestParams: { 
								include: 'translations',
								filter: { province_id: this.crudInfo.provinceId } 
							}
            }
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
            console.log(data)
						//replace name value
            if (data.options) {
							data.locatable = {
								countryId: data.options.countryId,
								provinceId: data.options.provinceId,
								cityId: data.options.cityId,
								lat: data.options.map?.lat,
								lng: data.options.map?.lng
							}                            
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
