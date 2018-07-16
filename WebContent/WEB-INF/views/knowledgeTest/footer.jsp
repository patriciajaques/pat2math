<script src="/pat2math/newPatequation/texts/en-UK.js"></script>
<script src="/pat2math/newPatequation/texts/es-ES.js"></script>
<script src="/pat2math/newPatequation/texts/pt-BR.js"></script>
<script src="/pat2math/newPatequation/texts/idiomSelection.js"></script>
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
var titl = "";
var desc = "";
switch(idioma) {
	case("en-UK"):
		titl = "Knowledge Test";
		desc = "Before we begin, you must take a knowledge test for PAT2Math to evaluate the best lesson plan to get you started!";
		break;
	case("es-ES"):
		titl = "Prueba de conocimientos";
		desc = "Antes de empezar, usted debe realizar una prueba de conocimientos para el PAT2Math evaluar el mejor plan de clase para que usted comience!";
		break;
	default:
	case("pt-BR"):
		titl = "Teste de conhecimentos";
		desc = "Antes de começarmos, você deve realizar um teste de conhecimentos para o PAT2Math avaliar o melhor plano de aula para você começar!"
}

$.guider({
	title: titl,
	description: desc,    
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