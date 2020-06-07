/*以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，
主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
*/
export default {
	path: '/movie',
	component: () => import('@/views/Movie'),
	children: [{
			path: 'city',
			component: () => import('@/components/City')
		},
		{
			path: 'nowPlaying',
			component: () => import('@/components/NowPlaying')
		},
		{
			path: 'comingSoon',
			component: () => import('@/components/ComingSoon')
		},
		{
			path: 'search',
			component: () => import('@/components/Search')
		},
		{
			path: 'detail/1/:movieId',
			components: {
				default: () => import('@/components/NowPlaying'),
				detail: () => import('@/views/Movie/detail')
			},
			props: {
				detail: true
			}
		},
		{
			path: 'detail/2/:movieId',
			components: {
				default: () => import('@/components/ComingSoon'),
				detail: () => import('@/views/Movie/detail')
			},
			props: {
				detail: true
			}
		},
		{
			path: '/movie',//“/”开头的嵌套路径会被当作根路径，
			redirect: '/movie/nowPlaying'
		}
	]
}
