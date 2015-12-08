$(function(){
    prettyPrint();
    $("#toggle_btn").on("click", function(){
      $("h2").each(function(){
        $(this).nextAll().each(function(){
          if($(this).filter("h2").length){
            return false;
          }
          $(this).slideToggle();
        });
      });
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
