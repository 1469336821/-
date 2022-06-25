<template>
	<!-- 今日巡查记录 -->
	<view class="fill">
		<uni-row>
			<uni-col>
				<!-- 主体内容 -->
				<view class="content">
					<uni-row>
						<uni-col>
							<!-- 上边表框 -->
							<view class="top">
								<!-- 标题 -->
								<uni-row>
									<uni-col :span="15" :offset="7">
										<view class="top-title">
											历史巡查记录
										</view>
									</uni-col>
								</uni-row>
								<!-- 日期和星期 -->
								<uni-row>
									<view class="top-date">
										<!-- 日期 -->
										<uni-col :span="15" :offset="1">
											<uni-col :span="6">
												<view class="date">
													日期:
												</view>
											</uni-col>
											<uni-col :span="16">
												<view class="date-text">
													{{datalist.saveDate}}
												</view>
											</uni-col>
										</uni-col>
										<!-- 星期 -->
										<uni-col :span="8">
											<view class="week">
												星期: {{datalist.weekValue}}
											</view>
										</uni-col>
									</view>
								</uni-row>
								<!-- 校区 -->
								<uni-row>
									<uni-col :span="15" :offset="1">
										<view class="top-school">
											<uni-col :span="6">
												<view class="school">
													校区:
												</view>
											</uni-col>
											<uni-col :span="16">
												<view class="school-text">
													{{datalist.schoolName}}
												</view>
											</uni-col>
										</view>
									</uni-col>
								</uni-row>
								<!-- 列表 -->
								<uni-row>
									<uni-col :span="22" :offset="1">
										<view v-for="(item,index) in list" class="top-list">
											<uni-col :span="8">
												{{item.text}}
											</uni-col>
											<uni-col :span="15" :offset="1">
												<view @click="jump(item)" :class="{listvalue:item.bool}">
													{{item.value}}
												</view>
											</uni-col>
										</view>
									</uni-col>
								</uni-row>
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
				// 时间参数
				timer: null,
				// 星期几
				weekvalue: null,
				// 巡查反馈
				backtext: "",
				// 课间反馈
				classtext: "",
				// 列表
				listvalue: [],
				list: [{
						text: "0.晨读:",
						value: "未填写",
						bool: false
					},
					{
						text: "1.第一节课:",
						value: "未填写",
						bool: false
					},
					{
						text: "2.第二节课:",
						value: "未填写",
						bool: false
					},
					{
						text: "3.第三节课:",
						value: "未填写",
						bool: false
					},
					{
						text: "4.第四节课:",
						value: "未填写",
						bool: false
					},
					{
						text: "5.午餐反馈:",
						value: "未填写",
						bool: false
					},
					{
						text: "6.夕会:",
						value: "未填写",
						bool: false
					},
					{
						text: "7.第五节课:",
						value: "未填写",
						bool: false
					},
					{
						text: "8.第六节课:",
						value: "未填写",
						bool: false
					},
					{
						text: "9.日省:",
						value: "未填写",
						bool: false
					},
					{
						text: "10.放学:",
						value: "未填写",
						bool: false
					},
					{
						text: "11.班级卫生:",
						value: "未填写",
						bool: false
					},

				]
			}
		},
		computed: {
			...mapState(["schoolName", "datalist", "title", "id"])
		},
		onLoad() {
			this.setday()
			console.log(this.timer)
			console.log(this.schoolName)
			console.log(this.datalist)
			this.update()
		},
		methods: {
			...mapMutations(["changeId", "changeTitle"]),
			// 跳转
			jump(m) {
				console.log(m);
				let i = m.text.slice(0, m.text.indexOf("."));

				this.changeId(i)

				this.changeTitle(m.text.slice(m.text.indexOf(".") + 1))

				if (m.value == "已填写 —— 详情") {

					uni.navigateTo({
						url: "../showdetails/showdetails"
					})
				}

			},
			// 时间获取
			setday() {
				let now = new Date()
				let result = now.toLocaleString()
				console.log(result)
				// 世纪
				let y = now.getFullYear() - 2000
				console.log(y);
				// 年份
				let yy = now.getFullYear()
				// 月份
				let m = now.getMonth() + 1
				let mm = m < 9 ? "0" + m : m;
				console.log(m);
				// 日期
				let d = now.getDate() * 1
				let dd = d < 9 ? "0" + d : d;
				console.log(d);
				// 星期
				let w = (y + parseInt((y / 4)) + (26 * (m + 1) / 10) + d - 36) % 7
				console.log(w)
				this.timer = yy + "-" + mm + "-" + dd
				// 赋值
				let k = Math.floor(w)
				switch (k) {
					case 1:
						return this.weekvalue = "一"
					case 2:
						return this.weekvalue = "二"
					case 3:
						return this.weekvalue = "三"
					case 4:
						return this.weekvalue = "四"
					case 5:
						return this.weekvalue = "五"
					case 6:
						return this.weekvalue = "六"
					case 0:
						return this.weekvalue = "日"
				}

			},
			// 页面更新			
			update() {
				// 请求数据
				uni.request({
					method: "GET",
					url: this.URL + "/recordInfo/query/" + this.datalist.saveDate,
					data: {
						schoolName: this.datalist.schoolName
					},
					success(res) {
						console.log(res)
						console.log(res.data.data)
						// console.log(this.listvalue)
					}
				}).then((res) => {
					if (res.data.data) {
						this.listvalue = []
						res.data.data.forEach(item => {
							this.listvalue.push(item.courseValue)
						})
						// 渲染
						this.listvalue.forEach(item => {
							this.list[item].value = "已填写 —— 详情"
							this.list[item].bool = true
						})
					}
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
	.fill {
		width: 100%;
		min-height: 1500rpx;
		background-color: #9BC5E1;
		border-top: 1rpx solid transparent;

		// 主体
		.content {
			width: 94%;
			min-height: 1400rpx;
			margin: 0 auto;
			margin-top: 40rpx;
			font-size: 36rpx;

			// 上班表框
			.top {
				width: 100%;
				min-height: 1300rpx;
				border-radius: 15rpx;
				background-color: #fff;
				// border: 1rpx solid #999;

				// 标题
				.top-title {
					width: 100%;
					height: 40rpx;
					line-height: 40rpx;
					padding-top: 40rpx;
					font-size: 40rpx;
				}

				//日期和星期
				.top-date {
					width: 100%;
					height: 40rpx;
					margin-top: 40rpx;

					// 日期
					.date {
						width: 100%;
						height: 40rpx;
						line-height: 40rpx;
					}

					// 星期
					.date {
						width: 100%;
						height: 40rpx;
						line-height: 40rpx;
					}

					// 日期
					.date-text {
						width: 100%;
						height: 40rpx;
						line-height: 40rpx;
					}

				}

				// 校区
				.top-school {
					width: 100%;
					height: 40rpx;
					line-height: 40rpx;
					margin-top: 40rpx;

					// 校区
					.school {
						width: 100%;
						height: 40rpx;
						line-height: 40rpx;
					}

					// 校区文字
					.school-text {
						width: 100%;
						height: 40rpx;
						line-height: 40rpx;
					}

				}

				// 列表
				.top-list {
					width: 100%;
					height: 40rpx;
					line-height: 40rpx;
					margin-top: 40rpx;
					// border-bottom:1rpx solid #000 ;

					.listvalue {
						color: green;
					}
				}
			}
		}
	}
</style>
