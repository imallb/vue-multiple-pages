<template>
<div class="InputNumber" onselectstart="return false">
	<span @touchstart="touchRed($event)">
		<i class="rem">&ndash;</i>
	</span>
	<p><input type="text" v-model="amount" @blur="setAmount"></p>
	<span @touchstart="touchAdd($event)">
		<i class="add">&times;</i>
	</span>
</div>
</template>

<script>

export default {
	name: 'input-number',
	model: {
		prop: 'value',
		event: 'change'
	},
	props:{
		value:null
	},
	data () {
		return {
			outCount: '',
			amount: this.value,
			decimal: 1
		}
	},
	watch:{
		value(val){
			this.amount = val
		},
		amount(val){
			let decimal = this.decimal
			let num = val.toString()
			if(num.split('.').length > 2 || /[^\d^\.]/g.test(num)) {
				this.amount = this.outCount
			}else{
				var n = new Number(num)
				this.amount = (num*decimal) % decimal > 0 ? (Math.floor(num * decimal) / decimal).toString() : num
				this.outCount = this.amount
			}
			this.$emit('change', this.outCount);
		}
	},
	mounted () {
		
	},
	methods: {
		touchRed(el){
			let timer, timeout;
			let decimal = this.decimal
			let elm = el.currentTarget
			if(this.amount == 0) return;
			this.amount = new Number(this.amount)*decimal
			this.amount = Math.floor(this.amount - decimal)/decimal
			timeout = setTimeout(() => {
				timer = setInterval(() => {
					if(this.amount == 0){
						clearInterval(timer);
						return;
					};
					(this.amount)--;
				},50)
			},500)
			elm.addEventListener('touchend',touchendfn)
			function touchendfn(){
				clearTimeout(timeout);
				clearInterval(timer);
				elm.removeEventListener('touchend', touchendfn);
			}
		},
		touchAdd(el){
			let timer, timeout;
			let decimal = this.decimal
			let elm = el.currentTarget
			this.amount = new Number(this.amount)*decimal
			this.amount = Math.floor(this.amount + decimal)/decimal
			timeout = setTimeout(() => {
				timer = setInterval(() => {
					(this.amount)++;
				},50)
			},500)
			elm.addEventListener('touchend',touchendfn)
			function touchendfn(){
				clearTimeout(timeout);
				clearInterval(timer);
				elm.removeEventListener('touchend', touchendfn);
			}
		},
		setAmount(){
			this.amount = this.amount ? (new Number(this.amount)).toString() : ''
		}
	}
}
</script>
<style scoped lang="scss">
.InputNumber{
	display: -webkit-flex;
	display: flex;
	align-items: center;
	color:#999;
	p {
		flex-shrink: 0;
		flex: 1;
		input{
			width: 100%;
			color: #999;
			text-align: center;
		}
	}
	span{
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 0.5em;
		.add{
			transform: rotate(45deg);
		}
	}
}
</style>
