var solarTot = 0,
    bSolar = 0,
    sSolar = 0,
    gSolar = 0,
    dSolar = 0,
    dpc = 1,
    dps = 0;

var Enemy = function (name, hp) {
    this.name = name;
    this.hpMax = hp;
    this.hp = hp;
};

var Character = function (name, cost, dps) {
    this.name = name;
    this.cost = cost;
    this.dps = dps;
    this.purchased = false;
    this.type = "normal";
};

var StarstormCharacter = function (name, cost, unlock) {
    this.name = name;
    this.cost = cost;
    this.type = "starstorm";
    this.unlock = unlock;
    switch(unlock) {
        case "0":
            '';
            break;
        default:
            break;
    }
    this.purchased = false;
}

var Upgrade = function (cost, char, dpsPerc, dpcPerc) {
    this.cost = cost;
    this.char = char;
    this.dpsPerc = dpsPerc;
    this.dpcPerc = dpcPerc;
    this.purchased = false;
}

var worm = new Enemy("Worm",2000);
var bowncer = new Enemy("Bowncer",15500);
var solarkrab = new Enemy("Solar Krab",87000);
var servicebot = new Enemy("Service Bot",263000);
var sawdroid = new Enemy("Sawblade Droid",1400000);
var hummingdroid = new Enemy("Humming Droid",6190000);
var solarboss = new Enemy("Solar Boss",22350000);
var superdroid = new Enemy("Super Droid",88000000);

var curEnemy = worm;

/* Price Incrementation
Character:
    Cost: Base 100, Increment 2.9, Step 0.2
    DPS: Base 50, Increment 1.7, Step 0.3 first, 0.2 rest

Upgrade:
    DPS 1: Cost * 6.0
    DPS 2: DPS 1 * 3.4
    Special: Base DPS * 30, Step 5
*/

var froggyg = new Character("froggyg",100,50),
    lonestar = new Character("lonestar",290,85),
    leon = new Character("leon",910,170),
    scoop = new Character("scoop",3150,375),
    gnaw = new Character("gnaw",12900,900),
    raelynn = new Character("raelynn",63210,2240),
    ayla = new Character("ayla",221250,5610),
    clunk = new Character("clunk",796490,14025),
    voltar = new Character("voltar",2947000,35060),
    coco = new Character("coco",11198595,87660),
    skolldir = new Character("skolldir",43674520,219140),
    yuri = new Character("yuri",174698080,547850),
    derpl = new Character("derpl",698792330,1369630),
    vinnie = new Character("vinnie",12900,3424070),
    genji = new Character("genji",12900,8560180),
    swiggins = new Character("swiggins",12900,21400450),
    rocco = new Character("rocco",12900,53501130),
    ksenia = new Character("ksenia",12900,133713370);
    
var ted = new StarstormCharacter("ted",5,1),
    penny = new StarstormCharacter("penny",10,2),
    sentry = new StarstormCharacter("sentry",20,3),
    skree = new StarstormCharacter("skree",45,4),
    nibbs = new StarstormCharacter("nibbs",90,5);

var charBought = 0;

var splashdash = new Upgrade(600,froggyg,1.2,0);
var tornado = new Upgrade(2040,froggyg,1.5,0);
var bolt45fishgun = new Upgrade(1500,"user",0,2);

var dynamitethrow = new Upgrade(1740,lonestar,1.25,0);
var hyperbull = new Upgrade(5915,lonestar,1.65,0);
var blaster = new Upgrade(2975,"user",0,3);

var tonguesnatch = new Upgrade(5460,leon,1.4,0);
var cloakingskin = new Upgrade(18570,leon,1.85,0);
var slash = new Upgrade(6800,"user",0,dpc);

var frozenhammer = new Upgrade(18900,scoop,1.5,0);
var bindingofjustice = new Upgrade(64260,scoop,2.01,0);
var swordstrike = new Upgrade(19125,"user",0,9.99);

var acidspit = new Upgrade(77400,gnaw,1.55,0);
var weedling = new Upgrade(263160,gnaw,1.9,0);
var bite = new Upgrade(68000,"user",0,4);

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
        });
    }
});


function calcSolar(amount) {
    solarTot += amount;
    bSolar = solarTot % 100;
    $("#bSolar").text(bSolar);
    sSolar = Math.floor((solarTot % 10000)/100);
    $("#sSolar").text(sSolar);
    gSolar = Math.floor((solarTot % 1000000)/10000);
    $("#gSolar").text(gSolar);
    dSolar = Math.floor(solarTot/1000000);
    $("#dSolar").text(dSolar);
}

function updateMenu(content, pos) {
    var $pos = $("[data-pos=" + pos +"]");
    $(".menuContent").fadeOut(300);
    $("#buttonMenu button").removeClass("select",300);
    setTimeout(function() {$(content).removeClass("alphaNone"); $(content).fadeIn(300); $pos.addClass("select",300);},300);
}

function charBuy(char) {
    if (char.purchased == false) {
        if (char.type == "starstorm") {
                '';
            }
        if (char.type == "normal") {
            if (solarTot >= char.cost) {
                solarTot -= char.cost;
                dps += char.dps;
                $("#dps").text(dps);
                calcSolar(0);
                char.purchased = true;
                charBought += 1;
                $("#" + char.name).removeClass("locked");
            }
        }
    }
}

function skillBuy(skill) {
    if (skill.purchased == false) {
        if (solarTot >= skill.cost) {
            solarTot -= skill.cost;
            skill.purchased = true;
            if (skill.char != "user") {
                dps += Math.floor(((skill.char.dps * skill.dpsPerc) - skill.char.dps));
                
                $("#dps").text(dps);
            }
            else {
                dpc *= skill.dpcPerc;
                dpc = Math.floor(dpc);
                $("#dpc").text(dpc);
            }
            calcSolar(0);
            return true;
        }
        else { return false;}
    }
}

function nextEnemy() {
    var enemyArray = [worm, bowncer, solarkrab, servicebot, sawdroid, hummingdroid, solarboss, superdroid];
    var enemyArrayIndex = enemyArray.indexOf(curEnemy);
    curEnemy = enemyArray[enemyArrayIndex + 1];
    $("#enemyName").text(curEnemy.name);
    $("#enemyHp").text(curEnemy.hp);
    $(".enemy").attr("src","images/enemies/" + curEnemy.name.toLowerCase().replace(/\s+/g, '') + ".png");
    $(".enemy").attr("id",curEnemy.name.toLowerCase().replace(/\s+/g, ''));
}

function calcEnemy(auto) {
    if(auto) {
        if ((curEnemy.hp - dps) < 0) {
            curEnemy.hp -= curEnemy.hp;
            nextEnemy();
        }
        else {
            curEnemy.hp -= dps;
        }
        $("#hpBar").css({width: (curEnemy.hp * 100)/ curEnemy.hpMax + "%"}).attr("aria-valuenow",curEnemy.hp);
    }
    else {
        if ((curEnemy.hp - dpc) < 0) {
            curEnemy.hp -= curEnemy.hp;
            nextEnemy();
        }
        else {
            curEnemy.hp -= dpc;
        }
        $("#hpBar").css({width: (curEnemy.hp * 100)/ curEnemy.hpMax + "%"}).attr("aria-valuenow",curEnemy.hp);
    }
    $("#enemyHp").text(curEnemy.hp);
    $(".enemy").animateCss("pulse");  
}

$(document).ready(function() {
    $('*').on('dragstart', function(event) { event.preventDefault(); });
    
    $(".enemy").hover(function() {
        $(this).animate({opacity: 1.0});
    },
    function() {
        $(this).animate({opacity: 0.8});
    });
    
    var $tutBtn = $("#tutorialButton");
    var curPage = "page1";
    $tutBtn.popover({html: "true", trigger: "manual", placement: "top", content: "<div id='page1' class='tutdiv'>Begin by clicking the worm to obtain Solar. Solar is used to purchase various characters and upgrades. 100 bronze solar turns into a silver one, 100 silver for a gold, and so on for diamond. The more damage you deal, the more solar you will obtain.</div><span class='continue'><em>Click to continue...</em></span>"}).click(function(e) {
        $tutBtn.popover('show');
        popoverDefault();
        curPage = "page1";
        e.stopPropagation();
    });

    function popoverDefault() {
        $(".popover").css("bottom","120px");
        $(".popover").css("marginTop","0px");
    };

        $('body').on('click', ".popover-content", function(e){
            switch (curPage) {
                case "page1":
                    $(".popover").animate({bottom: "100px", marginTop: "-50px"},100);
                    $(this).html("<div id='page2' class='tutdiv'>Your goal is to defeat all of the enemies. Characters help you do this by doing damage for you over time, and upgrades help you do more damage at once. After defeating all of the enemies, you can choose to prestige (not implemented) for ... or a bonus, but your progress is reset. This game is based on <a href='http://awesomenauts.com/'>Awesomenauts</a>, by Ronimo Games.</div><span class='continue'><em>Click to close...</em></span>");
                    curPage = "page2"
                    break;
                case "page2":
                    $tutBtn.popover('hide');
                    setTimeout(popoverDefault(),200);
                    curPage = "page1";
                default:
                    break;
            }
            e.stopPropagation();
        });
        $("html").on('click', ':not(".popover")',function(e){
            $tutBtn.popover('hide');
            setTimeout(popoverDefault(),200);
            curPage = "page1";
            e.stopPropagation();
        });
    
        $tutBtn.on('click',function() {$tutBtn.popover('show');});

    $("#characters").hover(function() {
        $(".charMain").hover(function() {
        $(this).animateCss("pulse");
        $(this).scrollTop($(this).offset().top);
        $(this).parent().closest(".chardiv").find(".charDesc").slideDown(100);
        }, function() {
        var hovered = $(this).parent().closest(".chardiv").is(":hover");
        if (!hovered) {
        $(".charDesc").slideUp(100); }
    });                    
        },
        function() {
        $(".charDesc").slideUp(100);
    });
    
    $(".charPicture").tooltip({title: "Click to purchase", placement: "auto right", delay: {"show": 500, "hide": 100}});
    $(".upgradeRight").tooltip({html: "true", placement: "auto right", delay: {"show": 300, "hide": 100}});
        $(".upgradeLeft").tooltip({html: "true", placement: "auto left", delay: {"show": 300, "hide": 100}});
    
    $(".charPicture").click(function() {
        charBuy(window[$(this).attr("id")]);
    });
    $(".upgradeSkill").click(function() {
        if(skillBuy(window[$(this).attr("data-skillName")])) {
            $(this).removeClass("locked");
        }
    })
    
    $(".enemy").click(function() {
        calcEnemy(false);
        calcSolar(dpc);
    });
    
    setInterval(function() {
        if (dps > 0) {calcEnemy(true); calcSolar(Math.floor(dps/(Math.pow(charBought,2) + 1)))}
    }, 1000);
    
    $("#bonus").click(function() {
        dpc *= 50;
    });
});