<template>
	<!-- start: REGISTRATION -->
	<div class="row" style="padding: 0; margin: 0;">
		<nav class="navbar navbar-inverse col-md-12" style="position: fixed; z-index: 1001;">
			<div class="container-fluid">
				<div class="navbar-header">
					<div class="col-md-2"></div>
					<a class="navbar-brand" v-on:click="brandClick">Fitness Tracker</a>
				</div>
				<ul class="nav navbar-nav navbar-right">
					<li><a>{{ id }}</a></li>
					<li><a v-on:click="logoutClick"><span class="glyphicon glyphicon-log-in"></span> Logout</a></li>
				</ul>
			</div>
		</nav>
		<div class="main-login col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
			<!-- start: REGISTER BOX -->
			<div class="box-register">
					<fieldset>
						<legend>
							User Info
						</legend>
						<p>
							Enter your personal details below:
						</p>
						<div class="form-group">
							<span class="input-icon">
							<input type="text" class="form-control" v-model="firstname" placeholder="Firstname" id="firstname">
							<i class="fa fa-user-secret"></i> </span>
						</div>
						<div class="form-group">
							<span class="input-icon">
							<input type="text" class="form-control" v-model="lastname" placeholder="Lastname" id="lastname">
							</span>
						</div>
						<div class="form-group">
							<span class="input-icon">
							<input type="text" class="form-control" v-model="password" placeholder="Password">
							<i class="fa fa-key"></i> </span>
						</div>
						<div class="form-group">
							<span class="input-icon">
							<input type="date" class="form-control" v-model="birthday" placeholder="Birthday" id="birthday">
							<i class="fa fa-calendar"></i> </span>
						</div>
						<div class="form-group">
							<span class="input-icon">
							<input type="number" class="form-control" v-model="weight" placeholder="Weight" id="weight">
							<i class="fa fa-qq"></i> </span>
						</div>
						<div class="form-group">
							<span class="input-icon">
							<input type="number" class="form-control" v-model="height" placeholder="Height" id="height">
							<i class="fa fa-arrows-v"></i> </span>
						</div>
						<p>
							Enter your fitness info below:
						</p>
						<div class="form-group">
							<span class="input-icon">
								<input type="number" class="form-control" v-model="calories" placeholder="Calories">
								<i class="fa fa-spoon"></i>
							</span>
						</div>
						<div class="form-group">
							<span class="input-icon">
								<input class="form-control" v-model="steps" placeholder="Steps">
								<i class="fa fa-paw"></i>
							</span>
						</div>
						<div class="form-group">
							<span class="input-icon">
								<input class="form-control" v-model="heartbeats" placeholder="Heartbeats">
								<i class="fa fa-heartbeat"></i>
							</span>
						</div>
						<div class="form-group">
							<span class="input-icon">
								<input class="form-control" v-model="follower" placeholder="Friend">
								<i class="fa fa-user"></i>
							</span>
						</div>
						<div class="form-group">
							<span class="input-icon">
								<input class="form-control" v-model="period" placeholder="Period">
								<i class="fa fa-clock-o"></i>
							</span>
						</div>
						<div class="form-group">
							<span class="input-icon">
								<input class="form-control" v-model="slept_time" placeholder="Slept Time">
								<i class="fa fa-clock-o"></i>
							</span>
						</div>
						<button v-on:click="updateClick" class="btn btn-primary pull-right">
							Update <i class="fa fa-arrow-circle-right"></i>
						</button>
					</fieldset>
			</div>
			<!-- end: REGISTER BOX -->
		</div>
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