<script src="/pat2math/patequation/js/string.js"></script>
<script src="/pat2math/newPatequation/object.js"></script>
<script src="/pat2math/patequation/js/conversion.js"></script>
<script src="/pat2math/newPatequation/server.js"></script>
<script src="/pat2math/newPatequation/hints.js"></script>
<script src="/pat2math/patequation/js/tour.js"></script>
<script src="/pat2math/patequation/js/workedExamplesUtil.js"></script>
<script src="/pat2math/newPatequation/workedExamples.js"></script>
<script src="/pat2math/newPatequation/workedExamplesController.js"></script>
<script src="/pat2math/newPatequation/withGamification/difficultLevelsAndClassPlans.js"></script>
<script src="/pat2math/newPatequation/withGamification/fullGamification/specialRewards.js"></script>
<script src="/pat2math/newPatequation/withGamification/score.js"></script>
<script src="/pat2math/newPatequation/index.js"></script>
<script src="/pat2math/patequation/js/decimalNumbers.js"></script>
<script src="/pat2math/patequation/js/paper.js"></script>
<script src="/pat2math/js/pat2math.js"></script>
<!-- <script src="/pat2math/patequation/js/guider-2.1.0.min.js"></script> -->

<script>
$.guider({
	title: "Teste de conhecimentos",
	description: "Antes de comerçarmos, você deve realizar um teste de conhecimentos para o PAT2Math avaliar o melhor plano de aula para você começar!",    
	alignButtons: "center",
	buttons: {
		OK: {
			click: true,
			className: "primary"
		}
	}
}).show();
knowledgeTest();
</script>