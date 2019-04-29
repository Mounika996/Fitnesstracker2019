<template>
	<!-- start: REGISTRATION -->
	<div class="row" style="padding: 0; margin: 0;">
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
		<div class="container" style="margin-top: 100px; padding-left: 200px; padding-right: 200px;">
			<p v-html="error"> </p>
			<div class="col-md-12">
				<h2>FRIEND'S POSTS</h2>
				<table class="table">
				<thead>
					<tr>
						<th>Type</th>
						<th>Value</th>
						<th>Time</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for = "t in acts" v-bind:key = "t.act_type">
						<td>
							{{ t.act_type }}
						</td>
						<td>
							{{ t.act_value }}
						</td>
						<td>
							at {{ t.created_at}}
						</td>
					</tr>
				</tbody>
				</table>
			</div>
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
			acts: []
		}
	},
	methods: {
		logoutClick: function() {
			this.$router.push('/');
			window.sessionStorage.clear();
			this.$socket.emit('logout_method');
		},
		addClick: function(str) {
			var data = {};
			data['act_type'] = str;
			data['user_email'] = window.sessionStorage.getItem('email');
			if(str == 'run')
				data['act_value'] = this.run;
			else
				data['act_value'] = this.jog;
			this.$http.post(window.config.SERVER_URL + '/addActivity', data)
			.then(response => {
				if(response.data) {
					this.error = '<div class="alert alert-success"><span>Friend Added successfully. </span></div>';
					this.acts.push({act_type: str == 'run' ? 'Ran' : 'Jogged', act_value: str == 'run' ? data.act_value + 'km' : data.act_value + 'steps', created_at: response.data});
				}
			})
			.catch(e =>	{
				this.errors.push(e);
			});
		}
	},
	mounted() {
		var data = {};
		data['user_email'] = window.sessionStorage.getItem('friend');
		this.$http.post(window.config.SERVER_URL + '/getActivity', data)
		.then(response => {
			var rData = response.data;
			for(var i = 0 ; i < rData.length ; i ++) {
				this.acts.push({act_type: rData[i].act_type == 'run' ? 'Ran' : 'Jogged', act_value: rData[i].act_type == 'run' ? rData[i].act_value + 'km' : rData[i].act_value + 'steps', created_at: rData[i].created_at.slice(0,10) + " " + rData[i].created_at.slice(11,19)});
			}
		})
		.catch(e =>	{
			this.errors.push(e);
		});
	}
}

</script>