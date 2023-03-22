// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components

import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  invoice: getIcon('ic_invoice'),
  analytics: getIcon('ic_analytics'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      {
        title: 'Alunos',
        path: PATH_DASHBOARD.student.list,
      },

      {
        title: 'Professores',
        path: PATH_DASHBOARD.teacher.list,
      },

      {
        title: 'Turmas',
        path: PATH_DASHBOARD.class.list,
      },

      {
        title: 'Tarefas',
        path: PATH_DASHBOARD.task.list,
      },

      {
        title: 'Disciplinas',
        path: PATH_DASHBOARD.discipline.list,
      },

      {
        title: 'Entrega',
        path: PATH_DASHBOARD.deliveries.list,
      },
    ],
  },
];

export default navConfig;
