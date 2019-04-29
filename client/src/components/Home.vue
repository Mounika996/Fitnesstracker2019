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