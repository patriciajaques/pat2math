<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!doctype html>
<html>
	<head>
        <title><spring:message code="project.title" /></title>
       
        <script src="<c:url value='http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js' />" charset="utf-8"></script>
       	<script src="<c:url value='/js/bootstrap.js' />" charset="utf-8"></script>
        <link href="<c:url value='/css/bootstrap.css'  />" rel="stylesheet"/>
        
        <script src="<c:url value='/js/pat2math.js' />" charset="utf-8"></script>
        <link href="<c:url value='/css/pat2math.css'  />" rel="stylesheet"/>
    </head>
    <body>
    	<tiles:insertAttribute name="header" />
    	<section>
	    	<div class="container">
		    	<tiles:insertAttribute name="body" />
		        <!--[if IE]>
		            <script src="<c:url value='/resources/js/bootstrap.min.ie.js' />"></script>
		        <![endif]-->
		        <!--[if !IE]><!-->
		            <script src="<c:url value='/resources/js/bootstrap.min.js' />"></script>
		        <!--<![endif]-->
		        
		    	<tiles:insertAttribute name="footer" />
			</div>
	    </section>
    </body>
</html>