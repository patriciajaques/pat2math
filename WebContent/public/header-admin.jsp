<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>

<style>
	section {
		margin-top: 110px;
	}
</style>

<header>
	<div class="row-fluid">
		<!-- <div class="span6">
			<h2 style="margin-bottom: 0;">
				Admin
			</h2>
		</div> -->
		
		<div class="span12">
			<a href="/pat2math/plan/list?page=0" class="menu">
				Planos
			</a>
			<a href="/pat2math/group/list" class="menu">
				Turmas
			</a>
			<a href="/pat2math/content/list" class="menu">
				Conteúdos
			</a>
			<security:authorize access="hasRole('ROLE_ADMIN')">
				<a href="/pat2math/teacher/list" class="menu">
					Professores
				</a>
			</security:authorize>
			<a href="/pat2math/j_spring_security_logout" class="menu">
				Logout
			</a>
		</div>
	</div>
</header>