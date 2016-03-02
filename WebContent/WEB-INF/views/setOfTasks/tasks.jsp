<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<c:forEach items="${tasks}" var="task">
	<c:if test="${task.content.type eq 'video'}">
		<c:if test="${task.performed}">
			<span class="task" onclick="watchVideo(${task.content.id})" id="task${task.content.id }">
				${task.content.name}
			</span>
			<i style="margin-right: 6px" class="icon-film icon-white"></i>
			<i id="marktask${task.content.id }" class="icon-ok icon-white"></i>
			<br>
		</c:if>
		<c:if test="${!task.performed}">
			<span class="task" onclick="watchVideo(${task.content.id})" id="task${task.content.id }">
				${task.content.name}
			</span>
			<i style="margin-right: 6px" class="icon-film icon-white"></i>
			<i id="marktask${task.content.id }" class="icon-ok" style="visibility: hidden;"></i>
			<br>
		</c:if>
	</c:if>
	
	<c:if test="${task.content.type eq 'equation'}">
		
		<!-- even id -->
		<c:if test="${(task.id % 2) eq 0}">
			<c:if test="${task.performed}">
			    <script type="text/javascript">
			    var id = ${task.content.id};
                
                
      	            equationToUserInterface (id);     
    	        </script>
				<span class="task" onclick="loadExercise(${task.content.id})" id="task${task.content.id }" >
					${task.content.equation}
				</span>
				<i style="margin-right: 6px" class="icon-pencil icon-white"></i>
				<i id="marktask${task.content.id }" class="icon-ok  icon-white"></i>
				<br>
			</c:if>
			
			<c:if test="${!task.performed}">
			    <script type="text/javascript">
			        var id = ${task.content.id};
                
                    
          	            equationToUserInterface (id);        
    	        </script>
				<span class="task" onclick="loadExercise(${task.content.id})" id="task${task.content.id }">
					${task.content.equation}
				</span>
				<i style="margin-right: 6px" class="icon-pencil  icon-white"></i>
				<i id="marktask${task.content.id }" class="icon-ok" style="visibility: hidden;"></i>
				<br>
			</c:if>	
		</c:if>
		
		<!-- even id -->
		<c:if test="${(task.id % 2) eq 1}">
			<c:if test="${task.performed}">
			    <script type="text/javascript">
	                  var id = ${task.content.id};
	                  
	                  
	                	  equationToUserInterface (id);           
    	        </script>
				<span class="task" onclick="loadExerciseTest(${task.content.id})" id="task${task.content.id }">
					${task.content.equation}
				</span>
				<i style="margin-right: 6px" class="icon-pencil icon-white"></i>
				<i id="marktask${task.content.id }" class="icon-ok  icon-white"></i>
				<br>
			</c:if>
			<c:if test="${!task.performed}">
			    <script type="text/javascript">
			        var id = ${task.content.id};
                
                    
              	        equationToUserInterface (id);       
    	        </script>
				<span class="task" onclick="loadExerciseTest(${task.content.id})" id="task${task.content.id }">
					${task.content.equation}
				</span>
				<i style="margin-right: 6px" class="icon-pencil  icon-white"></i>
				<i id="marktask${task.content.id }" class="icon-ok" style="visibility: hidden;"></i>
				<br>
			</c:if>
		</c:if>
		
	</c:if>
</c:forEach>