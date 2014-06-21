<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<div class="box">
	<form:form action="/pat2math/signUp" modelAttribute="formStudent" 
					accept-charset="utf-8">
						
		<form:errors path="*" class="error-global">
			<div class="error-global">
				<spring:message code="error.global" />			
			</div>
		</form:errors>
		<br>
		<p>
			<form:input path="firstName" placeholder="nome" />
		</p>
		<p>
			<form:errors path="firstName">
				<form:errors path="firstName" htmlEscape="false" class="error" />
			</form:errors>
		</p>
		
		<p>
			<form:input path="lastName" placeholder="sobrenome" />
		</p>
		<p>
			<form:errors path="lastName">
				<form:errors path="lastName" htmlEscape="false" class="error" />
			</form:errors>
		</p>
		
		<p>
			<form:input path="email" placeholder="email" />
		</p>
		<p>
			<form:errors path="email">
			<form:errors path="email" htmlEscape="false" class="error" />
			</form:errors>
		</p>
		
		<p>
			<form:password path="password" placeholder="senha" />
		</p>
		<p>
			<form:errors path="password">
				<form:errors path="password" htmlEscape="false" class="error" />
			</form:errors>
		</p>
		
		<p>
			<form:password path="passwordConfirm" placeholder="confirme a senha" />
		</p>
		<br>
		<p>
			<form:checkbox path="acceptTerms" />
			Aceito os <a href="/pat2math/terms">termos de uso</a>
		</p>
		<p>
			<form:errors path="acceptTerms">
				<form:errors path="acceptTerms" htmlEscape="false" class="error" />
			</form:errors>
		</p>
		
		<br>
		<input type="submit" class="btn btn-large" value="cadastrar" />
	</form:form>
</div>