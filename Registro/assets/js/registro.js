new Vue({
	el:".divregister",
	data:{
		form:{
			type:0, /// login=0, registro=1, recuperar contraseña=2
			name:"",
			email:"",
			password:"",
			},

		areas:['Matemáticas','Programación', 'etc'],	
			
	},
	methods:{	
			
		sendform(){
			if(this.form.type== 0 && !this.validaEmail && !this.validaPassword){
				console.log(this.form)
				window.location="mentor.html"
				return true;
			}
			else if(this.form.type== 1 && !this.validaEmail && !this.validaRepetirPassword){
				console.log(this.form)
				
				//window.location=""
				db.ref('/user/index/registro')
				.push({
					type: this.form.type,
					name: this.form.name,
					email: this.form.email,
					password: this.form.password,
					passwordos: this.form.passwordos,
					areas: this.form.areas
				}).then(() =>{
					this.form.type = '',
					this.form.name = '',
					this.form.email = '',
					this.form.password = '',
					this.form.passwordos = '',
					this.form.areas = ''
				});
				alert("Registro completo, porfavor confirma tu correo!");
				return true;
			}
			else if(this.form.type== 2 && !this.validaEmail){
				console.log(this.form)
				//alert("Porfavor revisa tu corre, te hemos enviado un link para recuperar tu contraseña");
				return true;
				
			}

			return false;
		},
		validaType(){
			if(this.form.type== 0 && !this.validaEmail && !this.validaPassword){
				return true;
			}
			else if(this.form.type== 1 && !this.validaEmail && !this.validaRepetirPassword){
				return true;
			}
			else if(this.form.type== 2 && !this.validaEmail){
				return true;
			}
			return false;
		}
		
	},
        
	computed:{
		
			
		validaEmail(){
			var exp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; 
			if(exp.test(this.form.email)){
				return false;
			} 
			else{
				return true;
			}
		},
		validaPassword(){
            var exp = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
            if(exp.test(this.form.password)){
                return false;
            } else{
                return true;
            }
		},
		validaRepetirPassword(){
			if(this.form.password==this.form.passwordos){
				return false;
			} else{
				return true;
			}
		},
		title(){
			return (this.form.type==0)?'INICIAR SESIÓN':(this.form.type==1)?'REGISTRO':'RECUPERAR CONTRASEÑA';
		}

	}
	
});