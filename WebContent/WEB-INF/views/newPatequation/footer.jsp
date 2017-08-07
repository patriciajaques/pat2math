
<script src="/pat2math/patequation/js/string.js"></script>
<script src="/pat2math/patequation/js/object.js"></script>
<script src="/pat2math/patequation/js/conversion.js"></script>
<script src="/pat2math/newPatequation/server.js"></script>
<script src="/pat2math/patequation/js/tour.js"></script>
<script src="/pat2math/patequation/js/workedExamples.js"></script>
<script src="/pat2math/patequation/js/workedExamplesUtil.js"></script>
<script src="/pat2math/newPatequation/withGamification/difficultLevelsAndClassPlans.js"></script>
<script src="/pat2math/newPatequation/withGamification/score.js"></script>
<script src="/pat2math/newPatequation/index.js"></script>
<script src="/pat2math/patequation/js/decimalNumbers.js"></script>
<script src="/pat2math/patequation/js/paper.js"></script>
<!-- <script src="/pat2math/patequation/js/guider-2.1.0.min.js"></script> -->

<script>
function checkFacebookLogout() {
	//Chamar a janela do tour para perguntar se sim ou não
	//Se ele marcar que sim, chamar o comando para sair do Facebook
	
	$.guider({
		description: "Deseja fazer logoff do Facebook também?",
		alignButtons: "right", 
		buttons: {
			Sim: {
				click: function() {},
				className: "primary"
			},
			
			Não: {
				click: function() {$.guider({}).hideAll();
				}
			}
		}
	});
}
</script>