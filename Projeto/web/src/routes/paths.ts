// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
};

export const PATH_PAGE = {
  page404: '/404',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
  student: {
    list: path(ROOTS_DASHBOARD, '/student/list'),
    new: path(ROOTS_DASHBOARD, '/student/new'),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/student/${id}/edit`),
    view: (id: number) => path(ROOTS_DASHBOARD, `/student/${id}`),
  },
  teacher: {
    list: path(ROOTS_DASHBOARD, '/teacher/list'),
    new: path(ROOTS_DASHBOARD, '/teacher/new'),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/teacher/${id}/edit`),
    view: (id: number) => path(ROOTS_DASHBOARD, `/teacher/${id}`),
  },

  class: {
    list: path(ROOTS_DASHBOARD, '/class/list'),
    new: path(ROOTS_DASHBOARD, '/class/new'),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/class/${id}/edit`),
    view: (id: number) => path(ROOTS_DASHBOARD, `/class/${id}`),
  },

  task: {
    list: path(ROOTS_DASHBOARD, '/task/list'),
    new: path(ROOTS_DASHBOARD, '/task/new'),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/task/${id}/edit`),
    view: (id: number) => path(ROOTS_DASHBOARD, `/task/${id}`),
  },

  discipline: {
    list: path(ROOTS_DASHBOARD, '/discipline/list'),
    new: path(ROOTS_DASHBOARD, '/discipline/new'),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/discipline/${id}/edit`),
    view: (id: number) => path(ROOTS_DASHBOARD, `/discipline/${id}`),
  },

  deliveries: {
    list: path(ROOTS_DASHBOARD, '/deliveries/list'),
    new: path(ROOTS_DASHBOARD, '/deliveries/new'),
    edit: (id: number) => path(ROOTS_DASHBOARD, `/deliveries/${id}/edit`),
    view: (id: number) => path(ROOTS_DASHBOARD, `/deliveries/${id}`),
  },
};
