<template>
		<div class="row" style="padding: 0; margin: 0; background: url('background.jpg') center/cover no-repeat; width: 100%; min-height: 757px;">
			<nav class="navbar navbar-inverse col-md-12" style="position: fixed; z-index: 1001;">
				<div class="container-fluid">
					<div class="navbar-header">
					<router-link class="nav-link" to="/"> <img src='logo.jpg' width="60px;"></router-link>
					</div>
					<ul class="nav navbar-nav navbar-right">					
					</ul>
				</div>
			</nav>
			<div class="main-login col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-4 col-md-offset-4">
				<!-- start: LOGIN BOX -->
				<div class="box-login">
					<p v-html="error"> </p>
					<fieldset>
						<legend>
							Sign in to your account
						</legend>
						<p>
							Please enter your name and password to log in.
						</p>
						<div class="form-group">
							<span class="input-icon">
								<input type="text" class="form-control" v-model="email" placeholder="email" >
								<i class="fa fa-envelope"></i> </span>
						</div>
						<div class="form-group">
							<span class="input-icon">
								<input type="password" class="form-control password" v-model="password" placeholder="Password" >
								<i class="fa fa-lock"></i>
							</span>
						</div>
						<div class="form-actions">
							<button class="btn btn-primary pull-right" v-on:click="loginClick">
								Login <i class="fa fa-arrow-circle-right"></i>
							</button>
						</div>
					</fieldset>
				</div>
				<!-- end: LOGIN BOX -->
			</div>
		</div>
</template>

<script>

export default {
	name: 'Login',
	data() {
		return {
			error: ""
		}
	},
	sockets:{
		connect: function(){
			this.$socket.emit('emit_method', 'connected');
		}
	},
	methods: {
		loginClick: function() {
			var data = {};
			data['email'] = this.email;
			data['password'] = this.password;

			this.$http.post(window.config.SERVER_URL + '/login', data)
			.then(response => {
				if(response.data.res == 'loginOK') {
					window.sessionStorage.setItem('email', response.data.userinfo.email);
					window.sessionStorage.setItem('name', response.data.userinfo.name);
					window.sessionStorage.setItem('age', response.data.userinfo.age);
					window.sessionStorage.setItem('weight', response.data.userinfo.weight);
					window.sessionStorage.setItem('height', response.data.userinfo.height);
					this.$socket.emit('emit_method', this.email);
					this.$router.push('/Home');
				}
				else {
					this.error = '<div class="alert alert-danger"><span>Enter correct username and password. </span></div>';
				}
			})
			.catch(e =>	{
				this.errors.push(e);
			});
		}
	}
}


</script>

