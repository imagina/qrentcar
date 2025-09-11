
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

  extras: {
    permission: 'irentcar.extras.manage',
    activated: true,
    authenticated: true,
    path: '/rentcar/extras/index',
    name: 'qrentcar.admin.extras',
    crud : import('modules/qrentcar/_crud/extras'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'irentcar.cms.sidebar.adminExtras',
    icon: 'fa-light fa-sliders',
    subHeader: {
      refresh: true,
    }
  },

  availability: {
    permission: 'irentcar.dailyavailabilities.manage',
    activated: true,
    authenticated: true,
    path: '/rentcar/availability/index',
    name: 'qrentcar.admin.availability',
    page: () => import('modules/qrentcar/_pages/availability'),
    layout: () => import('layouts/master.vue'),
    title: 'irentcar.cms.sidebar.adminAvailability',
    icon: 'fa-light fa-table',
    subHeader: {
      refresh: true,
    }
  },

  reservations: {
    permission: 'irentcar.reservations.manage',
    activated: true,
    authenticated: true,
    path: '/rentcar/reservations/index',
    name: 'qrentcar.admin.reservations',
    crud : import('modules/qrentcar/_crud/reservations'),
    page: () => import('modules/qcrud/_pages/admin/crudPage'),
    layout: () => import('layouts/master.vue'),
    title: 'irentcar.cms.sidebar.adminReservations',
    icon: 'fa-light fa-calendar-days',
    subHeader: {
      refresh: true,
    }
  }
}
