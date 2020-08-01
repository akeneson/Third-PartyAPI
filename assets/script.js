
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

    // picking the class variable from this block whenm the saveBtn is clicked
    $(".saveBtn").click(function () {
        var savedValue = $(this).siblings(".description").val();
        var savedTime = $(this).parent().attr("id");
        // if something is there, save into saveTodo, if not create an empty array
        // saveTodo was created here as well in the same line as the obj.
        var obj = JSON.parse(window.localStorage.getItem("saveTodo")) || [];
        obj.push({
            time: savedTime,
            value: savedValue
        })

        window.localStorage.setItem("saveTodo", JSON.stringify(obj));
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