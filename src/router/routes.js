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
        path: 'about',
        name: 'about',
        mate: {},
        component: () => _import('about')
      },
      {
        path: 'test1',
        name: 'test1',
        mate: {},
        component: () => _import('t/t1')
      },
      {
        path: 'test2',
        name: 'test2',
        mate: {},
        component: () => _import('t/t2')
      }
    ]
  },
  {
    path: '/topic/:id',
    name: 'topicDetail',
    mate: {},
    component: () => _import('topic/topic-detail')
  }
]
