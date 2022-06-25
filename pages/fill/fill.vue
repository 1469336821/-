<template>
	<!-- 未填报 -->
	<view class="fill">
		<uni-row>
			<uni-col>
				<!-- 主体内容 -->
				<view class="content">
					<uni-row>
						<uni-col>
							<!-- 上边表框 -->
							<scroll-view scroll-y="true" class="top">
								<view>
									<TopView></TopView>
								</view>
							</scroll-view>

							<!-- 下边表框 -->
							<view class="bottom" :class="{part:bools}">
								<!-- 标题 -->
								<uni-row>
									<uni-col :span="15" :offset="7">
										<view class="bottom-title">
											{{text}}
										</view>
									</uni-col>
								</uni-row>
								<!-- 填报人 -->
								<uni-row>
									<uni-col :span="22" :offset="1">
										<view class="bottom-filler">
											填报人: {{username}}
										</view>
									</uni-col>
								</uni-row>
								<!-- 巡查反馈 -->
								<uni-row>
									<uni-col :span="22" :offset="1">
										<view class="bottom-back">
											<view class="back-title">
												巡查反馈:
											</view>
											<view class="back-text">
												<textarea placeholder="多行输入" class="textarea" v-model="backtext"
													maxlength="1500">
												</textarea>
											</view>
										</view>
									</uni-col>
								</uni-row>
								<!-- 课间反馈 -->
								<uni-row>
									<uni-col :span="22" :offset="1">
										<view v-if="bool" class="bottom-class">
											<view class="class-title">
												课间反馈:
											</view>
											<view class="class-text">
												<textarea placeholder="多行输入" class="textarea" v-model="classtext"
													maxlength="1500">
												</textarea>
											</view>
										</view>
									</uni-col>
								</uni-row>
								<!-- 照片 -->
								<uni-row>
									<uni-col :span="7" :offset="1">
										<view @click="uploadimage()" class="bottom-photo">
											<!-- 图片 -->
											<view class="">
												<uni-icons type="images-filled" size="30"></uni-icons>
											</view>
											<!-- 文字 -->
											<view class="">
												图片
											</view>
										</view>
									</uni-col>
									<!-- 重置和提交按钮 -->
									<uni-col :span="16">
										<view class="bottom-btn">
											<!-- 重置 -->
											<uni-col :span="12">
												<view @click="reset()" class="">
													<button style="background-color:#cccccc;color: #000;">重置</button>
												</view>
											</uni-col>
											<!-- 提交 -->
											<uni-col :span="12">
												<view @click="upload()" class="">
													<button style="background-color:#9BC5E1;color: #fff;">提交</button>
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

	import TopView from "../../components/fillpage.vue"

	export default {
		data() {
			return {
				// url
				// URL: "http://192.168.0.16:8081",
				URL: "http://81.69.59.23:8081",
				// 用户名
				username: null,
				// 时间
				timer: null,
				// 星期几
				weekvalue: null,
				// 图片
				file: [],
				// 巡查反馈
				backtext: "",
				// 课间反馈
				bool: false,
				bools: true,
				classtext: "",
				// 列表
				list: [{
						text: "0.晨读:",
						value: "未填写"
					},
					{
						text: "1.第一节课:",
						value: "未填写"
					},
					{
						text: "2.第二节课:",
						value: "未填写"
					},
					{
						text: "3.第三节课:",
						value: "未填写"
					},
					{
						text: "4.第四节课:",
						value: "未填写"
					},
					{
						text: "5.午餐反馈:",
						value: "未填写"
					},
					{
						text: "6.夕会:",
						value: "未填写"
					},
					{
						text: "7.第五节课:",
						value: "未填写"
					},
					{
						text: "8.第六节课:",
						value: "未填写"
					},
					{
						text: "9.日省:",
						value: "未填写"
					},
					{
						text: "10.放学:",
						value: "未填写"
					},
					{
						text: "11.班级卫生:",
						value: "未填写"
					},

				]
			}
		},
		onLoad() {
			// window.location.reload()
			this.teacherlogin()
			this.setday()
			console.log(this.schoolName)
			console.log(this.text);
			if (this.text.charAt(0) == "第") {
				this.bool = true
				this.bools = false
			}
		},
		components: {
			TopView
		},
		computed: {
			...mapState(["index", "text", "schoolName"])
		},
		methods: {
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
				console.log(mm);
				// 日期
				let d = now.getDate() * 1
				let dd = d < 9 ? "0" + d : d;
				console.log(d);
				// 星期
				let w = (y + parseInt((y / 4)) + (26 * (m + 1) / 10) + d - 36) % 7
				console.log(w)
				// 赋值
				this.weekvalue = Math.floor(w)
				this.timer = yy + "-" + mm + "-" + dd
			},
			// 老师免登
			teacherlogin() {
				dd.getAuthCode({
					success: (res) => {
						let code = res.authCode;
						// 2. 根据免登授权码获取用户身份
						dd.httpRequest({
							url: this.URL + "/record/getInfo?code=" + code,
							method: 'GET',
							// dataType: 'json',
							success: (res) => {
								console.log(res);
								this.username = res.data.data.name
							}
						})
					},
				})
			},
			// 重置按钮
			reset() {
				this.backtext = ""
				this.classtext = ""
				this.bigtext = ""
			},
			// 图片上传
			uploadimage() {
				uni.chooseImage({
					count: 1, //默认9
					sourceType: ['album'], //从相册选择

					success: (res) => {
						this.file = res.tempFilePaths[0]
						uni.showModal({
							content: "已选择文件",
							showCancel: false
						})
						console.log(this.file)
					}
				});
			},
			// 提交按钮
			upload() {
				if (this.file != 0) {

					uni.uploadFile({
						method: "POST",
						url: this.URL + "/recordInfo/add",
						filePath: this.file,
						"fileType": "image",
						name: 'file',
						formData: {
							"clazzFeedback": this.classtext,
							"courseValue": this.index,
							"inspectionFeedback": this.backtext,
							"schoolName": this.schoolName,
							"username": this.username,
							"weekValue": this.weekvalue
						},
						"mimeType": "multipart/form-data",
						success: (res) => {
							console.log(res)

							uni.showModal({
								content: "上传成功",
								showCancel: false
							})
							uni.reLaunch({
								url: "../../App"
							})

							this.reset()
						}
					})
				} else {
					uni.request({
						method: "POST",
						url: this.URL + "/recordInfo/add",
						data: {
							clazzFeedback: this.classtext,
							courseValue: this.index,
							inspectionFeedback: this.backtext,
							majorEvent: this.bigtext,
							schoolName: this.schoolName,
							weekValue: this.weekvalue,
							username: this.username
						},
						header: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						dataType: 'json',
						success: (res) => {
							console.log(res)

							uni.showModal({
								content: "提交成功",
								showCancel: false
							})
							this.reset()

							uni.navigateTo({
								url: "../index/index"
							})
						}
					})
				}
			}
		},

	}
</script>

<style lang="scss" scoped>
	.fill {
		width: 100%;
		min-height: 2480rpx;
		background-color: #9BC5E1;
		border-top: 1rpx solid transparent;

		// 主体
		.content {
			width: 94%;
			min-height: 2000rpx;
			margin: 0 auto;
			margin-top: 40rpx;
			font-size: 36rpx;

			// 上边表框
			.top {
				width: 100%;
				height: 600rpx;
				border-radius: 15rpx;
				background-color: #fff;
			}




			// 下边表框
			.bottom {
				width: 100%;
				height: 1250rpx;
				margin-top: 80rpx;
				border-radius: 15rpx;
				background-color: #fff;
				// border: 1rpx solid #999;

				&.part {
					height: 1000rpx;
				}

				// 标题
				.bottom-title {
					width: 100%;
					height: 40rpx;
					line-height: 40rpx;
					padding-top: 20rpx;
					font-size: 40rpx;
				}

				// 填报人
				.bottom-filler {
					width: 100%;
					height: 40rpx;
					line-height: 40rpx;
					margin-top: 40rpx;
				}

				// 巡查反馈
				.bottom-back {
					width: 100%;
					height: 400rpx;
					margin-top: 40rpx;

					// 标题
					.back-title {
						width: 100%;
						height: 40rpx;
						line-height: 40rpx;
					}

					// 输入框
					.back-text {
						width: 100%;
						height: 360rpx;

						// 输入框样式
						.textarea {
							width: 96%;
							height: 300rpx;
							margin: 20rpx auto;
							border: 1rpx solid #000;
							border-radius: 15rpx;
							font-size: 26rpx;
						}
					}

				}

				// 课间反馈
				.bottom-class {
					width: 100%;
					height: 400rpx;
					margin-top: 40rpx;

					// 标题
					.class-title {
						width: 100%;
						height: 40rpx;
						line-height: 40rpx;
					}

					// 输入框
					.class-text {
						width: 100%;
						height: 360rpx;

						// 输入框样式
						.textarea {
							width: 96%;
							height: 300rpx;
							margin: 20rpx auto;
							border: 1rpx solid #000;
							border-radius: 15rpx;
							font-size: 26rpx;
						}
					}
				}

				//重大事件
				.bottom-big {
					width: 100%;
					height: 400rpx;
					margin-top: 40rpx;

					// 标题
					.big-title {
						width: 100%;
						height: 40rpx;
						line-height: 40rpx;
					}

					// 输入框
					.big-text {
						width: 100%;
						height: 360rpx;

						// 输入框样式
						.textarea {
							width: 96%;
							height: 300rpx;
							margin: 20rpx auto;
							border: 1rpx solid #000;
							border-radius: 15rpx;
							font-size: 26rpx;
						}
					}
				}

				//照片
				.bottom-photo {
					width: 100%;
					height: 120rpx;
					margin-top: 40rpx;
				}

				// 按钮
				.bottom-btn {
					width: 100%;
					height: 120rpx;
					margin-top: 40rpx;

					button {
						width: 80%;
						height: 80rpx;
						line-height: 80rpx;
						border-radius: 15rpx;
						margin: 20rpx auto;
						text-align: center;
					}
				}
			}
		}
	}
</style>
