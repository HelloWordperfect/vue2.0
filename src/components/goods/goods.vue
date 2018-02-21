<template>
	<div class="goods">
		<!-- 左侧菜单 -->
		<div class="menu-wrapper" ref='menuWrapper'>
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
					<!-- v-show="item.type>0" -->
					<span class="text border-1px">
					  <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<!-- 右侧商品 -->
		<div class="foods-wrapper" ref='foodsWrapper'   >
			<ul>								
				<!-- ref可以再vue获取到这个dom节点 -->
				<li v-for="(item,index) in  goods" class="food-list food-list-hook"  >
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="food in item.foods" class="food-item boder-1px">
							<div class="icon">
								<img width="57" height="57" :src="food.icon" alt="">
							</div>
							<!-- 美食名称 -->
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<!-- 销售情况 -->
								<div class="extra">
									<span class="count">月售{{food.sellCount}}</span>
									<span>好评率{{food.rating}}</span>
								</div>
								<!-- 价格 --> <!-- food.oldPrice 是否是特价商品 -->
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import BScroll from  'better-scroll';

const ERR_OK = 0
	export default{
		data(){
			return{
				goods:[],
				// 存储每个区间的高度  热销 单人精彩套餐
				listHeight:[],
				scrollY: 0
			}
		},
		props: {
			seller: {
				type:Object
			}
		},
		// 实时计算属性
		computed: {
			currentIndex () {
			  for (let i = 0; i < this.listHeight.length; i++) {
			    let height1 = this.listHeight[i];
			    let height2 = this.listHeight[i + 1];
			    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
			      return i;
			    }
			  }
			  return 0;
			},
		},
		created(){
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		  this.$http.get("/goods").then(response=>{
		    response = response.body;
		    if(response.errno === ERR_OK){
		        this.goods = response.data;
		        this.$nextTick(() => {
		          this._initScroll();
		          this._calculateHeight();
		        });
		   	 }
		  });
		  
		},
		methods: {
			// 写函数,手指滑屏滚动 插件把点击事件阻止了,如果想用 
			// better-scroll 最好的滚动插件
			_initScroll() {
				// 第一个参数 DOM对象,第二个是JSON
				this.meunScroll = new BScroll(this.$refs.menuWrapper,{
					click:true
				});
				/* probeType:3 实时监控我滚动的位置 用的作者插件*/
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
					probeType:3
				});
				this.foodsScroll.on('scroll',(pos)=>{
					/*取正数 取整数*/
					this.scrollY =Math.abs(Math.round(pos.y)) 
				})
			},
			// 获取高度
			_calculateHeight () {
			  let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');

			  let height = 0;
			  this.listHeight.push(height);
			  for (let i = 0; i < foodList.length; i++) {
			    let item = foodList[i];
			    height += item.clientHeight;
			    this.listHeight.push(height);
			  }
			},
			// 点击左侧 右侧商品切换
			selectMenu(index,event){
				if(!event._constructed){
					return
				}
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				let el = foodList[index]
				this.foodsScroll.scrollToElement(el,300)
			}
		}
	};
</script>
 

<style lang="stylus">
	@import "../../common/stylus/mixin.styl"
	.goods
		display: flex
		position:absolute
		top: 174px
		bottom :46px
		width :100%
		overflow hidden
		/*左侧菜单 80 是宽度  width是兼容安卓*/
		.menu-wrapper
			flex: 0 0 80px
			width :80px
			background: #f3f5f7
			.menu-item
				/*无论文字一行,两行都会垂直居中*/
				// table	此元素会作为块级表格来显示（类似 <table>），表格前后带有换行符
				display: table
				height :54px
				width :56px
				line-height :14px
				padding :0 12px
				&.current
					position: relative
					margin-top : -1px
					z-index :10
					background:#fff
					font-weight: 700
					.text
						boder-none()
				
				.icon
					display:inline-block
					vertical-align: top
					width :12px
					height :12px
					margin-right :2px
					background-size:12px 12px
					background-repeat:no-repeat
					&.decrease
						bg-image('decrease_3')
					&.discount
						bg-image('discount_3')
					&.guarantee
						bg-image('guarantee_3')
					&.invoice
						bg-image('invoice_3')
					&.special
						bg-image('special_3')
					// table-cell	此元素会作为一个表格单元格显示（类似 <td> 和 <th>）
				.text	
					display: table-cell
					font-size: 12px
					width :56px
					text-align: center
					// 垂直居中
					vertical-align middle
					boder-1px(rgba(7,17,27,0.2))
		/*右侧商品*/
		.foods-wrapper
			flex:1
			.title
				padding-left :14px
				height : 26px
				line-height :26px
				border-left:2px solid #d9dde1
				font-size: 12px
				color: rgb(147,153,159)
				background: #f3f5f7
			.food-item
				display: flex
				margin :18px
				padding-bottom :18px
				boder-1px(rgba(7,17,27,0.2))
				&:last-child
					boder-none()
					margin-bottom :0
				.icon
					flex:0 0 57px
					margin-right :10px
				.content
					flex:1
					.name	
						margin : 2px 0 8px 0
						height :14px
						line-height :14px
						font-size: 14px
						color:rgb(7,17,27)
					.desc ,.extra
						line-height :10px
						font-size : 10px
						color:rgb(147,153,159)
					.desc
						margin-bottom :8px
						line-height :12px
					.extra
						.count
							margin-right :12px		
					.price
						font-weight: 700
						line-height :24px
						.now
							margin-right 18px
							font-size :14px
							color:rgb(240,20,20)
							.old
								text-decoration: line-through
								font-size: 10px
								color:rgb(147,153,159)
						
					

					


			


</style>