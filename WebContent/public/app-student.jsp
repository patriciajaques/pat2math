<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!doctype html>
<html>
	<head>
		<title><spring:message code="project.title" /></title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<link rel="stylesheet" href="/pat2math/css/pat2math.css" type="text/css"/>
		<tiles:insertAttribute name="header" />
    </head>
    <body>
    	<section>
	    	<div class="container">
		    	<tiles:insertAttribute name="body" />
	    	</div>
	    </section>
	    <tiles:insertAttribute name="footer" />
    </body>
</html>