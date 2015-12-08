$(function(){
    prettyPrint();

    var jslide = function(){
        this.slides = {};
        this.c = 0;
        this.mode = "slide";
    }

    jslide.prototype.init = function(){
        var _this = this;
        $(".slide").fadeOut("fast");
        $(".slide").each(function(i){
            _this.slides[i] = $(this);
        });
        this.slides[this.c].fadeIn("fast");
    }

    // 初期化
    var j = new jslide();
    j.init();

    $("#right_slide").on("click", function(){
        if(j.c == Object.keys(j.slides).length - 1){
            alert("おしまい");
        }else{
            $(".slide").fadeOut("fast");
            j.c += 1;
            j.slides[j.c].delay(200).fadeIn("fast");
            $("#sum_page").html("<a>" + (j.c + 1) + "/" + Object.keys(j.slides).length + "</a>");
        }
    });

    $("#left_slide").on("click", function(){
        if(j.c == 0){
            alert("戻れないよ");
        }else{
            $(".slide").fadeOut("fast");
            j.c -= 1;
            j.slides[j.c].delay(200).fadeIn("fast");
            $("#sum_page").html("<a>" + (j.c + 1) + "/" + Object.keys(j.slides).length + "</a>");
        }
    });
    
    $("#print").on("click", function(){
        if(j.mode == "slide"){
            j.mode = "print";
            $(".slide").fadeIn("fast");
        }else{
            j.mode = "slide";
            j.init();
        }
    });

    $("h2").on("click", function(){
	$(this).nextAll().each(function(){
	    if($(this).filter("h2").length){
		return false;
	    }
	    $(this).slideToggle();
	});
    });
    $("h3").on("click", function(){
	$(this).nextAll().each(function(){
	    if($(this).filter("h3,h2").length){
		return false;
	    }
	    $(this).slideToggle();
	});
    });

});
