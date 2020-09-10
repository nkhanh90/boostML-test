import NoAuthLayout from 'themes/NoAuth';

const routes = [
  {
    path: '/',
    isExact: true,
    noAuth: true,
    pageComponent: 'Images/list',
  },
  {
    path: '/image/:id',
    noAuth: true,
    pageComponent: 'Images',
  },
  {
    path: '/favorite-images',
    isExact: true,
    noAuth: true,
    pageComponent: 'Images/favorite',
  },
  {
    path: '*',
    layout: NoAuthLayout,
    pageComponent: 'App/views/notfound',
  },
];

export default routes;
