<template>
	<!-- start: REGISTRATION -->
	<div class="row" style="padding: 0; margin: 0;">
		<nav class="navbar navbar-inverse col-md-12" style="position: fixed; z-index: 1001;">
			<div class="container-fluid">
				<div class="navbar-header">
					<router-link class="nav-link" to="/"> <h3 style="color: white;">Fitness-Tracker</h3></router-link>
				</div>
				<ul class="nav navbar-nav navbar-right">
					<li><router-link class="nav-link" to="/Register"><span class="glyphicon glyphicon-send"></span> Signup</router-link></li>
					<li><router-link class="nav-link" to="/Login"><span class="glyphicon glyphicon-log-in"></span> Login</router-link></li>
				</ul>
			</div>
		</nav>
		<div class="container" style="padding-top: 100px;">
			<div class="col-md-12">
			</div>
		</div>
	</div>
</template>
<script>

export default {
	name: 'index',	
}

</script>