$('#add_user').submit(function(event){
    alert("Data Inserted Successfully");
})

$('#update_user').submit(function(event){
    event.preventDefault();  //default behavior of the form is to render the browser when we click on the submit button but this statement will stop that behavior

    // var unindexed_array=$("#update_user") // or
    var unindexed_array=$(this).serializeArray();
    console.log(unindexed_array);

    var data= {};
    
    $.map(unindexed_array, function(n,i){
        data[n["name"]] = n['value'];
    })
    console.log(data);

    var request ={
        "url":`http://localhost:3000/api/users/${data.id}`,
        "method":"PUT",
        "data":data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully")
    })
})

if(window.location.pathname == '/'){
    $ondelete=$(".table tbody td a.delete");
    $ondelete.click(function(){
        var id=$(this).attr("data-id");
        console.log(id);

        var request={
            "url":`http://localhost:3000/api/users/${id}`,
            "method":"DELETE",
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully");
                location.reload();
            })
        }
    })
}