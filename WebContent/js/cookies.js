//Lista de cookies utilizados pelo PAT2Math:
//previousUser = ID do usuário anterior que utilizou o sistema
//currentPlan = ID do plano/fase que o usuário está resolvendo no momento
//currentEquation = ID da equação que o usuário está resolvendo no momento

//unlockedLevels = número de níveis desbloqueados;
//unlockedPlans = número de planos de aula desbloqueados;
//totalScore = pontuação total do usuário
//levelScore = pontuação por nível
//stageScore = pontuação por fase
//equationScore = pontuação da equação atual que salva da seguinte forma: [user points];[user error points]
//currentWE = Exemplo trabalhado (Worked Example) que está sendo conferido no momento
//linesHeight = Altura atual do caderno (no caso em que foi necessário adicionar novas linhas em uma resolução)

//tourViewed = indica se o usuário já passou pelo tour interativo especial do TCC
//stepTour = Passo atual do tour interativo
//functionTour = Função (método)atual do tour interativo

//openAndBlockMenu = controlador que mantém o plano de aula aberto e fixo
//enableIntroductionPlans = controlador que habilita ou desabilita os planos de introdução às equações
//unlockAllPlans = controlador que libera todos os planos de aula
//enableTour = controlador que habilita ou desabilita o tour interativo
//enableWE = controlador que habilita ou desabilita os exemplos trabalhados (Worked Examples)

function setCookieDays(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function setCookieMinutes(cname,cvalue,exminutes) {
    var d = new Date();
    d.setTime(d.getTime() + (exminutes*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        
        if (name.indexOf("JSESSIONID") === -1)
        	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
