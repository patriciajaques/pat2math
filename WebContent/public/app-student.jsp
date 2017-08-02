<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!doctype html>
<html>
	<head>
		<title><spring:message code="project.title" /></title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<link rel="stylesheet" href="/pat2math/css/pat2math.css" type="text/css"/>
		<link rel="stylesheet" href="/pat2math/css/bootstrap.css" type="text/css"/>
		<link rel="stylesheet" href="/pat2math/patequation/css/guider-2.1.0.min.css" type="text/css"/>
        <link rel="stylesheet" href="/pat2math/patequation/lib/jquery-ui/themes/base/jquery-ui.css" type="text/css"/>
		<tiles:insertAttribute name="header" />
    </head>
    <body>
    	<section>
	    	<div class="container">
		    	<tiles:insertAttribute name="body" />
	    	</div>
	    </section>
	    <script src="/pat2math/js/pat2math.js"></script>
	    <script src="/pat2math/js/cookies.js"></script>
	    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.1/jquery-ui.min.js"></script>
        <script src="/pat2math/patequation/lib/bootstrap/bootstrap.js"></script>    
        <script src="/pat2math/patequation/js/guider-2.1.0.min.js"></script>
	    <tiles:insertAttribute name="footer" />    
    </body>
</html>