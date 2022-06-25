<template>
	<!-- 未填报 -->
	<view class="fill">
		<uni-row>
			<uni-col>
				<!-- 主体内容 -->
				<view class="content">
					<uni-row>
						<uni-col>
							<!-- 表框 -->
							<view class="bottom">
								<!-- 标题 -->
								<uni-row>
									<uni-col :span="24">
										<view class="bottom-title">
											{{title}}
										</view>
									</uni-col>
								</uni-row>
								<!-- 填报人 -->
								<uni-row>
									<uni-col :span="22" :offset="1">
										<view class="bottom-filler">
											填报人: {{obj.username}}
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
												<textarea placeholder="多行输入" class="textarea"
													v-model="obj.inspectionFeedback" maxlength="1500">
												</textarea>
											</view>
										</view>
									</uni-col>
								</uni-row>
								<!-- 课间反馈 -->
								<uni-row>
									<uni-col :span="22" :offset="1">
										<view v-if="obj.clazzFeedback" class="bottom-class">
											<view class="class-title">
												课间反馈:
											</view>
											<view class="class-text">
												<textarea placeholder="多行输入" class="textarea"
													v-model="obj.clazzFeedback" maxlength="1500">
												</textarea>
											</view>
										</view>
									</uni-col>
								</uni-row>

								<!-- 照片 -->
								<uni-row>
									<uni-col :span="22" :offset="1">
										<view class="bottom-photo">
											<view class="photo-title">
												图片:
											</view>
											<view class="photo-text">
												<image @click="clickImg()" style="width: 100%; height: 100%;"
													:src="obj.image" mode="scaleToFill"></image>
											</view>
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
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				// 对象
				obj: {},
				// url
				URL: "http://81.69.59.23:8081",
				// 填报人
				username: null,
				listarr: null,
				// 图片地址
				imageurl: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202106%2F12%2F20210612060457_0a4bc.png&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654323360&t=662e31a7cd605b08ac943706aba738a2"
			}
		},
		computed: {
			...mapState(["datalist", "id", "title"])
		},
		onLoad() {
			console.log(this.datalist);
			console.log(this.id);
			this.search()
		},
		methods: {
			clickImg() {
				uni.previewImage({
					urls: [this.obj.image], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
					current: '', // 当前显示图片的http链接，默认是第一个
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			search() {
				// 请求数据
				uni.request({
					method: "GET",
					url: this.URL + "/recordInfo/query/" + this.datalist.saveDate,
					data: {
						schoolName: this.datalist.schoolName
					},
					success(res) {
						console.log(res);
					}
				}).then((res) => {
					console.log(res);
					this.listarr = res.data.data
					console.log(this.id);
					this.obj = {}
					let newarr = this.listarr.filter(item => item.courseValue == this.id)
					this.obj = newarr[0]
					console.log(this.obj);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fill {
		width: 100%;
		min-height: 2000rpx;
		background-color: #9BC5E1;
		border-top: 1rpx solid transparent;

		// 主体
		.content {
			width: 94%;
			min-height: 1800rpx;
			margin: 0 auto;
			margin-top: 40rpx;
			font-size: 36rpx;

			// 表框
			.bottom {
				width: 100%;
				height: 1600rpx;
				margin-top: 80rpx;
				border-radius: 15rpx;
				background-color: #fff;
				// border: 1rpx solid #999;

				// 标题
				.bottom-title {
					width: 100%;
					height: 40rpx;
					line-height: 40rpx;
					padding-top: 20rpx;
					font-size: 40rpx;
					text-align: center;
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

				//图片
				.bottom-photo {
					width: 100%;
					height: 400rpx;
					margin-top: 40rpx;

					// 标题
					.photo-title {
						width: 100%;
						height: 40rpx;
						line-height: 40rpx;
					}

					// 图片
					.photo-text {
						width: 100%;
						height: 300rpx;
						border: 1rpx solid #000;
						border-radius: 15rpx;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>
