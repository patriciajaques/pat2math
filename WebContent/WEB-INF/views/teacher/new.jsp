<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<div class="block">
	<form:form action="." modelAttribute="teacher" 
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
		
		<br>
		<input type="submit" class="btn btn-large" value="cadastrar" />
	</form:form>
</div>