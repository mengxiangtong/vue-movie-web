<template>
	<div class="cinema_body">
		<Loading v-if="isLoading" />
		<Scroller v-else>
			<ul>
				<li>
					<div>
						<span>大地影院(澳东世纪店)</span>
						<span class="q"><span class="price">22.9</span> 元起</span>
					</div>
					<div class="address">
						<span>金州区大连经济技术开发区澳东世纪3层</span>
						<span>1763.5km</span>
					</div>
					<div class="card">
						<div>小吃</div>
						<div>折扣卡</div>
					</div>
				</li>
				<li v-for="item in cinemaList" :key="item.id">
					<div>
						<span>{{ item.nm }}</span>
						<span class="q"><span class="price">{{ item.sellPrice }}</span> 元起</span>
					</div>
					<div class="address">
						<span>{{ item.addr }}</span>
						<span>{{ item.distance }}</span>
					</div>
					<div class="card">
						<div v-for="(num,key) in item.tag" v-if="num===1" :key="key" :class=" key | classCard ">{{ key | formatCard }}</div>
					</div>
				</li>
			</ul>
		</Scroller>
	</div>
</template>

<script>
	export default {
		name: 'CiList',
		data() {
			return {
				cinemaList: [],
				isLoading: true,
				prevCityId: -1
			};
		},
		beforeCreate: function() {
			//实例创建前 创建前） 在数据观测和初始化事件还未开始

		},
		created: function() {
			// `this` 指向 vm 实例
			//在这个生命阶段，对象及其事件完全初始化
			//created()方法是此时已经初始化好了Vue对象，这是最早能操作data中数据和methods中方法的地方
			//created（创建后） 完成数据观测，属性和方法的运算，初始化事件，$el属性还没有显示出来

			console.log('----CiList---created---a is: ' + this.a)
		},
		beforeMount() {
			//beforeMount（载入前） 在挂载开始之前被调用，相关的render函数首次被调用。实例已完成以下的配置：
			//编译模板，把data里面的数据和模板生成html。注意此时还没有挂载html到页面上。

			console.log('----CiList---beforeMount---a is: ' + this.a)

		},
		mounted() {
			//mounted（载入后） 在el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：
			//用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html页面中。此过程中进行ajax交互。

			console.log('----CiList---mounted---a is: ' + this.a)


		},
		beforeUpdate() {
//beforeUpdate（更新前） 在数据更新之前调用，发生在虚拟DOM重新渲染和打补丁之前。
//可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程。

		},
		updated() {
			//updated（更新后） 在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。
			//调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，
			//因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。

		},
		destroyed() {
			//destroyed（销毁后） 在实例销毁之后调用。调用后，所有的事件监听器会被移除，所有的子实例也会被销毁。
			//该钩子在服务器端渲染期间不被调用。

		},
		activated() {

			var cityId = this.$store.state.city.id;
			if (this.prevCityId === cityId) {
				return;
			}
			this.isLoading = true;

			this.axios.get('/api/cinemaList?cityId=' + cityId).then((res) => {
				var msg = res.data.msg;
				if (msg === 'ok') {
					this.cinemaList = res.data.data.cinemas;
					this.isLoading = false;
					this.prevCityId = cityId
				}
			});
		},
		filters: {
			formatCard(key) {
				var card = [{
						key: 'allowRefund',
						value: '改签'
					},
					{
						key: 'endorse',
						value: '退'
					},
					{
						key: 'sell',
						value: '折扣卡'
					},
					{
						key: 'snack',
						value: '小吃'
					}
				];
				for (var i = 0; i < card.length; i++) {
					if (card[i].key === key) {
						return card[i].value;
					}
				}
				return '';
			},
			classCard(key) {
				var card = [{
						key: 'allowRefund',
						value: 'bl'
					},
					{
						key: 'endorse',
						value: 'bl'
					},
					{
						key: 'sell',
						value: 'or'
					},
					{
						key: 'snack',
						value: 'or'
					}
				];
				for (var i = 0; i < card.length; i++) {
					if (card[i].key === key) {
						return card[i].value;
					}
				}
				return '';
			}



		}
	}
</script>

<style scoped>
	#content .cinema_body {
		flex: 1;
		overflow: auto;
	}

	.cinema_body ul {
		padding: 20px;
	}

	.cinema_body li {
		border-bottom: 1px solid #e6e6e6;
		margin-bottom: 20px;
	}

	.cinema_body div {
		margin-bottom: 10px;
	}

	.cinema_body .q {
		font-size: 11px;
		color: #f03d37;
	}

	.cinema_body .price {
		font-size: 18px;
	}

	.cinema_body .address {
		font-size: 13px;
		color: #666;
	}

	.cinema_body .address span:nth-of-type(2) {
		float: right;
	}

	.cinema_body .card {
		display: flex;
	}

	.cinema_body .card div {
		padding: 0 3px;
		height: 15px;
		line-height: 15px;
		border-radius: 2px;
		color: #f90;
		border: 1px solid #f90;
		font-size: 13px;
		margin-right: 5px;
	}

	.cinema_body .card div.or {
		color: #f90;
		border: 1px solid #f90;
	}

	.cinema_body .card div.bl {
		color: #589daf;
		border: 1px solid #589daf;
	}
</style>
