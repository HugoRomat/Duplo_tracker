(function() {


    $( "#send" ).click(function() {
        alert( "Command sent");
        //console.log(TabObjectScene[0]);
            $.ajax({
                type: "POST",
                url:  'http://138.25.61.11:8888/colors',
                // The key needs to match your method's input parameter (case-sensitive).
                data: {'couleur1': window.TabObjectScene[0], 'couleur2': window.TabObjectScene[1], 'couleur3': window.TabObjectScene[2], 'couleur4': window.TabObjectScene[3]},
                //data: { my_list:JSON.stringify(TabObjectScene)},
                //contentType: "application/json",
                dataType: "json",
                success: function(data){alert(data);},
                failure: function(errMsg) {
                    alert(errMsg);
                }
            });
        });
     $( "#InitialPosition" ).click(function() {
            $.ajax({
                type: "POST",
                url:  'http://138.25.61.11:8888/pose',
                // The key needs to match your method's input parameter (case-sensitive).
                data: {'pose': "{'position':(0.6,-0.5,1),'orientation':(0.7071067811865476, 0.0, 0.7071067811865475, 0.0),'use_left_arm':False}"},
                //data: { my_list:JSON.stringify(TabObjectScene)},
                //contentType: "application/json",
                dataType: "json",
                success: function(data){alert(data);},
                failure: function(errMsg) {
                    alert(errMsg);
                }
            });
        });

    $( "#reset" ).click(function() {
        location.reload();
        });
}());