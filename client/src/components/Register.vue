<template>
	<!-- start: REGISTRATION -->
	<div class="row" style="padding: 0; margin: 0;">
		<nav class="navbar navbar-inverse col-md-12" style="position: fixed; z-index: 1001;">
			<div class="container-fluid">
				<div class="navbar-header">
					<router-link class="nav-link" to="/"> <h3 style="color: white;">Fitness-Tracker</h3></router-link>
				</div>
				<ul class="nav navbar-nav navbar-right">					
				</ul>
			</div>
		</nav>
		<div class="main-login col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
			<!-- start: REGISTER BOX -->
			<div class="box-register">
					<fieldset>
						<legend>
							Sign Up
						</legend>
						<div class="form-group">
							<span class="input-icon">
							<input type="text" class="form-control" v-model="email" placeholder="email">
							<i class="fa fa-envelope"></i> </span>
						</div>
						<div class="form-group">
							<span class="input-icon">
								<input type="password" class="form-control" id="password" v-model="password" placeholder="Password">
								<i class="fa fa-lock"></i> </span>
						</div>
						<div class="form-group">
							<span class="input-icon">
							<input type="text" class="form-control" v-model="name" placeholder="name">
							<i class="fa fa-user-secret"></i> </span>
						</div>
						<div class="form-group">
							<span class="input-icon">
							<input type="text" class="form-control" v-model="height" placeholder="Height">
							<i class="fa fa-arrows-v"></i> </span>
						</div>
						<div class="form-group">
							<span class="input-icon">
							<input type="text" class="form-control" v-model="weight" placeholder="Weight">
							<i class="fa fa-qq"></i> </span>
						</div>
						<div class="form-group">
							<span class="input-icon">
							<input type="text" class="form-control" v-model="age" placeholder="age">
							<i class="fa fa-calendar"></i> </span>
						</div>
						<div class="form-actions">
							<button v-on:click="registerClick" class="btn btn-primary pull-right">
								Submit <i class="fa fa-arrow-circle-right"></i>
							</button>
						</div>
					</fieldset>
			</div>
			<!-- end: REGISTER BOX -->
		</div>
	</div>
</template>

<script>
export default {
	name: 'Register',
	methods: {
		registerClick: function() {
			var data = {};
			data['email'] = this.email;
			data['name'] = this.name;
			data['age'] = this.age;
			data['weight'] = this.weight;
			data['height'] = this.height;
			data['password'] = this.password;
			
			this.$http.post(window.config.SERVER_URL + '/register', data)
			.then(response => {
				if(response.data == 'ERR')
					alert('error');
				else if(response.data == 'DUP')
					alert('ID duplication!');
				else if(response.data == 'OK') {
					alert('Success!');
					this.$router.push('./Login');
				}
			})
			.catch(e =>	{
				this.errors.push(e);
			});
		}
	}
}
</script>