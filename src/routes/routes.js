// src/routes/routes.js
import Home from '../pages/Home/Home';
import FamilyTree from '../pages/Family Tree/FamilyTree';
import Committee from '../pages/Committee/Committee';
import History from '../pages/History/History';

const routes = [
  {
    path: '/',
    element: <Home />,
    exact: true,
  },
  {
    path: '/family-tree',
    element: <FamilyTree />,
  },
  {
    path: '/committee',
    element: <Committee />,
  },
  {
    path: '/history',
    element: <History />,
  }
];

export default routes;
