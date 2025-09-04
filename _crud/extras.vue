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
        apiRoute: 'apiRoutes.qrentcar.extras',
        permission: 'irentcar.extras',
        create: {
          title: this.$tr('irentcar.cms.newExtra')
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
          filters: {}
        },
        update: {
          title: this.$tr('irentcar.cms.updateExtra'),          
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
            value: '',
            type: 'input',
            props: {
              label: `${this.$tr('isite.cms.form.description')}*`,
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ]
            }
          },		
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
