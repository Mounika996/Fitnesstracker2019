<template>
	<!-- start: REGISTRATION -->
	<div class="row" style="padding: 0; margin: 0;">
		<nav class="navbar navbar-inverse col-md-12" style="position: fixed; z-index: 1001;">
			<div class="container-fluid">
				<div class="navbar-header">
					<router-link class="nav-link" to="/"> <h3 style="color: white;">Fitness-Tracker</h3></router-link>
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
	data() {
		return {
			id: window.sessionStorage.getItem('id'),
			firstname1: window.sessionStorage.getItem('firstname'),
			lastname1: window.sessionStorage.getItem('lastname'),
			birthday1: window.sessionStorage.getItem('birthday'),
			weight1: window.sessionStorage.getItem('weight'),
			height1: window.sessionStorage.getItem('height')
		}
    },
    methods: {
		brandClick: function() {
			this.$router.push('/Userinfo');
		},
		logoutClick: function() {
			this.$router.push('/');
			window.sessionStorage.clear();
		},
		updateClick: function() {
			var data = {};
			data['firstname'] = this.firstname;
			data['lastname'] = this.lastname;
			data['birthday'] = this.birthday;
			data['weight'] = this.weight;
			data['height'] = this.height;
			data['user_id'] = window.sessionStorage.getItem('id');
			data['password'] = this.password;

			data['calories'] = this.calories;
			data['steps'] = this.steps;
			data['heartbeats'] = this.heartbeats;
			data['follower'] = this.follower;
			data['period'] = this.period;
			data['slept_time'] = this.slept_time;

			this.$http.post(window.config.SERVER_URL + '/update', data)
			.then(response => {
				alert(response.data)
			})
			.catch(e =>	{
				alert(e);
				this.errors.push(e);
			});


		}
    },
    mounted() {
		document.getElementById('firstname').value = this.firstname1,
		document.getElementById('lastname').value = this.lastname1,
		document.getElementById('birthday').value = this.birthday1.slice(0,10),
		document.getElementById('weight').value = this.weight1,
		document.getElementById('height').value = this.height1,
		this.firstname = this.firstname1,
		this.lastname = this.lastname1,
		this.birthday = this.birthday1,
		this.weight = this.weight1,
		this.height = this.height1
	}
}

</script> 