import pages from 'src/setup/pages'

//task
export default [
    {
      title: 'irentcar.cms.sidebar.adminGroup',
      icon: 'fa-light fa-car-side',
      children: [
        pages.qrentcar.offices,
        pages.qrentcar.gammas,
        pages.qrentcar.extras,
        pages.qrentcar.availability,
        pages.qrentcar.reservations
      ]
    },
  ]
  