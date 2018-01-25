$(function(){
	// List[ContentDTO]
	var tasks; //creata a global variable to store data in 

	//var myToDoList = [];
	//creating an object for to-do list
	function ContentDTO(check, text) {
		this.check = check;
		this.text = text;
	}

    //setup request
    $.ajax({
    	beforeSend: function(xhr) {
    		if(xhr.overrideMimeType) {
    			xhr.overrideMimeType('application/json');
    		}
    	}
    });

    //function that collects data from json
    function loadTasks() {
    	$.getJSON('data/data.json') //collecting data from jso
    	.done(function(data){ 	//if successful
    		//put data into the array
    		makeContent(data);
			// displaying content on a page
			drawContent();
    	}).fail(function() {	//if failed
    		$("#content").html("Sorry! We could not load the timetable at the moment");	//show the message
    	});
    }

	loadTasks(); //call the function 

	//make content for the to-do list
	function makeContent(data) {
		tasks = [];
		for(var i = 0; i < data.length; i++) {
			var item = new ContentDTO(data[i].check, data[i].text);
			tasks.push(item);
		}
	}

	//adding conent
	function drawContent() {
		$("#content").empty();
		for(var i = 0; i < tasks.length; i++) {
			var el = $("<p class='style'></p>").attr('id', i); //create paragraph
			var txtNode = document.createTextNode(tasks[i].text); //create text for paragraph 
			//check if it is checked/unchecked
			if(tasks[i].check == true){
				var checkbox = '<input type="checkbox" name="check" value="task" class="inline-block left checkbox" checked="checked">'; //create checkbox
				$(checkbox).attr('checked', 'checked');
				$(el).addClass('crossed');
			} else {
				var checkbox = '<input type="checkbox" name="check" value="task" class="inline-block left checkbox">'; //create checkbox
			}
			el.append(checkbox);
			el.append(txtNode);
			el.append('<a href="#" class="inline-block right icon"><i class="fa fa-times" aria-hidden="true"></i></a>');
			$("#content").append(el);
			addEventHandlers();
			removeItemHandlers();
		}
	}

	$("#addNewtask").on('click', function() {
		var newText = $('input:text').val();
		var newCheck = false;
		var newData = new ContentDTO(newCheck, newText);
		tasks.push(newData);
		drawContent();
	});

	function addEventHandlers(){
		//clicking on checkboxes
		$(".checkbox").on('click', function() {
			if( $(this).prop( 'checked' ) ) {
				var id = $(this).parent().attr('id');
				tasks[id].check = true;
				var newID = "#" + id;
				$(newID).addClass('crossed');
				$(this).attr('checked', 'checked' );
			} else {
				var id2 = $(this).parent().attr('id');
				tasks[id2].check = false;
				var newID2 = "#" + id2;
				$(newID2).removeClass('crossed');
				$(this).attr('checked', null );
			}
		});
	}

	function removeItemHandlers() {
		//removing
		$(".icon").on('click', function(e) {
			var id = $(this).parent().attr('id');
			var num = parseInt(id);
			tasks = tasks.filter(function(el, index, arr) {
				return index !== num;
			});
			drawContent();
			e.preventDefault();
			e.stopImmediatePropagation();
		});
	}
});



