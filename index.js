const taskForm = document.getElementById("task-form");

// Input and dropdowns
const ticketTitleContainer = document.getElementById("ticketTitle");
const ticketDescriptionContainer = document.getElementById("ticketDescription");
const ticketStatusContainer = document.getElementById("task-form-ticketStatus");
const ticketCreatorContainer = document.getElementById("task-form-ticketCreator");
const ticketDateContainer = document.getElementById("task-form-date");
const ticketConcernContainer = document.getElementById("task-form-concern");
const searchBarInput = document.getElementById("search-bar");

// Ticket display container
const ticketDisplayBacklogs = document.getElementById("ticket-backlogs");
const ticketDisplayInProgress = document.getElementById("ticket-inProgress");
const ticketDisplayAcknowledged = document.getElementById("ticket-acknowledged");
const ticketDisplayCompleted = document.getElementById("ticket-completed");

// Buttons
const openFormBtn = document.getElementById("open-task-form");
const filterBtn = document.getElementById("filter-ticket");
const analyticsBtn = document.getElementById("analytics");
const createTaskBtn = document.getElementById("create-task");
const closeFormBtn = document.getElementById("close-task-form");

const ticketsArr = [];
let currentTask = {};
let ticketCounter = 1;

const addOrUpdateTicket = () => {
    if(!ticketTitleContainer.value){
        alert("Please Input a title");
        return;
    } 

    // One way of setting ticket IDs (same logic behind dynamically setting the 
    // display based on the task's status)
    // Then set id: ticketId,

    // let ticketId;
    // if (currentTask.id){
    //     ticketId = currentTask.id;
    // } else {
    //     ticketId = `id-${Date.now()}`;
    // }'
    
    // MANUAL CHECKING - FOUR DIGIT ID FORMAT
    // let zeros;

    // if (ticketCounter < 10){
    //     zeros = "000";
    // } else if (ticketCounter > 9 && ticketCounter < 100){
    //     zeros = "00";
    // } else if (ticketCounter > 999 && ticketCounter < 1000){
    //     zeros = "0";
    // } else {
    //     zeros = "";
    // }

    const currentTaskIndex = ticketsArr.findIndex((ticket) => ticket.id === currentTask.id)
    const ticketObj = {
        id: currentTask.id || `ID-${String(ticketCounter).padStart(4, "0")}`,//`ID-${zeros}${ticketCounter}`,
        title: ticketTitleContainer.value,
        description: ticketDescriptionContainer.value,
        status: ticketStatusContainer.value,
        creator: ticketCreatorContainer.value,
        date: ticketDateContainer.value,
        concern: ticketConcernContainer.value 
    };
    
    // CONSOLE.LOG TESTING
    console.log("Tickets:", ticketsArr);

    if (currentTaskIndex === -1){
        ticketsArr.unshift(ticketObj);
        ticketCounter++;
    } else{
        ticketsArr[currentTaskIndex] = ticketObj;
    }

    updateTicketSections();
    taskForm.classList.add("hidden");
};

const updateTicketSections = () => {
    ticketDisplayBacklogs.innerHTML = "";
    ticketDisplayInProgress.innerHTML = "";
    ticketDisplayAcknowledged.innerHTML = "";
    ticketDisplayCompleted.innerHTML = "";

    ticketsArr.forEach(
        ({id, title, description, status, creator, date, concern}) => {
            let display;

            if(status === "Backlog"){
                display = ticketDisplayBacklogs;
            } else if (status === "In-Progress"){
                display = ticketDisplayInProgress;
            } else if (status === "Acknowledged"){
                display = ticketDisplayAcknowledged;
            } else if (status === "Completed"){
                display = ticketDisplayCompleted;
            } else {
                alert("No status was set!");
            }

            
            // console.log("Status: ", status);

            (display.innerHTML += `
            <div class="tasks" id="${id}">
            <p>Ticket Id: ${id}</p>
            <p>Title: ${title}</p>
            <p>Description: ${description}</p>
            <p>Status: ${status}</p>
            <p>Creator: ${creator}</p>
            <p>Date: ${date}</p>
            <p>Concern: ${concern}</p>
            <button onclick=editTicket(this) id="edit-task-form">Edit</button>
            <button onclick=deleteTicket(this) id="delete-task-form">Delete</button>
            </div>    
           `)
        }
    )
};

const filterTicketSections = () => {
    const filteredTickets = ticketsArr.filter(ticket => 
        ticket.title.toLowerCase().includes(searchBarInput.value.toLowerCase()) || 
        ticket.id.toLowerCase() === searchBarInput.value.toLowerCase()
    );

    if (searchBarInput.value === "") {
        updateTicketSections();
        console.log("TicketsArr after '' filter:", ticketsArr);
        return;
    }

    ticketDisplayBacklogs.innerHTML = "";
    ticketDisplayInProgress.innerHTML = "";
    ticketDisplayAcknowledged.innerHTML = "";
    ticketDisplayCompleted.innerHTML = "";

    filteredTickets.forEach(
        ({ id, title, description, status, creator, date, concern }) => {
        let display;

        if (status === "Backlog") {
            display = ticketDisplayBacklogs;
        } else if (status === "In-Progress") {
            display = ticketDisplayInProgress;
        } else if (status === "Acknowledged") {
            display = ticketDisplayAcknowledged;
        } else if (status === "Completed") {
            display = ticketDisplayCompleted;
        } else {
            alert("No status was set!");
            return;
        }

        display.innerHTML += `
            <div class="tasks" id="${id}">
                <p>Ticket Id: ${id}</p>
                <p>Title: ${title}</p>
                <p>Description: ${description}</p>
                <p>Status: ${status}</p>
                <p>Creator: ${creator}</p>
                <p>Date: ${date}</p>
                <p>Concern: ${concern}</p>
                <button onclick=editTicket(this) id="edit-task-form">Edit</button>
                <button onclick=deleteTicket(this) id="delete-task-form">Delete</button>
            </div>    
        `;
    });

    console.log("Filtered Tickets: ", filteredTickets);
};


// FUNCTIONS BELOW ARE FOR THE TASK FORM
const editTicket = (Button) => {
    const currentTaskIndex = ticketsArr.findIndex((ticket) => ticket.id === Button.parentElement.id)

    currentTask = ticketsArr[currentTaskIndex];

    ticketTitleContainer.value = currentTask.title
    ticketDescriptionContainer.value = currentTask.description
    ticketStatusContainer.value = currentTask.status
    ticketCreatorContainer.value = currentTask.creator
    ticketDateContainer.value = currentTask.date
    ticketConcernContainer.value = currentTask.concern
    createTaskBtn.innerText = "Update Task";

    taskForm.classList.remove("hidden");

    console.log("Current Task's Index: ",currentTask.id);
};

const deleteTicket = (Button) => {
    const currentTaskIndex = ticketsArr.findIndex((ticket) => ticket.id === Button.parentElement.id)

    Button.parentElement.remove();
    ticketsArr.splice(currentTaskIndex, 1);
}

const reset = () => {
    ticketTitleContainer.value = "";
    ticketDescriptionContainer.value = "";
    ticketStatusContainer.value = "Backlog";
    ticketCreatorContainer.value = "";
    ticketDateContainer.value = "";
    ticketConcernContainer.value = "";
    currentTask = {};
};

openFormBtn.addEventListener("click", ()=> {
    reset();
    taskForm.classList.remove("hidden");
});

closeFormBtn.addEventListener("click", () => {
    taskForm.classList.add("hidden");
});

createTaskBtn.addEventListener("click", () =>{
    addOrUpdateTicket();
});



