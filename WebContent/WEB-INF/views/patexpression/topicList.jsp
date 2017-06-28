<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:forEach items="${topics}" var="topic">
	<span class="topic" onclick="loadTasks(${topic.set.id})">
		${topic.set.name}
	</span>
	<div id="tasks${topic.set.id}" class="tasks"></div>
</c:forEach>