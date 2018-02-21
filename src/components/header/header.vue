<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" alt="" :src='seller.avatar'>
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="support">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
				<div v-if='seller.supports' class="support-count" @click='showDetail'>
					<span class='count' >{{seller.supports.length}}个</span>
					<i class="icon-keyboard_arrow_right"></i>
				</div>
			</div>
		
		</div>
		<!-- 公告区域 -->
		<div class="bulletin-wrapper" @click='showDetail'>
			<span class='bulletin-title'></span><span
			 class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<!-- 模糊背景 -->
		<div class="background">
			<img :src="seller.avatar" alt="" width="100%" height="100%">
		</div>
		<!-- 详情页 -->
		<transition name="fade">
		<div v-show="detailShow"  class="detail" >
			<div class="detail-wrapper clearfix">
				<div class="detail-main">
					<h1 class="name">{{seller.name}}</h1>
					<div class="star-wrapper">
						<star :size='48' :score='seller.score '></star>	
					</div>

					<!-- 优惠信息 -->
					<div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>

					<!-- 活动内容--> <!-- 为什么有个v-if 因为有的商家没有活动 -->
					<ul v-if='seller.supports' class='supports'>
						<li class="supports-item" v-for="(item,index) in seller.supports">
							<span class="icon" :class='classMap[seller.supports[index].type]'></span>
							<span class="text">{{seller.supports[index].description}}</span>
						</li>
					</ul>

					<!-- 商家公告 -->
					<div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					
					<!-- 文字 -->
					<div class="bulletin">
						<p class='content'>{{seller.bulletin}}</p>
						
					</div>

					
				</div>
			</div>
			<div class="detail-close" @click='hideDetail'>
				<i class="icon-close"></i>
			</div>
		</div>
		</transition>

	</div>
</template>

<script>
import star from './../star/star.vue';
	export default{
		props:['seller'],
		data(){
			return{
				detailShow:false
			}
		},
		methods:{
			showDetail :function(){
				this.detailShow = true
			},
			hideDetail(){
				this.detailShow = false
			}

		},
		created(){
			this.classMap = ['decrease','discount','guarantee','invoice','special']
		},
		components:{
			star
		}

	};
</script>

<style lang="stylus">
@import "../../common/stylus/mixin.styl";
	.header
		color:#fff
		position: relative
		background: rgba(7,17,27,0.5)
		// 去掉底部阴影
		overflow hidden
		/*动画*/
		
		.content-wrapper
			position: relative
			font-size: 0
			padding : 24px 12px 18px 24px
			.avatar
				/* 行内块元素 中间会有间隙 行内块父元素字体为0  需要字体的在单独设置,为什么字元素要设置14呢,若不设置,汇集成父元素0*/
				display: inline-block
				/*使图片和title 顶部对齐*/
				vertical-align:top
				img
					border-radius:2px
			.content
				display: inline-block
				margin-left :16px;
				.title
					margin: 2px 0 8px 0
					.brand
						display: inline-block
						vertical-align: top
						width :30px
						height:18px
						bg-image('brand')
						background-size:30px 18px
						background-repeat:no-repeat
					.name
						margin-left:6px
						font-size: 16px
						line-height :18px
						font-weight: bold
					
				.description
					font-size: 12px
					margin-bottom :10px
					line-height :12px
				.support
					.icon
						display: inline-block
						 vertical-align: top
						width :12px
						height :12px
						margin-right :4px
						background-size:12px 12px
						background-repeat:no-repeat
						&.decrease
							bg-image('decrease_1')
						&.discount
							bg-image('discount_1')
						&.guarantee
							bg-image('guarantee_1')
						&.invoice
							bg-image('invoice_1')
						&.special
							bg-image('special_1')		
					.text
						line-height :10px
						font-size :10px
						 vertical-align:top
			.support-count
				position absolute
				right :12px
				bottom :14px
				padding :0 8px
				height : 24px
				line-height :24px
				border-radius: 14px
				background: rgba(0,0,0,0.2)
				text-align: center
				.count
					font-size: 10px
					line-height :24px
				.icon-keyboard_arrow_right
					font-size: 10px
					line-height :24px
					margin-left: 2px
		.bulletin-wrapper
			position: relative
			height: 28px
			line-height: 28px
			padding: 0 22px 0 12px
			white-space: nowrap
			overflow: hidden
			text-overflow: ellipsis
			background: rgba(7, 17, 27, 0.2)
			.bulletin-title
				display: inline-block
				vertical-align:top
				margin-top :8px
				width :22px
				height :12px
				bg-image('bulletin')
				background-size:22px 12px
				background-repeat: no-repeat
			.bulletin-text
				vertical-align:top
				font-size: 10px
				margin: 0 4px
			.icon-keyboard_arrow_right
				position: absolute
				font-size: 10px
				right :9px
				bottom :8px
		.background
			position: absolute
			top :0
			left :0
			width :100%
			height :100%
			z-index:-1
			filter:blur(10px)
		.detail
			position: fixed
			z-index: 100
			top: 0
			left: 0
			width: 100%
			height: 100%
			overflow: auto
			backdrop-filter: blur(10px)
			background: rgba(7, 17, 27, 0.8)
			
			&.fade-enter-active
				transition: all 1s ease
			/*.fade-enter-active{}  //变化成什么样  当元素出来(显示)*/
			&.fade-enter-active
				opacity: 1
			/*元素离开成什么样*/
			&.fade-leave-active
				opacity: 0
				transition: all 1s ease
			/*.fade-enter{} //初始状态*/
			&.fade-enter
				opacity: 0
				
				
			.detail-wrapper
				// 最小高度和视口一样高 窗口 flex 可以是 关闭 定位在底部
				width: 100%
				display: flex
				min-height: 100%
				.detail-main
					margin-top: 64px
					flex: 1
					padding-bottom: 34px
					.name	
						font-size: 16px
						font-weight :700
						line-height :16px
						text-align: center
					.star-wrapper
						margin-top :18px
						padding : 2px 0
						text-align: center
					// 优惠信息
					.title
						display: flex
						width :80%
						margin :30px auto 24px
						.line
							flex:1
							position: relative
							top : -6px
							border-bottom:solid 1px rgba(255,255,255,0.2)
						.text
							padding :0 12px 
							font-size: 15px
							font-weight :700
					.supports
						width :80%
						margin : 0 auto
						.supports-item
							padding :0 12px
							margin-bottom :12px
							&:last-child
								margin-bottom :0
							.icon
								display: inline-block
								width :16px
								height :16px
								vertical-align:top
								margin-right :6px
								background-size: cover
								background-repeat: no-repeat
								&.decrease
									bg-image('decrease_2')
								&.discount
									bg-image('discount_2')
								&.guarantee
									bg-image('guarantee_2')
								&.invoice
									bg-image('invoice_2')
								&.special
									bg-image('special_2')	
							.text
								vertical-align:top
								font-size: 12px	
								font-weight: 200
								line-height :16px
							
								display: inline-block
					//商家公告
					.bulletin
						width :80%
						padding :0 12px
						margin :0 auto
						font-size :12px
						line-height :24px
						font-weight: 200
						letter-spacing: 2px




					
			.detail-close
				position: relative
				width: 32px
				height: 32px
				margin: -53px auto 0 auto
				// clear: boths
				font-size: 32px
	
</style>