<template>
	<!-- 首页 -->
	<view class="app">
		<uni-row>
			<uni-col>
				<!-- 主体内容 -->
				<view class="content">

					<!-- 标题 -->
					<uni-row>
						<uni-col :span="8" :offset="8">
							<view class="title1">
								校务巡查
							</view>
						</uni-col>
						<uni-col :span="7">
							<view @click="jumphistory()" class="title2">
								历史记录
							</view>
						</uni-col>
					</uni-row>

					<!-- 校区选择 -->
					<uni-row>
						<uni-col>
							<view class="school-select">
								<picker @change="onchange($event,index)" :value="number" mode="selector"
									:range="schoolarr">
									<view>
										<uni-col :span="20" :offset="1">
											<input class="message" :value="schoolId" placeholder="请选择校区" />
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

					<!-- 表格 -->
					<uni-row>
						<uni-col>
							<view class="form">
								<!-- 表格列表 -->
								<view v-for="(item,index) in listarr" class="list">
									<uni-row>
										<!-- 序号 -->
										<uni-col :span="4" :offset="1">
											<view class="part">
												{{item.index}}
											</view>
										</uni-col>
										<!-- 标题 -->
										<uni-col :span="6">
											<view style="text-align:left;" class="part">
												{{item.title}}
											</view>
										</uni-col>
										<!-- 图标 -->
										<uni-col :span="5" :offset="3">
											<view v-if="item.bool" class="part">
												<uni-icons color="#75C3A1" type="checkbox-filled" size="30"></uni-icons>
											</view>
											<view v-else class="part">
												<uni-icons color="#C8C1C1" type="more-filled" size="30"></uni-icons>
											</view>
										</uni-col>
										<!-- 描述 -->
										<uni-col :span="4">
											<view @click="jumpdetails(item)" v-if="item.bool"
												style="color: #C8C1C1;text-align: center;" class="part">
												详情
											</view>
											<view v-else @click="jumpfill(item)"
												style="color: #C8C1C1;text-align: center;" class="part">
												未填写
											</view>

										</uni-col>
									</uni-row>
								</view>
							</view>
						</uni-col>
					</uni-row>

					<!-- 提交按钮 -->
					<uni-row>
						<uni-col>
							<view @click="pushrecord()" class="pushbtn">
								合并推送
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
				// 拿到渲染的值
				listvalue: [],
				// url
				// URL: "http://192.168.0.16:8081",
				URL: "http://81.69.59.23:8081",
				// 时间
				timer: null,
				// 校区
				number: null,
				schoolId: null,
				schoolarr: ["南校区", "北校区"],
				// 列表
				listarr: [{
						index: 0,
						title: "晨读",
						bool: false,
						text: "晨读巡查填报"
					},
					{
						index: 1,
						title: "第一节课",
						bool: false,
						text: "第一节课巡查填报"
					},
					{
						index: 2,
						title: "第二节课",
						bool: false,
						text: "第二节课巡查填报"
					},
					{
						index: 3,
						title: "第三节课",
						bool: false,
						text: "第三节课巡查填报"
					},
					{
						index: 4,
						title: "第四节课",
						bool: false,
						text: "第四节课巡查填报"
					},
					{
						index: 5,
						title: "午餐反馈",
						bool: false,
						text: "午餐反馈巡查填报"
					},
					{
						index: 6,
						title: "夕会",
						bool: false,
						text: "夕会巡查填报"
					},
					{
						index: 7,
						title: "第五节课",
						bool: false,
						text: "第五节课巡查填报"
					},
					{
						index: 8,
						title: "第六节课",
						bool: false,
						text: "第六节课巡查填报"
					},
					{
						index: 9,
						title: "日省",
						bool: false,
						text: "日省巡查填报"
					},
					{
						index: 10,
						title: "放学",
						bool: false,
						text: "放学巡查填报"
					},
					{
						index: 11,
						title: "班级卫生",
						bool: false,
						text: "班级卫生巡查填报"
					},
					{
						index: 12,
						title: "重大事件",
						bool: false,
						text: "重大事件巡查填报"
					}
				]
			}
		},
		onLoad() {
			this.setday()
			this.search()
		},
		computed: {
			...mapState(["index", "text", "schoolName"])
		},
		methods: {
			...mapMutations(["changeindex", "changetext", "changeschoolName"]),

			// 时间获取
			setday() {
				let now = new Date()
				let result = now.toLocaleString()
				// 年份
				let y = now.getFullYear()
				// 月份
				let m = now.getMonth() + 1
				m = m < 10 ? "0" + m : m
				// 日期
				let d = now.getDate()
				// 赋值
				this.timer = y + "-" + m + "-" + d
			},
			// 查询
			search() {
				// 请求数据
				uni.request({
					method: "GET",
					url: this.URL + "/recordInfo/query/" + this.timer,
					data: {
						schoolName: this.schoolId
					},
					success(res) {
						console.log(res)
					}
				}).then((res) => {
					console.log(res)
					if (res.data.data) {
						this.listvalue = []
						res.data.data.forEach(item => {
							this.listvalue.push(item.courseValue)
						})
						console.log(this.listvalue)
						// 先清理
						this.listarr.forEach(element => {
							element.bool = false
						})
						// 渲染
						this.listvalue.forEach(item => {
							this.listarr[item].bool = true
						})

					}
				})
			},
			// 校区选择
			onchange(e) {
				let i = e.target.value;
				this.number = i
				this.schoolId = this.schoolarr[i]
				console.log(this.schoolName);
				console.log(this.timer);
				console.log(this.schoolId);
				console.log(this.listvalue);
				this.changeschoolName(this.schoolId)
				this.search()
			},
			// 跳转到填报页面
			jumpfill(m) {
				let i = m;
				// 数据存到vuex里面去
				this.changeindex(i.index)
				this.changetext(i.text)

				if (!this.schoolId) {
					uni.showModal({
						content: "请选择校区",
						showCancel: false
					})
				} else {
					// 跳转页面
					uni.navigateTo({
						url: "../fill/fill"
					})
				}

			},
			// 跳转到历史记录页面
			jumphistory() {
				uni.navigateTo({
					url: "../history/history"
				})
			},
			// 跳转到详情页面
			jumpdetails(m) {
				uni.navigateTo({
					url: "../details/details"
				})
			},
			// 推送页面
			pushrecord() {
				console.log(this.listvalue)
				if (this.schoolId && this.listvalue.length == 13) {
					uni.showLoading({
						title: '加载中'
					});

					uni.request({
						method: "POSt",
						url: this.URL + "/record/push",
						// url: "http://192.168.0.16:8081/record/push",
						data: {
							schoolName: this.schoolId
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						dataType: 'json',
						success: (res) => {
							console.log(res);

							uni.showModal({
								content: "提交成功",
								showCancel: false
							})
							this.search()
							//隐藏加载框
							uni.hideLoading();
						}
					})
				} else if (this.schoolId && (!(this.listvalue.length == 13))) {
					uni.showModal({
						content: "请将信息填写完整在提交",
						showCancel: false
					})
				} else {
					uni.showModal({
						content: "请选择校区",
						showCancel: false
					})
				}
			}

		}
	}
</script>

<style lang="scss">
	.app {
		width: 100%;
		min-height: 2000rpx;
		background-color: #9BC5E1;

		// 主体
		.content {
			width: 94%;
			min-height: 600rpx;
			margin: 0 auto;
			padding-top: 40rpx;

			// 校区选择
			.school-select {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				margin-top: 40rpx;
				border-radius: 10rpx;
				background-color: #fff;
				color: #000;

				.message {
					margin-top: 10rpx;
				}
			}


			// 校务巡查标题
			.title1 {
				width: 100%;
				height: 40rpx;
				line-height: 40rpx;
				text-align: center;
				font-size: 40rpx;
			}

			// 历史巡查标题
			.title2 {
				width: 100%;
				height: 40rpx;
				line-height: 40rpx;
				text-align: right;
				font-size: 28rpx;
				// font-weight: bold;
			}

			// 表单
			.form {

				// 列表
				.list {
					width: 100%;
					height: 80rpx;
					margin-top: 40rpx;
					// border: 1rpx solid #000;
					border-radius: 10rpx;
					background-color: #fff;

					// 列表的每一部分
					.part {
						width: 100%;
						height: 80rpx;
						line-height: 80rpx;
						text-align: center;

						&:nth-child(1) {
							text-align: left;
						}

						&:nth-child(2) {
							text-align: left;
						}
					}
				}
			}

			// 合并推送
			.pushbtn {
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				margin-top: 40rpx;
				// border: 1rpx solid #000;
				border-radius: 10rpx;
				background-color: #fff;
			}

		}
	}
</style>
