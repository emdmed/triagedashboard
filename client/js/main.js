//request patient exmple onload
let PATIENT_EXAMPLE;

function requestPatientExample(){
    $.ajax({
        url: "/patient_example",
        method: "GET",
        success: function(res){
            let data = res
            PATIENT_EXAMPLE = data;
            console.log(PATIENT_EXAMPLE);
            console.log("Patient model retrieved");
        }
    })
}

$("body").on("click", "#send_patient_btn", function(){
    //validation pending

    let phone = $("#patient_phone").val();
    let age = $("#patient_age").val();

    PATIENT_EXAMPLE.info.phone = phone;
    PATIENT_EXAMPLE.info.age = age

    render_clinic_triage()
})

$("body").on("click", "#getPatientList_btn", function(){

    $.ajax({
        url: "/patient_list",
        method: "GET",
        success: function(res){
            let data = res

            $("#patient_cards_here").empty();

            data.forEach(element => {
                $("#patient_cards_here").append(`
                
                    <div class="card text-center mx-auto" id="${element.info.phone}" style="max-width: 300px">
                        <div class="card-body text-center">
                            <h4 class="text-left">Edad: ${element.info.age}</h4>
                            <h3>Prioridad: ${element.score}</h3>
                            <hr>
                            <a class="btn btn-succes" href="https://api.whatsapp.com/send?phone=${element.info.phone}&text=Yapuedeingresar">Hacer pasar</a>
                        </div>
                    </div>

                `)
            });
        }
    })

});

$("body").on("click", "#addTestPatient_btn", function(){

    $.ajax({
        url: "/score_patient",
        method: "GET",
        success: function(res){
            console.log("success")
        }
    })

});

function render_clinic_triage(){
    $("#clinic_triage_modal").find(".modal-body").empty();

    let symptoms = PATIENT_EXAMPLE.ruleOut;

    for(key1 in symptoms){
        for(key2 in questions){
            if(key1 === key2){
                $("#clinic_triage_modal").find(".modal-body").append(`
    
                <button class="btn btn-outline-primary ruleout_btn" id="${key1}">${questions[key2]}</button>    
                <hr>
    
            `)
            }
        }
    }

    //re render continue button
    $("#clinic_triage_modal").find(".modal-footer").empty();
    $("#clinic_triage_modal").find(".modal-footer").append(`
    
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" id="end_patient_modal_btn">Continuar</button>

    `)
}

$("body").on("click", ".ruleout_btn", function(){

    let id = $(this).attr("id");

    PATIENT_EXAMPLE.ruleOut[id] = true;

    $.ajax({
        url: "/send_patient_to_server",
        method: "POST",
        contentType: "application/JSON",
        data: JSON.stringify(PATIENT_EXAMPLE),
        success: function(res){
            console.log(res);
            $("#clinic_triage_modal").find(".modal-body").empty();
            $("#clinic_triage_modal").find(".modal-body").append(`
            
                <p>Telefono</p>
                <input type="number" placeholder="Telefono celular" id="patient_phone" value="11">
                <hr>
                <p>Edad</p>
                <input type="number" placeholder="Edad" id="patient_age">

            `);

            $("#clinic_triage_modal").modal("hide");
          
         
        }

    })

})

//reset add_patient modal when hidden
$('#clinic_triage_modal').on('hidden.bs.modal', function () {
    $("#clinic_triage_modal").find(".modal-body").empty();
    $("#clinic_triage_modal").find(".modal-body").append(`
    
        <p>Telefono</p>
        <input type="number" placeholder="Telefono celular" id="patient_phone" value="11">
        <hr>
        <p>Edad</p>
        <input type="number" placeholder="Edad" id="patient_age">

    `);

    $("#clinic_triage_modal").find(".modal-footer").empty();
    $("#clinic_triage_modal").find(".modal-footer").append(`
    
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" id="send_patient_btn">Continuar</button>

    `)
});

$("body").on("click", "#end_patient_modal_btn", function(){
    //continue
})