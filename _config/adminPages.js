
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

  gammas: {
    permission: 'irentcar.gammas.manage',
    activated: true,
    authenticated: true,
    path: '/rentcar/gammas/index',
    name: 'qrentcar.admin.gammas',
    crud : import('modules/qrentcar/_crud/gammas'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'irentcar.cms.sidebar.adminGammas',
    icon: 'fa-light fa-car',
    subHeader: {
        refresh: true,
    }
  },

  
}
