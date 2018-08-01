import Main from '@/views/main'

const _import = (comp) => import(`@/views/${comp}`)

export default [
  {
    path: '/',
    name: 'main',
    redirect: { name: 'home' },
    mate: {},
    component: Main,
    children: [
      {
        path: 'home',
        name: 'home',
        mate: {},
        component: () => _import('home')
      },
      {
        path: 'user',
        name: 'user',
        mate: {},
        component: () => _import('user/user-center')
      },
      {
        path: 'search',
        name: 'search',
        mate: {},
        component: () => _import('search/search')
      }
    ]
  },
  {
    path: '/topic/:id',
    name: 'topicDetail',
    mate: {},
    component: () => _import('home/components/topic-detail')
  }
]
