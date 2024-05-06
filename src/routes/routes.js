// src/routes/routes.js
import Home from '../pages/Home/Home';
import FamilyTree from '../pages/Family Tree/FamilyTree';

const routes = [
  {
    path: '/',
    element: <Home />,
    exact: true,
  },
  {
    path: '/family-tree',
    element: <FamilyTree />,
  }
];

export default routes;
