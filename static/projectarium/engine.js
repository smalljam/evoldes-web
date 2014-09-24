(function(){

    addTaskHandlers('.grid');
    addProjectHandlers('.grid');
    addPhaseHandlers('.grid');

    var taskTemplate = '<div class="task"><input type="text" value="new task"><input type="file"></div>';

    function addTaskHandlers(base){
        $(base).find('button[type="add-task"]').each(function(i, button){
            $(button).click(function(){
                addTask.apply(this);
            });
        });
    }

    function addProjectHandlers(base) {
        $(base).find('button[type="add-project"]').each(function(i, button){
            $(button).click(function(){
                addProject.apply(this);
            });
        });
    }

    function addPhaseHandlers(base){
        $(base).find('button[type="new-phase"]').each(function(i, button){
            $(button).click(function(){
                addPhase.apply(this);
            });
        });
    }

    function addTask(){
        var $base = $(this).parent();
        $base.html(taskTemplate);

        $base.find('input[type="text"]').focus().keydown(function(e){
            if(e.which == 13) {
                $('<span>'+this.value+'</span>').insertBefore(this);
                $(this).parent().find('input').remove();
            }
            if(e.which == 27) {
                //$(this).parent().remove();

            }
        });
        $base.find('input[type="file"]').change(function(){
            var file = this.files[0]
            var that = this;

            var reader = new FileReader();
            reader.onload = (function(theFile) {
                return function(e) {
                    var html = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
                    $(that).parent().append(html);
                };
            })(file);
            reader.readAsDataURL(file);
        });

    }

    function addProject(){
        var phases = $('.grid>thead>tr>th').length - 2;

        var $base = $(this).parent().parent();

        var html = function(p){
            var html = '<td><input type="text" value="Project Name"></td>';
            for(var i = 0;i<p;i++){
                html += '<td><button type="add-task">Add task</button></td>';
            }
            return html;
        }(phases);

        $base.html(html);
        $base.addClass('project');

        $parent = $base.parent();
        addTaskHandlers($base);


        function newProjectPlaceholder(){
            $parent.append('<tr><td><button type="add-project">Add project</button></td></tr>');
            addProjectHandlers($parent);
        }

        $base.find('input').focus().keydown(function(e){
            if(e.which == 13) {
                $(this).parent().html('<h3>'+this.value+'</h3>');
                newProjectPlaceholder();
            }
            if(e.which == 27) {
                $base.remove();
                newProjectPlaceholder();
            }
        });

    }

    function addPhase(){
        $table = $('.grid');
        $this = $(this);

        $base = $this.parent();


        $('<th><input type="text" value="Phase"></th>').insertBefore($base);

        $table.find('tbody tr.project').append('<td><button type="add-task">Add task</button></td>');

        addTaskHandlers($table.find('tbody tr.project td:last-child'));

        $this.hide();

        $base.parent().find('input[type="text"]').focus().keydown(function(e){
            if(e.which == 13) {
                $(this).parent().html(this.value);
                $this.show();
            }
            if(e.which == 27) {
                $(this).parent().remove();
                $('.grid tbody tr.project td:last-child').remove();
                $this.show();
            }
        });
    }


}())
