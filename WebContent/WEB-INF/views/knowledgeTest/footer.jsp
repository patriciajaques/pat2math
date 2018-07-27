<script src="/pat2math/newPatequation/texts/en-GB.js"></script>
<script src="/pat2math/newPatequation/texts/es-ES.js"></script>
<script src="/pat2math/newPatequation/texts/pt-BR.js"></script>
<!-- <script src="/pat2math/newPatequation/texts/exemplo.js"></script> -->
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
	case("en-GB"):
		titl = "Knowledge Test";
		desc = "The test involves a set of equations that get more difficult as you solve them. In this way, PAT2Math will determine the best lesson plan to get you started!!";
		break;
	case("es-ES"):
		titl = "Prueba de conocimientos";
		desc = "La prueba implica un conjunto de ecuaciones que van siendo más difíciles a medida que las resuelve. De esa manera, el PAT2Math determinará el mejor plan de clase para que usted comience!";
		break;
	default:
	case("pt-BR"):
		titl = "Teste de conhecimentos";
		desc = "O teste envolve um conjunto de equações que vão ficando mais difíceis conforme você as resolve. Dessa maneira, o PAT2Math determinará o melhor plano de aula para você começar!"
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