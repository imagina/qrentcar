
export default {

 offices: {
    permission: 'irentcar.offices.manage',
    activated: true,
    authenticated: true,
    path: '/rentcar/offices/index',
    name: 'qrentcar.admin.offices',
    crud : import('modules/qrentcar/_crud/offices'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'irentcar.cms.sidebar.adminOffices',
    icon: 'fa-light fa-buildings',
    subHeader: {
        refresh: true,
    }
  },

  
}
