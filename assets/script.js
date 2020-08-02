
// remember this ready function, because it doesn't reload the page. Everything inside this function.
$(document).ready(function () {
    var rightNow = moment().toString('MMMM Do YYYY, h:mm:ss a');
    var hourNow = moment().hours();

    function hour() {
        // for each time-block, we grabbed the ID -- which is the hour -- and then we stored it into block.
        // then compare it to hourNOW (this moment in time right now)
        $(".time-block").each(function (index) {
            var block = $(this).attr("id");
            console.log(hourNow);
            console.log(block);
            if (hourNow > block) {
                // the addClass function, adds that class into ".time-block", which will style the row with the colors accordingly. This one will be gray
                $(this).addClass("past");
            } else if (hourNow == block) {
                // this one will be red
                $(this).addClass("present");
            } else {
                // this one will be green
                $(this).addClass("future");
            }
        });
    }

    // display current day
    $("#currentDay").append(moment().format('dddd ll'));

    // picking the class variable from this block when the saveBtn is clicked
    $(".saveBtn").click(function () {
        // saveBtn is the singling of description --- which holds the value
        var savedValue = $(this).siblings(".description").val();
        // but the id is stored in the parent of the columns, which is the row.
        var savedTime = $(this).parent().attr("id");
        // if something is there, save into saveTodo, if not create an empty array
        // saveTodo was created here in the same line as this obj was created.
        var obj = JSON.parse(window.localStorage.getItem("saveTodo")) || [];
        // this function, takes the obj, and push it into an object to call from. Organization.
        obj.push({
            time: savedTime,
            value: savedValue
        })
        // this get the item, "saveTodo", and sets the item into the string
        window.localStorage.setItem("saveTodo", JSON.stringify(obj));
        
        // checks to see if the save button worked
        $(".time-block").each(function (index) {
            console.log(savedValue);
            console.log(savedTime);

        })
    })
    // get the items from the array
    let saveItems = JSON.parse(localStorage.getItem("saveTodo"))
    console.log(saveItems);

    // for each description, grab the id == which is the time it was saved, and store the item.
    $(".description").each(function(index, value) {
        let id = $(this).parent().attr("id");
        console.log(index, value, id);
        for (let i=0; i<saveItems.length; i++){
            console.log(saveItems[i].time);
            if (id == saveItems[i].time){
                $(this).text(saveItems[i].value);
            }
        }
    })

    hour();

})