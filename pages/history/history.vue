<template>
	<!-- 历史记录 -->
	<view class="history">
		<uni-row>
			<uni-col>
				<!-- 主体内容 -->
				<view class="content">
					<!-- 标题 -->
					<uni-row>
						<view class="header">
							<uni-col :span="6" :offset="1">
								<view @click="jumpback()" class="header-back">
									填报首页
								</view>
							</uni-col>
							<uni-col :span="12">
								<view class="header-title">
									校务巡查
								</view>
							</uni-col>
						</view>
					</uni-row>

					<!-- 校区选择 -->
					<uni-row>
						<uni-col>
							<view class="school-select">
								<picker @change="onchange($event,index)" :value="index" mode="selector" :range="schoolarr">
									<view>
										<uni-col :span="20" :offset="1">
											<input class="message" :value="schoolName" placeholder="请选择校区" />
										</uni-col>
										<uni-col :span="3">
											<view>
												<uni-icons type="bottom" size="15"></uni-icons>
											</view>
										</uni-col>
									</view>
								</picker>
							</view>
						</uni-col>
					</uni-row>

					<!-- 开始日期 -->
					<uni-row>
						<uni-col>
							<view class="start">
								<uni-datetime-picker @change="change1($event)" type="date" :clear-icon="true"
									v-model="single1" />
							</view>
						</uni-col>
					</uni-row>
					<!-- 结束日期 -->
					<uni-row>
						<uni-col>
							<view class="end">
								<uni-datetime-picker @change="change2($event)" type="date" :clear-icon="true"
									v-model="single2" />
							</view>
						</uni-col>
					</uni-row>
					<!-- 渲染列表 -->
					<uni-row>
						<uni-col>
							<view v-for="(item,index) in listarr" class="list">
								<uni-col :span="6">
									<view class="list-text">
										{{item.schoolName}}
									</view>
								</uni-col>
								<uni-col :span="6">
									<view class="list-text">
										{{item.saveDate}}
									</view>
								</uni-col>
								<uni-col :span="6">
									<view class="list-text">
										星期{{item.weekValue}}
									</view>
								</uni-col>
								<uni-col :span="6">
									<view @click="jump(item)" class="list-text">
										{{item.text}}
									</view>
								</uni-col>
							</view>
							<view class="footer-text">
								下拉加载更多
							</view>
						</uni-col>
					</uni-row>
				</view>
			</uni-col>
		</uni-row>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				// url
				// URL: "http://192.168.0.16:8081",
				URL: "http://81.69.59.23:8081",
				// 校区
				index:null,
				schoolName: null,
				schoolarr: ["南校区","北校区"],
				// 开始时间
				single1: null,
				m: 0,
				// 结束时间
				single2: null,
				n: 0,
				// 列表
				listarr: []
			}
		},
		computed: {
			...mapState(["datalist"])
		},
		methods: {
			...mapMutations(["changesaveDate"]),
			// 跳转到详情页面
			jump(m) {
				this.changesaveDate(m)

				uni.navigateTo({
					url: "../historydetails/historydetails"
				})
			},
			// 回到首页
			jumpback() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 校区选择
			onchange(e) {
			    let i = e.target.value;
				this.index = i
			    this.schoolName = this.schoolarr[i]
			    this.update()
			},
			// 开始时间
			change1(e) {
				console.log(e)
				this.single1 = e
				console.log(this.single1)
				this.m = 1
				this.update()
			},
			// 结束时间
			change2(e) {
				console.log(e)
				this.single2 = e
				console.log(this.single2)
				this.n = 1
				this.update()
			},
			// 请求数据
			update() {
				if (this.schoolName) {
					if (this.m + this.n == 2) {
						uni.request({
							method: "GET",
							url: this.URL + "/record/query/" + this.single1 + "/" + this.single2,
							data: {
								schoolName: this.schoolName
							},
							success(res) {
								console.log(res)
							}
						}).then((res) => {
							console.log(res.data.data)
							if (res.data.data) {
								this.listarr = []
								this.listarr = res.data.data
								this.listarr.forEach(item => {
									item.text = "详情"
								})
							}
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.history {
		width: 100%;
		min-height: 1500rpx;
		background-color: #9BC5E1;
		border-top: 1rpx solid transparent;

		// 主体内容
		.content {
			width: 96%;
			min-height: 800rpx;
			margin: 0 auto;
			margin-top: 40rpx;
			font-size: 30rpx;

			// 标题
			.header {
				width: 100%;
				height: 60rpx;

				.header-back {
					width: 100%;
					height: 60rpx;
					line-height: 60rpx;
				}

				.header-title {
					width: 100%;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					font-size: 40rpx;
				}
			}

			// 校区选择
			.school-select {
			    width: 100%;
			    height: 80rpx;
			    line-height: 80rpx;
			    margin-top: 40rpx;
			    border-radius: 10rpx;
			    background-color: #fff;
			    color: #000;
			
			    .message{
			   		margin-top: 10rpx;
			    }
			}

			// 开始时间
			.start {
				width: 100%;
				height: 100rpx;
				margin-top: 40rpx;
			}

			// 结束时间
			.end {
				width: 100%;
				height: 100rpx;
				margin-top: 20rpx;
			}

			// 列表
			.list {
				width: 100%;
				height: 100rpx;
				// border: 1rpx solid #000;
				border-radius: 10rpx;
				margin-top: 40rpx;
				background-color: #fff;

				.list-text {
					width: 100%;
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;

				}
			}

			// 下拉加载更多
			.footer-text {
				width: 100%;
				height: 60rpx;
				line-height: 60rpx;
				margin-top: 60rpx;
				text-align: center;
			}
		}
	}
</style>
