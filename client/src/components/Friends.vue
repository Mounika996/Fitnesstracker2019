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
		<!-- BEGIN PORTLET-->
		<div class="container" style="margin-top: 100px; padding-left: 200px; padding-right: 200px;">
			<p v-html="error"> </p>
				
			<div class="input-group" style="padding-bottom: 20px; z-index: 1000;">
				<span class="input-group-addon"><label>Add friends from Userlist:</label>
				<select class="form-control" v-model="follower">
					<option></option>
					<option v-for="ff in users" v-bind:key = "ff.email">{{ ff.email }}</option>
				</select>
				<a v-on:click="addClick" class="btn btn-primary pull-right">
				<i class="fa fa-plus"></i> Add </a></span>
			</div>
			<div class="portlet box blue">
				<div class="portlet-title">
					<div class="caption">
						<i class="fa fa-gift"></i>Friends List
					</div>
				</div>
				<div class="portlet-body">
					<table class="table">					
					<tr v-for = "t in friends" v-bind:key = "t.name">
						<td>
							{{ t.name }} <i class="fa fa-circle" v-bind:class="t.available == true ? 'online' : 'offline'"/>
						</td>
						<td>
							<a class="btn btn-primary pull-right" v-on:click="viewProfile(t.email)">
							View Profile <i class="fa fa-search"></i></a>
						</td>
					</tr>
					</table>					
				</div>
			</div>
		</div>
		<!-- END PORTLET-->
	</div>
</template>
<script>

export default {
	name: 'Userinfo',
	created() {
	},
	sockets:{
		someone_out: function(email){
			this.someone_logout(email);
		},
		someone_in: function(email){
			this.someone_login(email);
		}
	},
	data() {
		return {
			error: '',
			friends: [{name: "Laris", mail: "laris0810@mail.com", available: true},
						{name: "Vinny", mail: "vinny@mail.com", available: false}],
			users: [{email: "laris0810@mail.com"},
					{email: "vinny@mail.com"}]
		}
	},
	methods: {
		someone_logout: function(email) {
			for(var i = 0; i < this.friends.length ; i ++) {
				if(this.friends[i].email == email) {
					this.friends[i].available = false;
				}
			}
		},
		someone_login: function(email) {
			for(var i = 0; i < this.friends.length ; i ++) {
				if(this.friends[i].email == email) {
					this.friends[i].available = true;
				}
			}
		},
		viewProfile: function(mail) {
			window.sessionStorage.setItem('friend', mail);
			this.$router.push('/viewProfile');
		},
		logoutClick: function() {
			this.$router.push('/');
			window.sessionStorage.clear();
			this.$socket.emit('logout_method');
		},
		addClick: function() {
			var data = {};
			data['following'] = window.sessionStorage.getItem('email');
			data['follower'] = this.follower;

			this.$http.post(window.config.SERVER_URL + '/addFriend', data)
			.then(response => {
				if(response.data == "ADD_OK") {
					this.error = '<div class="alert alert-success"><span>Friend Added successfully. </span></div>';
					this.getFriends();
				}
				else if(response.data == "EXIST_FRIEND") {
					this.error = '<div class="alert alert-danger"><span>Friend already exists. </span></div>';
				}
				else if(response.data == "SAME_ME") {
					this.error = '<div class="alert alert-danger"><span>It is you. Select the other. </span></div>';					
				}
			})
			.catch(e =>	{
				this.errors.push(e);
			});

		},
		getFriends: function() {
			this.$http.post(window.config.SERVER_URL + '/getAll')
			.then(response => {
				var rData = response.data;
				this.users = rData;
			})
			.catch(e => {
				this.errors.push(e);
			});

			var data = {};
			data['email'] = window.sessionStorage.getItem('email');
			this.$http.post(window.config.SERVER_URL + '/getFriends', data)
			.then(response => {
				var rData = response.data;
				this.friends = rData;
			})
			.catch(e => {
				this.errors.push(e);
			});			
		}
	},
	mounted() {
		this.getFriends();
	}
}

</script>