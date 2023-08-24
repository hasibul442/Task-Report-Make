<script>
$(document).ready(function () {
    $('#summernote').summernote({
        placeholder: 'Enter Task List',
        tabsize: 2,
        height: 400
    });

    $("#update_list").click(function () {
        var updated_list = $("#summernote").val();
        // console.log(updated_list);
        var tempElement = document.createElement("div");
        tempElement.innerHTML = updated_list;
        // console.log(tempElement);

        var listItems = tempElement.querySelectorAll("ol li");

        for (var i = 0; i < listItems.length; i++) {
            var sublistItems = listItems[i].querySelectorAll("ul li"); // Get sublist items under current ol li
            for (var j = 0; j < sublistItems.length; j++) {
                // Access and manipulate sublist items using sublistItems[j]
                var sublistItemText = sublistItems[j].innerText; // Get the text content of the sublist item
                console.log("Sublist Item Text:", sublistItemText);
            }
        }

        $("#showed_data").empty();
        $("#showed_data").append(updated_list);
    });
});
</script>