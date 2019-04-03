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
        <!-- BEGIN PORTLET-->
		<div class="container" style="margin-top: 100px; padding-left: 200px; padding-right: 200px;">
			<p v-html="error"> </p>
			<div class="input-group" style="padding-bottom: 20px;">
				<span class="input-group-addon">
				<i class="fa fa-user"></i>
				</span>
				<input type="text" v-model="follower" class="form-control" placeholder="Friends email here. E.g: admin@mail.com" /><span class="input-group-btn">
				<a v-on:click="addClick" class="btn btn-primary pull-right">
				<i class="fa fa-plus"></i> Add </a>
				</span>
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
                            <a class="btn btn-primary pull-right" v-on:click="viewProfile(t.mail)">
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
	data() {
		return {
			error: '',
			id: window.sessionStorage.getItem('id'),
			name1: window.sessionStorage.getItem('name'),
			age1: window.sessionStorage.getItem('age'),
			weight1: window.sessionStorage.getItem('weight'),
			height1: window.sessionStorage.getItem('height'),
			friends: [{name: "sai", mail: "sai@mail.com", available: true},
						{name: "Vinny", mail: "vinny@mail.com", available: false}]
		}
    },
    methods: {
		viewProfile: function(mail) {
			alert(mail);
		},
		logoutClick: function() {
			this.$router.push('/');
			window.sessionStorage.clear();
		},
		addClick: function() {
			var data = {};
			data['following'] = window.sessionStorage.getItem('email');
			data['follower'] = this.follower;
			
			this.$http.post(window.config.SERVER_URL + '/addFriend', data)
			.then(response => {
				if(response.data == 'NO_USER') {
					this.error = '<div class="alert alert-danger"><span>Email is invalid . </span></div>';
				}
				else if(response.data == 'ADD_OK')
				{
					this.error = '<div class="alert alert-success"><span>Friend Added successfully. </span></div>';
				}
			})
			.catch(e =>	{
				alert(e);
				this.errors.push(e);
			});

		}
	},
	mounted() {
		var data = {};
		data['email'] = window.sessionStorage.getItem('email');
		this.$http.post(window.config.SERVER_URL + '/getFriends', data)
		.then(response => {
			alert(response.data);
		})
		.catch(e => {
			alert(e);
			this.errors.push(e);
		});
	}
}

</script>