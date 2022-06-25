<template>
	<view :class="[Span, Offset, Cols]" :style="Gutter" @tap="onClick">
		<view v-if="bgClass||bgStyle" :class="['bgc', bgClass]" :style="Radius + bgStyle">
			<slot></slot>
		</view>
		<slot v-else></slot>
	</view>
</template>

<script>
	export default {
		name:'oCol',
		// #ifdef MP-WEIXIN
		options: {
			virtualHost: true // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现
		},
		// #endif
		inject:['row'],
		props:{
			span:{
				type:[Number,String],
				default:''
			},
			offset:{
				type:[Number,String],
				default:0
			}
		},
		// inject: ['gutter','bg','radius','cols'],
		data() {
			return {
				gutter:0,
				bg:'',
				radius:0,
				cols:0,
			}
		},
		created() {
			// console.log(this.row);
			this.gutter = this.row.gutter;
			this.bg = this.row.bg;
			this.radius = this.row.radius;
			this.cols = this.row.cols;
		},
		computed: {
			Span(){
				if(this.cols > 0 || !this.span || this.span < 1) return '';
				else if(this.span > 24) return 'o-col-24';
				else return 'o-col-' + this.span;
			},
			Cols(){
			// #ifdef MP-WEIXIN
				if(this.cols > 5) return 'cols-5';
				else if(this.cols < 1) return '';
				else return 'cols-' + this.cols;
			// #endif
			// #ifdef APP-PLUS || H5
				if(this.cols > 0) return 'cols-item';
				else return '';
			// #endif
			},
			
			Offset(){
				if(this.offset >= 1 && this.offset < 24) 
					return 'offset-' + this.offset;
				else return '';
			},
			Radius(){
				if(this.radius > 0)
					return 'border-radius:' + this.radius + 'rpx;overflow:hidden;';
				else return '';
			},
			bgClass(){
				if(~this.bg.indexOf('#') || ~this.bg.indexOf('(')) return '';
				else return this.bg;
			},
			bgStyle(){
				if(~this.bg.indexOf('#') || ~this.bg.indexOf('('))
					return 'background-color:' + this.bg;
				else return '';
			},
			Gutter(){
				if(this.gutter != '0' || this.gutter > 0)
					return 'padding:1rpx ' + this.gutter + 'rpx';
				else return ''
			}
		},
		methods:{
			onClick(e){
				this.$emit('click',{})
			}
		}
	}
</script>

<style lang="scss">
	[class*="o-col-"] {
		float:left;
		box-sizing:border-box;
		.bgc{height:100%;}
	}
	.col-auto {flex: 0 0 auto;width: auto;max-width: 100%;}

	@for $i from 1 through 24 {
		.o-col-#{$i}{
			/* #ifdef APP-PLUS || H5 */
			flex: 0 0 calc(100%/24*#{$i});
			max-width:calc(100%/24*#{$i});
			/* #endif */
			/* #ifdef MP */
			width: calc(100%/24 * #{$i});
			/* #endif */
		}
		@if $i<6 {
			.flex-#{$i}{flex:#{$i};}
			.cols-#{$i}{
			/* #ifdef MP-WEIXIN */
				flex:0 0 calc(100% / #{$i}) !important;
				width:calc(100% / #{$i}) !important;
				box-sizing:border-box;
			/* #endif */
			/* #ifndef MP-WEIXIN */
				.cols-item{
					flex:0 0 calc(100% / #{$i}) !important;
					width:calc(100% / #{$i}) !important;
					box-sizing:border-box;
				}
			/* #endif */
			}
		}
		@if $i<24{.offset-#{$i}{margin-left:calc(100%/24*#{$i})}}
	}
	
</style>
