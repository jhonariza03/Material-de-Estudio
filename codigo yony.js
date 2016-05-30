var turn = "";
$(document).ready(function($) {

    panel.generatePanel();

    var html_panel = panel.getPanel();
    $("#panel").append(html_panel);

    /*nuevo juego*/
    $("#newGame").click(function() {
        newGame();
    });

    /*turno*/
    $("#turn").click(function() {
        $(".box ." + turn).effect("pulsate", 1000, function() {

        });
    });


    //asignamos sortable / droppable
    var start = "";
    $('.color-white').sortable({
        connectWith: '.color-white',
        update: function(event, ui) {},
        change: function(event, ui) {},
        start: function(event, ui) {
            start = $(this).attr("data");
        },

        receive: function(event, ui) {

            var current_ficha = $(this).children('div');

            /*un solo elemento por casilla*/
            if (current_ficha.length > 1) {
                $(ui.sender).sortable('cancel');
                return;
            }

            var target = $(this).attr("data");
            var x_target = parseInt(target.split(",")[0]);
            var y_target = parseInt(target.split(",")[1]);

            var x_start = parseInt(start.split(",")[0]);
            var y_start = parseInt(start.split(",")[1]);


            /*validar retroceso , movimientos verticales,  movimientos horizontales*/
            if (current_ficha.hasClass("ficha-blue") && turn == "ficha-blue") {
                if (x_target > x_start || y_target == y_start || x_target == x_start) {
                    /* console.log("movimiento invalido")*/
                    $(ui.sender).sortable('cancel');
                    return;
                }
            } else if (current_ficha.hasClass("ficha-red") && turn == "ficha-red") {

                if (x_target < x_start || y_target == y_start || x_target == x_start) {
                    /*console.log("invalido") */
                    $(ui.sender).sortable('cancel');
                    return;
                }
            } else {
                /* control de turnos*/
                $(ui.sender).sortable('cancel');
                return;
            }


            //movimiento minimo
            if ((y_target - y_start == 1 || y_target - y_start == -1) && (x_target - x_start == 1 || x_target - x_start == -1)) {
                /* console.log("movimiento válido"); */

                /*siguien turno*/
                nextTurn(current_ficha);
                validateCrown(current_ficha,x_target);
                 

            } else {
                //listo para matar    
                if ((y_target - y_start == 2 || y_target - y_start == -2) && (x_target - x_start == 2 || x_target - x_start == -2)) {
                    /*Moviemintos de la ficha azul*/
                    if (current_ficha.hasClass("ficha-blue")) {
                        if (y_target - y_start == 2) {
                            /* Validamos no matar una compañera*/
                            var objCurrent = $("div[data = '" + (x_start - 1) + "," + (y_start + 1) + "']");

                            if (objCurrent.children('div').hasClass("ficha-blue")) {
                                $(ui.sender).sortable('cancel');
                                return;
                            } else if (objCurrent.children('div').hasClass("ficha-red")) {
                                deatFicha(objCurrent, current_ficha, 'red',x_target)
                            } else {
                                /*espacio en blanco*/
                                $(ui.sender).sortable('cancel');
                                return;
                            }
                        } else if (y_target - y_start == -2) {
                            var objCurrent = $("div[data = '" + (x_start - 1) + "," + (y_start - 1) + "']");

                            /* Validamos no matar una compañera*/
                            if (objCurrent.children('div').hasClass("ficha-blue")) {
                                $(ui.sender).sortable('cancel');
                                return;
                            } else if (objCurrent.children('div').hasClass("ficha-red")) {
                                deatFicha(objCurrent, current_ficha, 'red',x_target)
                            } else {
                                /*espacio en blanco*/
                                $(ui.sender).sortable('cancel');
                                return;
                            }
                        }
                    } else if (current_ficha.hasClass("ficha-red"))  {/*Movimiento de la ficha roja*/
                        if (y_target - y_start == 2) {//redecha

                            var objCurrent = $("div[data = '" + (x_start + 1) + "," + (y_start + 1) + "']");

                            /* Validamos no matar una compañera*/
                            if (objCurrent.children('div').hasClass("ficha-red")) {
                                $(ui.sender).sortable('cancel');
                                return;
                            } else if (objCurrent.children('div').hasClass("ficha-blue")) {
                                deatFicha(objCurrent, current_ficha, 'blue',x_target);
                            } else {
                                /*espacio en blanco*/
                                $(ui.sender).sortable('cancel');
                                return;
                            }
                        } else if (y_target - y_start == -2) {//izq
                            var objCurrent = $("div[data = '" + (x_start + 1) + "," + (y_start - 1) + "']");

                            if (objCurrent.children('div').hasClass("ficha-red")) {
                                $(ui.sender).sortable('cancel');
                                return;
                            } else if (objCurrent.children('div').hasClass("ficha-blue")) {
                                deatFicha(objCurrent, current_ficha, 'blue',x_target);
                            } else {
                                /*espacio en blanco*/
                                $(ui.sender).sortable('cancel');
                                return;
                            }
                        }
                    }
                } else {
                    /*solo mataremos de 1 espacio*/
                    $(ui.sender).sortable('cancel');
                    return;
                }
            }
            console.log("origen:" + start + "  , destino:" + target);
        }

    }).droppable({
        greedy: true
    });

    newGame();
});


/*Muerte de las fichas*/
function deatFicha(objCurrent, current_ficha, ficha,pos) {
    var pl = ficha == "blue" ? "2" : "1";

    $("#player" + pl).append(getFichaRed(ficha, true));
    $("#player" + pl + " div.ficha").fadeIn("slow");
 
      validateCrown(current_ficha,pos)

    /*remover ficha muerta */
    objCurrent.children().hide("explode", {
        pieces: 70
    }, 500);
    objCurrent.children('div').remove();

    nextTurn(current_ficha);
}


/*siguiente turno*/
function nextTurn(current_ficha) {

    if (current_ficha.hasClass("ficha-red")) {
        turn = "ficha-blue";
        $("#turn").switchClass("btn-danger", "btn-primary", 0, "easeInQuint");
    } else {
        turn = "ficha-red";
        $("#turn").switchClass("btn-primary", "btn-danger", 0, "easeInQuint");
    }

    validateWinner()

}

/*Validamos ganador*/
function validateWinner() {
    if ($(".box ." + turn).length == 0) {
        $('#modal-msg h4.modal-title').html("Juego Finalizado")
        $('#modal-msg div.modal-body').html("Ya tenemos un ganador !!!");
        $('#modal-msg').modal('toggle');
    }
}

/*Nuevo juego*/
function newGame() {

    turn = "ficha-blue";
    $("#turn").switchClass("btn-danger", "btn-primary", 0, "easeInQuint");

    /*remover todas las fichas */
    if ($('.ficha').length == 0) {
        addFichas();
    } else {
        $('.ficha').hide('slow', function() {
            $('.ficha').remove();
            addFichas();
        });
    }
}

//agregamos las fichas 
function addFichas() {
    /*agregar fichas */
    $(".color-white").each(function(index) {
        var data = $(this).attr("data");
        if (data.split(",")[0] == 0 || data.split(",")[0] == 1 || data.split(",")[0] == 2) {
            $(this).html(getFichaRed("red")); /* Agregamos fichas rojas*/
        }

        if (data.split(",")[0] == 6 || data.split(",")[0] == 7 || data.split(",")[0] == 8) {
            $(this).html(getFichaRed("blue")); /* Agregamos fichas rojas*/
        }

    });
}

//aplicamos coronas - Solo es representativo  :)
function validateCrown(current_ficha,pos)
{  
   if(current_ficha.hasClass("ficha-red")){
      if(pos == 8)
      {
         current_ficha.addClass("crown-red");              
      }

   }else{
      if(pos == 0)
      {
         current_ficha.addClass("crown-blue");              
      }
   }

   
}

//html de las fichas
function getFichaRed(type, hidden) {
    //fichas ganadas
    if (hidden) {
        var style = "display:none;position: inherit";
    }

    if (type == "red") {
        return '<div style="' + style + (hidden ? ";float: left" : "") + '" class="ficha-red ficha"></div>';
    } else if (type == "blue") {
        return '<div style="' + style + (hidden ? ";float: right" : "") + '" class="ficha-blue ficha"></div>';
    }

}

/*objeto del tablero*/
var panel = (function() {
    var row = 9;
    var column = 8;
    var str_panel = "";

    var generatePanel = function() {
        var str_all = "";
        for (var i = 0; i < row; i++) {
            str_all += '<div class="row">';
            for (var k = 0; k < column; k++) {
                str_all += boxTemplate(i, k + 1);
            }

            str_all += '</div>'
        }

        str_panel = str_all;
    };

    var getPanel = function() {
        return str_panel;
    }

    /*generar casillas del tablero*/
    function boxTemplate(i, k) {
        var classColor = "color-white";

        if (i % 2 == 0) {
            classColor = "color-black";

            if (k % 2 == 0) {
                classColor = "color-white";
            }
        } else {
            if (k % 2 == 0) {
                classColor = "color-black";
            }
        }

        return "<div data='" + i + "," + (k - 1) + "' class='box " + classColor + "' title='(" + i + "," + (k - 1) + ")'>  </div>";
    }

    return {
        generatePanel: generatePanel,
        getPanel: getPanel
    };

})();