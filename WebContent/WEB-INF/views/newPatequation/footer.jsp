<script src="/pat2math/newPatequation/texts/en-GB.js"></script>
<script src="/pat2math/newPatequation/texts/es-ES.js"></script>
<script src="/pat2math/newPatequation/texts/pt-BR.js"></script>
<!-- <script src="/pat2math/newPatequation/texts/exemplo.js"></script> -->
<script src="/pat2math/newPatequation/texts/idiomSelection.js"></script>

<script>

//	atualiza os textos dos elementos HTML
document.getElementById("help").title = htmlTXT[0];
document.getElementById("idiomSelection").title = htmlTXT[1];
document.getElementById("ranking").title = htmlTXT[2];
document.getElementById("refresh_page").title = htmlTXT[3];
document.getElementById("reportBug").title = htmlTXT[4];
document.getElementById("rewardWorkedExamples").title = htmlTXT[5];
//if(document.getElementById("tour") !== null)
//	document.getElementById("tour").title = htmlTXT[6];
document.getElementById("hint").innerHTML = htmlTXT[7];

//	Atualiza a bandeira do botão de alteração de idioma
document.getElementById("newPatequationCurrentFlag").innerHTML = '<img src="/pat2math/images/' + idioma + '.png" style="width: 6%; margin-top:16px">';
document.getElementById("newPatequationCurrentFlag").title = idioma;

</script>

<script src="/pat2math/patequation/js/string.js"></script>
<script src="/pat2math/newPatequation/object.js"></script>
<script src="/pat2math/patequation/js/conversion.js"></script>
<script src="/pat2math/newPatequation/server.js"></script>
<script src="/pat2math/newPatequation/hints.js"></script>
<script src="/pat2math/patequation/js/tour.js"></script>
<script src="/pat2math/patequation/js/workedExamplesUtil.js"></script>
<script src="/pat2math/patequation/js/workedExamples.js"></script>
<script src="/pat2math/newPatequation/workedExamplesController.js"></script>
<script src="/pat2math/newPatequation/withGamification/difficultLevelsAndClassPlans.js"></script>
<script src="/pat2math/newPatequation/withGamification/fullGamification/specialRewards.js"></script>
<script src="/pat2math/newPatequation/withGamification/score.js"></script>
<script src="/pat2math/newPatequation/index.js"></script>
<script src="/pat2math/patequation/js/decimalNumbers.js"></script>
<script src="/pat2math/patequation/js/paper.js"></script>
<!-- <script src="/pat2math/patequation/js/guider-2.1.0.min.js"></script> -->