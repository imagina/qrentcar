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
        apiRoute: 'apiRoutes.qrentcar.gammaOfficeExtra',
        permission: 'irentcar.gammaofficeextras',
        create: {
          title: this.$tr('irentcar.cms.newExtra')
        },
        read: {
          columns: [            
            {
              name: 'id', label: this.$tr('isite.cms.form.id'), field: 'id', style: 'width: 50px'
            },
            {
              name: 'title', label: this.$tr('isite.cms.form.title'), field: 'extra', align: 'left',
              format: val => val ? val.title : '-'
            },
            {
              name: 'price', label: this.$tr('isite.cms.form.price'), field: 'price', align: 'left',
            },
            {
              name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'
            }
          ],           
          filters: {},
          search: false,
        },
        update: {
          title: this.$tr('irentcar.cms.updateExtra'),
        },
        delete: true,
        formLeft: {                              
        },
        formRight: {},
      };
    },    
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {};
    }
  }
};
</script>
