<template>
	<!-- start: REGISTRATION -->
	<div class="row" style="padding: 0; margin: 0; background: url('background.jpg') center/cover no-repeat; width: 100%; min-height: 757px;">
		<nav class="navbar navbar-inverse col-md-12" style="position: fixed; z-index: 1001;">
			<div class="container-fluid">
				<div class="navbar-header">
					<router-link class="nav-link" to="/Home"> <img src='logo.jpg' width="60px;"></router-link>
				</div>
				<ul class="nav navbar-nav navbar-right">
					<li><router-link class="nav-link" to="/Home"> HOME</router-link></li>
					<li><router-link class="nav-link" to="/Friends"> FRIENDS</router-link></li>
					<li><router-link class="nav-link" to="/Exercise"> EXERCISE</router-link></li>
					<li><a v-on:click="logoutClick"><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
				</ul>
			</div>
		</nav>
		<div class="container" style="padding-top: 100px;">
			<h3> Physical fitness is a state of health and well-being and, more specifically, the ability to perform aspects of sports, occupations and daily activities. </h3>
			<h3>Physical fitness is generally achieved through proper nutrition, moderate-vigorous physical exercise, and sufficient rest.</h3>
			<h4> Mental fitness is just as important as physical fitness, and shouldn't be neglected. <br/>
			Including mental dexterity exercises into your daily routine can help you reap the benefits of a sharper mind and a healthier body for years to come. 
			Mental fitness means keeping your brain and emotional health in tip-top shape.
			</h4>

			<h5> Advantages of fitness<br/>
			It Can Make You Feel Happier. ...<br/>
			It Can Help With Weight Loss. ...<br/>
			It Is Good for Your Muscles and Bones. ...<br/>
			It Can Increase Your Energy Levels. ...<br/>
			It Can Reduce Your Risk of Chronic Disease. ...<br/>
			It Can Help Skin Health. ...<br/>
			It Can Help Your Brain Health and Memory. ...<br/>
			It Can Help With Relaxation and Sleep Quality.</h5>
		</div>
	</div>
</template>
<script>

export default {
	name: 'Userinfo',
	created() {
	},
	data() {
		return {
		}
	},
	methods: {
		brandClick: function() {
			this.$router.push('/Userinfo');
		},
		logoutClick: function() {
			this.$router.push('/');
			window.sessionStorage.clear();
			this.$socket.emit('logout_method');
		}
	},
	mounted() {
	}
}

</script>