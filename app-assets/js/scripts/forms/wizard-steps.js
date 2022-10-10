/*=========================================================================================
    File Name: wizard-steps.js
    Description: wizard steps page specific js
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// Wizard tabs with numbers setup
$(".number-tab-steps").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
    transitionEffect: "fade",
    titleTemplate: '<span class="step">#index#</span> #title#',
    labels: {
		next: 'Pr\u00f3ximo',
        finish: 'Concluir'
    },
    onFinished: function (event, currentIndex) {
        alert("Form submitted1.");
    }
});

// Wizard tabs with icons setup
$(".icons-tab-steps").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
    transitionEffect: "fade",
	content: "<strong>HTML code</strong>",
    titleTemplate: '<span class="step">#index#</span> #title#',
    labels: {
		next: 'Pr\u00f3ximo',
        finish: 'Concluir'
    },
    onFinished: function (event, currentIndex) {
        alert("Form submitted2.");
    }
});

// Validate steps wizard

// Show form
var form = $(".steps-validation").show();






$(".steps-validation").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
    transitionEffect: "fade",
    titleTemplate: '<span class="step">#index#</span> #title#',
    labels: {
		next: 'Pr\u00f3ximo',
        finish: 'Concluir'
    },
    onStepChanging: function (event, currentIndex, newIndex) {
        // Allways allow previous action even if the current form is not valid!
		
		var check_cartao = null;
		
		
		if (currentIndex === 1){
			
			check_cartao = $("#cardnumber").val();
			check_cartao = check_cartao.replace(/ /g, '');
			if (check_cartao.length != 16){
				swal('N\u00famero do Cart\u00e3o Inv\u00e1lido', '', 'error');
				return false;
			}
			
			
			check_cpf = $("#cpf").val();
			if(validarCPF(check_cpf)){
				return true;
			}else{
				swal('CPF Inv\u00e1lido','','error'	);
				return false;
			}
		}
		
		
		
	
		
		
        if (currentIndex > newIndex) {
            return true;
        }

        // Needed in some cases if the user went back (clean up)
        if (currentIndex < newIndex) {
            // To remove error styles
            form.find(".body:eq(" + newIndex + ") label.error").remove();
            form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
        }
        form.validate().settings.ignore = ":disabled,:hidden";
        return form.valid();
    },
    onFinishing: function (event, currentIndex) {
        form.validate().settings.ignore = ":disabled";
        return form.valid();
    },
    onFinished: function (event, currentIndex) {
		var els = document.querySelectorAll("a[href^='#finish']");

        for (var i = 0, l = els.length; i < l; i++) {
            var el = els[i];
            el.innerHTML = el.innerHTML = 'Pagando...';
            el.disabled = true;
        }
        //alert("Submitted3!");
		
		generatePayment();
    }
});

// Initialize validation
$(".steps-validation").validate({
     //ignore: 'input[type=hidden]', ignore hidden fields
    errorClass: 'danger',
    successClass: 'success',
    highlight: function (element, errorClass) {
        $(element).removeClass(errorClass);
    },
    unhighlight: function (element, errorClass) {
        $(element).removeClass(errorClass);
    },
    errorPlacement: function (error, element) {
        error.insertAfter(element);
    },
	 rules: {
            cardnumber: "required",
			name: "required",
			expirationdate: "required",
			securitycode: "required",
			//postalCode: "required",
			cpf: "required",
			street: "required",
			number: "required",
			district: "required",
			state: "required",
			city: "required",
			phone: "required"
			
			
	 },
	  messages: {
            cardnumber: "Informe o N\u00famero do Cart\u00e3o",
			name: "Informe o Titular do Cart\u00e3o",
			expirationdate: "Informe a Data de Vencimento do Cart\u00e3o",
			securitycode: "Informe o C\u00f3digo de Seguran\u00e7a",
			cpf: "Informe o CPF",
			//postalCode: "Informe o CEP",
			street: "Informe o Endereco",
			number: "Informe o Numero",
			district: "Informe o Bairro",
			state: "Informe o Estado",
			city: "Informe a Cidade",
			phone: "Informe o Telefone"
			
	  }
});


function validarCPF(cpf) {	
	cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf == '') return false;	
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999")
			return false;		
	// Valida 1o digito	
	add = 0;	
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))		
			return false;		
	// Valida 2o digito	
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
		return false;		
	return true;   
}
