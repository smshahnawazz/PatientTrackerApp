/****************** firebase references ******************/
 var dbRef = firebase.database().ref('user');
 var dbCounterRef = firebase.database().ref('counter');
 var storageRef = firebase.storage().ref();

/****************** start of signUp Function ******************/
function signUp(){
var signup_username = document.getElementById('signup-username');
var signup_email = document.getElementById('signup-email');
var signup_password = document.getElementById('signup-password');
var signup_rpassword = document.getElementById('signup-rpassword');

if(signup_username.value == "" || signup_email.value == "" || signup_password.value == "" || signup_rpassword.value == "" ){
	swal("Warning", "Please fill the form properly!", "warning");
}
else{
	if(signup_password.value != signup_rpassword.value){
		swal("Warning", "Password and repeat password doesn't match!", "warning");
	}
	else{
		var auth = firebase.auth().createUserWithEmailAndPassword(signup_email.value, signup_password.value);
		auth.then(function(){
			swal("Congratulations", "You've created your account successfully!", "success").then(function(){
				window.location = "login.html";
			});
		}).catch(function(error){
			swal("Error",error.message, "error");
		});
	}
}
} // end of signUp function

/****************** start of login Function ******************/
function loginAccount(){
var login_email = document.getElementById('login-email');
var login_password = document.getElementById('login-password');

	if(login_email.value == "" || login_password.value == ""){
		swal("Warning", "Please enter the fields properly.", "warning");
	}
	else{
		var auth = firebase.auth().signInWithEmailAndPassword(login_email.value, login_password.value);
		auth.then(function(){
			window.location = "dashboard.html";
		}).catch(function(error){
			swal("Error",error.message, "error");
		});
	}
} // end of login function

/****************** Password Reset Function ******************/ 
function resetPassword(){
	var email = document.getElementById('login-email');
	if(email.value!=""){
		swal({
			  title: "Reset Password!",
			  text: "Password reset link will be sent to your email address. if the typed address is your correct email address, click OK. ",
			  icon: "warning",
			  buttons: true,
})
.then((willSend) => {
  if (willSend) {
	  var sent  = firebase.auth().sendPasswordResetEmail(email.value);
	  sent.then(function(){
		  swal("Email Sent","Password reset link has been sent to your email address. Kindly check your email account.", {
		  icon: "success",
		  }); 
	  }).catch(function(error){
		  swal("Error", error.code + ": "+ error.message,"error");
	  });
   
  }
});
		
} // checking for empty email field.
	else{
		swal("Error","Please enter your email address to get the password reset link.","error");
	}
}

/****************** start of logout Function ******************/ 
function logout(){
	var auth = firebase.auth().signOut();
	auth.then(function(){
		window.location = "login.html";
	}).catch(function(error){
		swal("Error", error.message, "error");
	});
} //End of Logout Function

/****************** authentication checker ******************/ 
function authenticationChecker(){
	 firebase.auth().onAuthStateChanged(function(user){
		if(user){
			console.log("You are Logged In.");
		}
		else{
			swal("Error", "Please Login to your account to access this page","error").then(function(){
				window.location = "login.html";
			});
		}
	});
} //End of authentication checker

/****************** Dashboard buttons functionality ******************/
function dashboard(){
var add_btn_dashboard = document.getElementById('add');
var edit_btn_dashboard = document.getElementById('edit');
var delete_btn_dashboard = document.getElementById('delete');
var search_id_btn_dashboard = document.getElementById('byid');
var export_btn_dashboard = document.getElementById('pdf');	
var print_btn_dashboard = document.getElementById('print_record');	

add_btn_dashboard.onclick = function(){
	window.location = "add.html";
}

edit_btn_dashboard.onclick = function(){
	window.location = "edit.html";
}

delete_btn_dashboard.onclick = function(){
	window.location = "delete.html";
}

search_id_btn_dashboard.onclick = function(){
	window.location = "searchById.html";
}

export_btn_dashboard.onclick = function(){
	window.location = "export.html";
}

print_btn_dashboard.onclick = function(){
	window.location = "print.html";
}

} //End of Dashboard Functionality

/****************** Dashboard Date and Time function ******************/
function dateTime(){
		//getting date and time using Date's methods
		var today = new Date();
		var day  =today.getDay();
		var date = today.getDate();
		//setting date to display two digits 
		date = date<10 ? "0"+date : date;
		var month = today.getMonth();
		var year = today.getFullYear();
		var hours = today.getHours();
		var minutes = today.getMinutes();
		//setting minutes to display two digits 
		minutes = minutes<10 ? "0"+minutes : minutes;
		var seconds = today.getSeconds();
		//setting seconds to display two digits
		seconds = seconds<10 ? "0"+seconds : seconds;
		//setting hours to display 12 instead of 0
		hours = hours == 00 ? 12 : hours;
		//getting AM or PM
		var AmPm = hours >= 12 ? "PM" : "AM";
		//converting 24 hours time format into 12 hours time format
		hours = hours>12 ? hours - 12 : hours;
		//setting hours to display two digits 
		hours = hours<10 ? "0"+hours : hours;
		var data;
		return data = [day,date, month, year, hours, minutes, seconds, AmPm ];
}
function dashboardDateTime(element){
		var el = document.getElementById(element); //element for the date and time
		setInterval(function(){	
		var data = dateTime();
		//array for days 
			var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday", "Saturday"];
			var months = ["Jan","Feb", "Mar","Apr","May","June","Jul","Aug","Sep","Oct","Nov","Dec"];
		el.innerHTML = `
		<span><b>${days[data[0]]}</b>, ${months[data[2]]},${data[1]} ${data[3]} &nbsp; ${data[4]}:${data[5]}:${data[6]} ${data[7]}</span>
	`;
	},1000);
}

/****************** Capitalize Each Word -- Helper Function ******************/
function capitalize(name){
	var fullName = name.split(" ");
	var capitalizeName="";
	for(key in fullName){
		capitalizeName += fullName[key].charAt(0).toUpperCase()+fullName[key].slice(1).toLowerCase()+" ";
	}
	return capitalizeName;
}


/****************** Inserting Add Form Data to the Firebase Database ******************/

//reading current counter value
var counter_value;
function counterValue(){
add_form_id = document.getElementById('add-id');
dbCounterRef.on('value',function(snapshot){
	var snap = snapshot.val();
	counter_value = snap.counter_val;
	add_form_id.value = counter_value;
});
}

 function addData(){		  //addData() Function
var add_form_id = document.getElementById('add-id');
var add_form_name = document.getElementById('add-name');
var add_form_age = document.getElementById('add-age');
var add_form_date = document.getElementById('add-date');
var add_form_disease = document.getElementById('add-disease');
var add_form_medications = document.getElementById('add-medications');
var add_form_weight = document.getElementById('add-weight');
var add_form_growth = document.getElementById('add-growth');
var add_form_blood = document.getElementById('add-blood');
var add_form_blood_pressure = document.getElementById('add-blood-pressure');
var add_form_pulse_rate = document.getElementById('add-pulse-rate');
var add_form_sugar = document.getElementById('add-sugar');
var add_form_doctor = document.getElementById('add-doctor');
var add_form_photo = document.getElementById('add-photo');

if(add_form_id.value !="" && add_form_name.value !="" && add_form_age.value !="" && add_form_date.value!="" && add_form_disease.value !="" && add_form_medications.value!="" && add_form_weight.value !="" && add_form_growth.value !="" && add_form_blood.value !="" && add_form_blood_pressure.value !="" && add_form_pulse_rate.value !="" && add_form_sugar.value !="" && add_form_doctor.value !="" ) {
	if(add_form_photo.files[0]){
	var add_form_data = {    //Patient data object 
	 p_id: add_form_id.value,
	 p_name: capitalize(add_form_name.value),
	 p_age: add_form_age.value,
	 p_date: add_form_date.value,
	 p_disease: capitalize(add_form_disease.value),
	 p_medications: capitalize(add_form_medications.value),
	 p_weight: add_form_weight.value,
	 p_growth: add_form_growth.value,
	 p_blood: add_form_blood.value,
	 p_blood_pressure: add_form_blood_pressure.value,
	 p_pulse_rate: add_form_pulse_rate.value,
	 p_sugar: add_form_sugar.value,
	 p_doctor: capitalize(add_form_doctor.value) 
 }
  //Checking Uploading Status 
  var taskUpload = storageRef.child(counter_value.toString()).put(add_form_photo.files[0]);
  taskUpload.on("state_changed",function(snapshot){
	  var status = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	  swal(`upload Status: ${Math.round(status)}%`,"Please Wait. Do not Close this notification otherwise your upload will be cancelled.",'warning').then(function(value){
			if((value==null || value==true) && status!=100){
				taskUpload.cancel();
			}
	  });
  },function(){ 
	  swal('Error','Data Uploading Failed due to action performed by the User.','error');
  },function(){
	dbRef.child(counter_value).set(add_form_data);
	counter_value++;
	dbCounterRef.update({
	counter_val: counter_value
	});
  	//Success Message
	 alertify.notify('Add Successful', 'custom', 2);
  });

  //Clear Form Data
	clearData();
	
  //Reading Counter Value
  counterValue();
  
  //setting focus to Product name Field
  add_form_name.focus();
} //end of condition for Photo Validation 
else{
	swal("OOPS", "Please Select Patient Photo.", "warning");
} 
} // End of condition for validation
else{
	swal("OOPS!","Please enter the form properly.","warning");
}
}  //End of Add Data Function

/****************** Add Form Photo Preview after selecting Photo ******************/
function previewImage(){
var add_form_photo = document.getElementById('add-photo');
var dataURL;
if(add_form_photo.value!=""){
	var reader = new FileReader();
	reader.onload = function(){
		dataURL = reader.result;
		swal("Preview Photo","",{
			className:"sweet-alert-img",
			icon: dataURL
		});
	}

	reader.readAsDataURL(add_form_photo.files[0]);

}
else{
	swal("OOPs","Please select Photo.","warning");
}
}

/****************** Clear Form Data ******************/
function clearData(){
var add_form_name = document.getElementById('add-name');
var add_form_age = document.getElementById('add-age');
var add_form_date = document.getElementById('add-date');
var add_form_disease = document.getElementById('add-disease');
var add_form_medications = document.getElementById('add-medications');
var add_form_weight = document.getElementById('add-weight');
var add_form_growth = document.getElementById('add-growth');
var add_form_blood = document.getElementById('add-blood');
var add_form_blood_pressure = document.getElementById('add-blood-pressure');
var add_form_pulse_rate = document.getElementById('add-pulse-rate');
var add_form_sugar = document.getElementById('add-sugar');
var add_form_doctor = document.getElementById('add-doctor');
var add_form_photo = document.getElementById('add-photo');
  add_form_name.value = "";
  add_form_age.value = "";
  add_form_date.value = "";
  add_form_disease.value = "";
  add_form_medications.value = "";
  add_form_weight.value = "";
  add_form_growth.value = "";
  add_form_blood.value = "Select";
  add_form_blood_pressure.value = "";
  add_form_pulse_rate.value = "";
  add_form_sugar.value = "";
  add_form_doctor.value = "";
  add_form_photo.value = "";
} //End of clear Form data function

/****************** Fetching Data from the Firebase Database and displaying them into fields******************/

var urlForUpdate;
function loadData(){
var edit_form_id = document.getElementById('edit-id');
var edit_form_name = document.getElementById('edit-name');
var edit_form_age = document.getElementById('edit-age');
var edit_form_date = document.getElementById('edit-date');
var edit_form_disease = document.getElementById('edit-disease');
var edit_form_medications = document.getElementById('edit-medications');
var edit_form_weight = document.getElementById('edit-weight');
var edit_form_growth = document.getElementById('edit-growth');
var edit_form_blood = document.getElementById('edit-blood');
var edit_form_blood_pressure = document.getElementById('edit-blood-pressure');
var edit_form_pulse_rate = document.getElementById('edit-pulse-rate');
var edit_form_sugar = document.getElementById('edit-sugar');
var edit_form_doctor = document.getElementById('edit-doctor');
var edit_form_photo = document.getElementById('edit-photo');
var edit_preview_btn = document.getElementById('edit-preview');

if(edit_form_id.value!=""){ //Checking for Patient ID
  var recordFound = false;
  //fetching Patient IDs from database
  dbRef.on("value",function(snapshot){
  	var snap = snapshot.val();
	for(user in snap){
		if(snap[user].p_id == edit_form_id.value){
			recordFound = true;
		}
	}
  if(recordFound){ //Checking for records 
    dbRef.child(edit_form_id.value).on('value',function(snapshot){
	var snap = snapshot.val();
	edit_form_name.value = snap.p_name;
	edit_form_age.value = snap.p_age;
	edit_form_date.value = snap.p_date;
	edit_form_disease.value = snap.p_disease;
	edit_form_medications.value = snap.p_medications;
	edit_form_weight.value = snap.p_weight;
	edit_form_growth.value = snap.p_growth;
	edit_form_blood.value = snap.p_blood;
	edit_form_blood_pressure.value = snap.p_blood_pressure;
	edit_form_pulse_rate.value = snap.p_pulse_rate;
	edit_form_sugar.value = snap.p_sugar;
	edit_form_doctor.value = snap.p_doctor;
  });
  var id = edit_form_id.value;
  function edit_previewImage(){
    var url = storageRef.child(id).getDownloadURL();
	url.then(function(url){
		if(edit_form_photo.files[0]){
			var reader = new FileReader();
			reader.onload = function(){
			  dataURL = reader.result;
			  swal("Preview Photo","",{
			  className:"sweet-alert-img",
			  icon: dataURL
		      });
		    }
          	reader.readAsDataURL(edit_form_photo.files[0]);
		}
		else{
		swal("Preview Photo","",{
			className:"sweet-alert-img",
			icon:url
		  });
		}
		var urlForUpdate = url;
	});
  }
  edit_preview_btn.disabled = false;
  edit_preview_btn.onclick = edit_previewImage;

  } //End of Checking records
  else{
	editClearData();
	swal("OOPs", "Record Not Found! Please enter a valid Patient ID.","error");
  }
});
} //End of checking for patient ID

else{
   editClearData();
   swal("OOPS","Please enter a valid Patient ID.","error");
}
}  //End of Load Data Function

/****************** Edit Clear Form Data ******************/
function editClearData(){
var edit_form_id = document.getElementById('edit-id');
var edit_form_name = document.getElementById('edit-name');
var edit_form_age = document.getElementById('edit-age');
var edit_form_date = document.getElementById('edit-date');
var edit_form_disease = document.getElementById('edit-disease');
var edit_form_medications = document.getElementById('edit-medications');
var edit_form_weight = document.getElementById('edit-weight');
var edit_form_growth = document.getElementById('edit-growth');
var edit_form_blood = document.getElementById('edit-blood');
var edit_form_blood_pressure = document.getElementById('edit-blood-pressure');
var edit_form_pulse_rate = document.getElementById('edit-pulse-rate');
var edit_form_sugar = document.getElementById('edit-sugar');
var edit_form_doctor = document.getElementById('edit-doctor');
var edit_form_photo = document.getElementById('edit-photo');
var edit_preview_btn = document.getElementById('edit-preview');
  edit_form_id.value = "";
  edit_form_name.value = "";
  edit_form_age.value = "";
  edit_form_date.value = "";
  edit_form_disease.value = "";
  edit_form_medications.value = "";
  edit_form_weight.value = "";
  edit_form_growth.value = "";
  edit_form_blood.value = "Select";
  edit_form_blood_pressure.value = "";
  edit_form_pulse_rate.value = "";
  edit_form_sugar.value = "";
  edit_form_doctor.value = "";
  edit_form_photo.value = "";
  edit_preview_btn.disabled = true;
} //End of Edit clear Form data function

/****************** Update Edit Form Data ******************/
function updateData(){
var edit_form_id = document.getElementById('edit-id');
var edit_form_name = document.getElementById('edit-name');
var edit_form_age = document.getElementById('edit-age');
var edit_form_date = document.getElementById('edit-date');
var edit_form_disease = document.getElementById('edit-disease');
var edit_form_medications = document.getElementById('edit-medications');
var edit_form_weight = document.getElementById('edit-weight');
var edit_form_growth = document.getElementById('edit-growth');
var edit_form_blood = document.getElementById('edit-blood');
var edit_form_blood_pressure = document.getElementById('edit-blood-pressure');
var edit_form_pulse_rate = document.getElementById('edit-pulse-rate');
var edit_form_sugar = document.getElementById('edit-sugar');
var edit_form_doctor = document.getElementById('edit-doctor');
var edit_form_photo = document.getElementById('edit-photo');
var edit_preview_btn = document.getElementById('edit-preview');

if(edit_form_id.value !="" && edit_form_name.value !="" && edit_form_age.value !="" && edit_form_date.value!="" && edit_form_disease.value !="" && edit_form_medications.value!="" && edit_form_weight.value !="" && edit_form_growth.value !="" && edit_form_blood.value !="" && edit_form_blood_pressure.value !="" && edit_form_pulse_rate.value !="" && edit_form_sugar.value !="" && edit_form_doctor.value !="" ) {
	if(edit_form_photo.files[0]|| urlForUpdate!= ""){
//Updated data Object
  var updatedData = {
	 p_name: capitalize(edit_form_name.value),
	 p_age: edit_form_age.value,
	 p_date: edit_form_date.value,
	 p_disease: capitalize(edit_form_disease.value),
	 p_medications: capitalize(edit_form_medications.value),
	 p_weight: edit_form_weight.value,
	 p_growth: edit_form_growth.value,
	 p_blood: edit_form_blood.value,
	 p_blood_pressure: edit_form_blood_pressure.value,
	 p_pulse_rate: edit_form_pulse_rate.value,
	 p_sugar: edit_form_sugar.value,
	 p_doctor: capitalize(edit_form_doctor.value) 
};
if(edit_form_photo.files[0]){
	var taskUpload = storageRef.child(edit_form_id.value).put(edit_form_photo.files[0]);
	taskUpload.on('state_changed',function(snapshot){
		var status = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		swal(`Upload Status: ${Math.round(status)}%`,"Please Wait. Do not Close this notification otherwise your upload will be cancelled.",'warning').then(function(value){
				if((value==true || value==null) && status!=100 ){
					taskUpload.cancel();
				}
		});
	},function(){
		swal('Error','Data Uploading Failed due to action performed by the User.','error');
	},function(){
		dbRef.child(edit_form_id.value).update(updatedData);
		//Success Message
	 alertify.notify('Update Successful', 'custom', 2);
	 editClearData();
	});
}
else{
	dbRef.child(edit_form_id.value).update(updatedData);
	//Success Message
	alertify.notify('Update Successful', 'custom', 2);
	editClearData();
}


} //Checking for selected Photo
else{
	swal('Error',"Please select Photo.","error");
}
} //Checking for fields
else{
	swal("Error","Please enter the fields properly.","error");
}

} // End of Update Data

/****************** Deleting Record-------Search By Patient ID ******************/
var refForImageAndDelete;

function searchById(){
	var p_id = document.getElementById('delete-patient-id');
	var data_table = document.getElementById('data-table');
	var button_part = document.getElementById('button-part');
if(p_id.value!=""){
	dbRef.child(p_id.value).once("value",function(snapshot){
		var snap = snapshot.val();
		if(snap){
		data_table.innerHTML = `
							<table class="table table-bordered table-striped table-responsive animated fadeIn">
								<tr>
									<td colspan=4 align=center><h4>Patient Record - ID # ${snap.p_id}</h4> </td>
								</tr>
								<tr>
								
									<td><b>Patient Name</b></td>
									<td>${snap.p_name}</td>								
								</tr>
								<tr>
									<td><b>Patient Age</b></td>
									<td>${snap.p_age}</td>	
								</tr>
								<tr>
									<td><b>Appointment Date</b></td>
									<td>${snap.p_date}</td>
								</tr>
								<tr>
									<td><b>Disease<b></td>
									<td>${snap.p_disease}</td>
								</tr>
								<tr>
									<td><b>Medications<b></td>
									<td>${snap.p_medications}</td>
								</tr>
								<tr>
									<td><b>Weight (in KG)<b></td>
									<td>${snap.p_weight}</td>
								</tr>
								<tr>
									<td><b>Growth<b></td>
									<td>${snap.p_growth}</td>
								</tr>
								<tr>
									<td><b>Blood Group<b></td>
									<td>${snap.p_blood}</td>
								</tr>
								<tr>
									<td><b>Blood Pressure<b></td>
									<td>${snap.p_blood_pressure}</td>
								</tr>
								<tr>
									<td><b>Pulse Rate<b></td>
									<td>${snap.p_pulse_rate}</td>
								</tr>
								<tr>
									<td><b>Sugar<b></td>
									<td>${snap.p_sugar}</td>
								</tr>
								<tr>
									<td><b>Doctor Assigned<b></td>
									<td>${snap.p_doctor}</td>
								</tr>
								</table>
								`;
								 button_part.innerHTML = `
								 <div class='col-sm-6' style='margin-bottom:10px; padding:3px;' >
								 <button type='button' class='btn btn-danger btn-block' onclick='deleteRecord()'/><span class='glyphicon glyphicon-trash'></span>&nbsp;&nbsp;&nbsp;&nbsp;Delete Record</button>
								</div>
								 <div class='col-sm-6' style=' padding:3px;'>
								<button type=button class='btn btn-success btn-block' onclick='viewPhoto()' /><span class='glyphicon glyphicon-picture'></span>&nbsp;&nbsp;&nbsp;&nbsp;View Patient Photo</button>								
								</div>
								`;
								refForImageAndDelete = p_id.value;
	}
	else{
		swal("OOPs","Record Not Found! Please enter a valid Patient ID.","error");
	}
	});
}
else{
	swal("OOPs","Please enter a Patient ID.", 'error');
}
}
//View Photo Function
function viewPhoto(){
	url = storageRef.child(refForImageAndDelete).getDownloadURL();
	url.then(function(url){
		swal("Preview Photo","",{
			className:'sweet-alert-img',
			icon:url
		});
	});
}
//Delete Record Function
function deleteRecord(){
	swal({
  title: "Are you sure?",
  text: "Once deleted, you will not be able to recover this Record!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
	  var p_id = document.getElementById('delete-patient-id');
	  var table_data = document.getElementById('data-table');
	  var button_part = document.getElementById('button-part');
	  p_id.value="";
	  table_data.innerHTML = "";
	  button_part.innerHTML = "";
	  p_id.focus();
	  dbRef.child(refForImageAndDelete).remove();
      storageRef.child(refForImageAndDelete).delete();
	  alertify.notify("Delete Successful","custom",2)
	}
	});	
}
/******************Search Interface Programming ******************/
function searchCriteria(){
var search = document.getElementById('search');
var search_criteria = document.getElementById('search-criteria');
var data =  document.getElementById('data');

if(search.selectedIndex == 0){
	data.innerHTML = "";
	search_criteria.innerHTML = "";
}
if(search.selectedIndex == 1){
	data.innerHTML = "";
	search_criteria.innerHTML = `<div class='input-group'>
									<input type='number' class='form-control' id='search-patient-id' placeholder='Please Enter Patient ID'/>
								 	<span class='input-group-btn animated fadeIn'><button type='button' class='btn btn-default' onclick='searchRecordById()'><span class='glyphicon glyphicon-search' aria-hidden='true'></span></button></span>
								</div>
								`;
}
else if(search.selectedIndex == 2){
	data.innerHTML = "";
	search_criteria.innerHTML = `<div class='input-group'>
									<input type='search' class='form-control' id='search-patient-name' placeholder='Please Enter Patient Name'/>
								 	<span class='input-group-btn animated fadeIn'><button type='button' class='btn btn-default' onclick='searchByNameAndDate("search-patient-name")'><span class='glyphicon glyphicon-search' aria-hidden='true'></span></button></span>
								</div>
								`;
}
if(search.selectedIndex == 3){
	data.innerHTML = "";
	search_criteria.innerHTML = `<div class="row">
								<div class="col-sm-12"  style='margin-top:5px'>
								<div class='input-group'>
									<input type='date' class='form-control' id='search-date'/>
								 	<span class='input-group-btn animated fadeIn'><button type='button' class='btn btn-default' onclick='searchByNameAndDate("search-date")'><span class='glyphicon glyphicon-search' aria-hidden='true'></span></button></span>
								</div>
								</div>
								</div>
								`;
}
}

/******************Search Record By Patient ID ******************/
function searchRecordById(){
	var patient_id =  document.getElementById('search-patient-id');
	var data =  document.getElementById('data');
	if(patient_id.value !=""){
	  dbRef.child(patient_id.value).on('value',function(snapshot){
		var snap = snapshot.val();
		if(snap){
		data.innerHTML = `<table class="table table-bordered table-striped table-responsive animated fadeIn" id="data-table">

								<tr>
									<td class='text-center' colspan='2'><h4>Patient History</h4></td>
								</tr>
								<tr>
									<td colspan='2'><center><img src='icons/patient.jpg' alt='Patient Preview' id='patient-image' class='img-responsive img-thumbnail' height='180' width='150'/></center></td>
								</tr>
								<tr>
									<td><b>Patient ID</b></td>
									<td>${snap.p_id}</td>
								</tr>
								<tr>
									<td><b>Patient Name</b></td>
									<td>${snap.p_name}</td>
								</tr>
								<tr>
									<td><b>Patient's Age</b></td>
									<td>${snap.p_age}</td>
								</tr>
								<tr>
									<td><b>Appointment Date</b></td>
									<td>${snap.p_date}</td>
								</tr>
								<tr>
									<td><b>Disease</b></td>
									<td>${snap.p_disease}</td>
								</tr>
								<tr>
									<td><b>Medications</b></td>
									<td>${snap.p_medications}</td>
								</tr>
								<tr>
									<td><b>Weight (in KG)</b></td>
									<td>${snap.p_weight}</td>
								</tr>
								<tr>
									<td><b>Growth</b></td>
									<td>${snap.p_growth}</td>
								</tr>
								<tr>
									<td><b>Blood Group</b></td>
									<td>${snap.p_blood}</td>
								</tr>
								<tr>
									<td><b>Blood Pressure</b></td>
									<td>${snap.p_blood_pressure}</td>
								</tr>
								<tr>
									<td><b>Pulse Rate</b></td>
									<td>${snap.p_pulse_rate}</td>
								</tr>
								<tr>
									<td><b>Sugar</b></td>
									<td>${snap.p_sugar}</td>
								</tr>
								<tr>
									<td><b>Doctor Assigned</b></td>
									<td>${snap.p_doctor}</td>
								</tr>
								</table>
									`;

								var url = storageRef.child(patient_id.value).getDownloadURL();
								url.then(function(url){
									var patient_image = document.getElementById('patient-image');
									patient_image.src = url;	
								});												
		}
		else{
			swal("Error","Record Not Found! Please enter a valid Patient ID.","error");
		}
		}); 
	}
	else{
		swal("Error","Please enter a valid Patient ID.","error");
	}
}

/******************Search Record By Patient Name And Appointment Date ******************/

function searchByNameAndDate(el){
	var data = document.getElementById('data');
	var selectedElement = document.getElementById(el);
	
	if(selectedElement.value != ""){	//checking for empty field
		data.innerHTML = "";		
		recordFound = false;
		dbRef.on("value",function(snapshot){
			var snappy = snapshot.val();
			for(key in snappy){
				if( (snappy[key].p_name.toLowerCase().indexOf(selectedElement.value) != -1) || (snappy[key].p_date.toLowerCase().indexOf(selectedElement.value) != -1) ){
					recordFound = true;
					 break;
				}
			}
			
		if(recordFound){
		dbRef.on("child_added",function(snapshot){
			var snap = snapshot.val();
			if((snap.p_name.toLowerCase().indexOf(selectedElement.value.toLowerCase()) != -1)||(snap.p_date.toLowerCase().indexOf(selectedElement.value.toLowerCase()) != -1)){	//checking for name in the database
				data.innerHTML +=`
									<div class="panel animated fadeIn">
										<div class="panel-heading" onclick=viewPatientPhoto(${snap.p_id},${snap.p_id}) style="background:#1bbc9b;">
											<a href="#p${snap.p_id}" data-toggle="collapse" style="color:white !important;">${snap.p_name} - ${snap.p_id}</a>
										</div>
										<div id = p${snap.p_id} class="collapse">
											<div class="panel-body">
												<table class='table table-bordered table-striped table-responsive'>
													<tr>
														<td colspan="2" class='text-center'><h3>Patient Record - ${snap.p_id}</h3></td>
													</tr>
													<tr>
														<td class="text-center" colspan="2"><img src="icons/patient.jpg" alt=${snap.p_id} id =${snap.p_id} height="150" width="130" class="img-responsive img-thumbnail" /></td>
													</tr>
													<tr>
														<td><b>Patient Name</b></td>
														<td>${snap.p_name}</td>
													</tr>
													<tr>
														<td><b>Patient Age</b></td>
														<td>${snap.p_age}</b></td>
													</tr>
													<tr>
														<td><b>Appointment Date</b></td>
														<td>${snap.p_date}</td>
													</tr>
													<tr>
														<td><b>Disease</b></td>
														<td>${snap.p_disease}</td>
													</tr>
													<tr>
														<td><b>Medications</b></td>
														<td>${snap.p_medications}</td>
													</tr>
													<tr>
														<td><b>Weight (in KG)</b></td>
														<td>${snap.p_weight}</td>
													</tr>
													<tr>
														<td><b>Growth</b></td>
														<td>${snap.p_growth}</td>
													</tr>
													<tr>
														<td><b>Blood Group</b></td>
														<td>${snap.p_blood}</td>
													</tr>
													<tr>
														<td><b>Blood Pressure<b></td>
														<td>${snap.p_blood_pressure}</td>
													</tr>
													<tr>
														<td><b>Pulse Rate</b></td>
														<td>${snap.p_pulse_rate}</td>
													</tr>
													<tr>
														<td><b>Sugar</b></td>
														<td>${snap.p_sugar}</td>
													</tr>
													<tr>
														<td><b>Doctor Assigned</b></td>
														<td>${snap.p_doctor}</td>
													</tr>
												</table>
											</div>
										</div>
									</div>	
								`;			
			}//end of checking for name in the database	
		}	 // on child_added function
		);	// end of 'dbRef.on' method
		}
		else{
			swal("Error", "Record Not Found.", "error");
		}
		});
}	//end of checking for empty field - if statement

	else{
		swal("Error","Please enter a valid Patient Name","error");
	} //end of checking for empty field - else statement
	
}	//end of searchByName() function

function viewPatientPhoto(img_el, p_id){
	var img = document.getElementById(img_el);
	var imgRef = storageRef.child(p_id.toString()).getDownloadURL();
	imgRef.then(function(url){
		img.src = url;
	});
}

/******************Export As PDF or JPEG ******************/
var refForPdf;
function searchRecordForExport(){
var patient_id = document.getElementById('export-patient-id');
var data_table = document.getElementById('export-data-table');
var button_part = document.getElementById('export-button-part');
if(patient_id.value!=""){
dbRef.child(patient_id.value).on("value",function(snapshot){
	var snap = snapshot.val();
	if(snap){
		data_table.innerHTML = `<table class="table table-bordered table-striped table-responsive animated fadeIn">
								<tr>
									<td colspan='4' align='center'><h4>Patient Record - ID # ${snap.p_id}</h4></td>
								</tr>
								<tr>
									<td><b>Patient Name</b></td>
									<td>${snap.p_name}</td>									
								</tr>
								<tr>
									<td><b>Patient's Age</b></td>
									<td>${snap.p_age}</td>
								</tr>
								<tr>
									<td><b>Appointment Date</b></td>
									<td>${snap.p_date}</td>					
								</tr>
								<tr>
									<td><b>Disease</b></td>
									<td>${snap.p_disease}</td>				
								</tr>
								<tr>								
									<td><b>Medications</b></td>
									<td>${snap.p_medications}</td>									
								</tr>
								<tr>
									<td><b>Weight (in KG)</b></td>
									<td>${snap.p_weight}</td>							
								</tr>
								<tr>
									<td><b>Growth</b></td>
									<td>${snap.p_growth}</td>			
								</tr>
								<tr>
									<td><b>Blood Group</b></td>
									<td>${snap.p_blood}</td>
								</tr>
								<tr>
									<td><b>Blood Pressure</b></td>
									<td>${snap.p_blood_pressure}</td>
								</tr>
									<td><b>Pulse Rate</b></td>
									<td>${snap.p_pulse_rate}</td>
								</tr>
								<tr>				
									<td><b>Sugar</b></td>
									<td>${snap.p_sugar}</td>		
								</tr>
									<td><b>Doctor Assigned</b></td>
									<td>${snap.p_doctor}</td>							
								</tr>
								</table>
								`;
								button_part.innerHTML = `
														<div class='row animated fadeIn'>
														<div class='cotainer-fluid'>
														<div class="col-sm-6">
														<button type='button' class='btn btn-danger btn-block' onclick='exportPdf()'style='margin-top:10px;'> <span class='glyphicon glyphicon-save-file'></span>&nbsp;&nbsp;&nbsp;&nbsp;Export as PDF</button>							
														</div>
														<div class="col-sm-6">
														<a onclick='getPng()' id = 'export-png-btn' class='btn btn-success btn-block' style='margin-top:10px;'> <span class='glyphicon glyphicon-export'></span>&nbsp;&nbsp;&nbsp;&nbsp;Export as PNG</a>							
														</div>
														</div>
														</div>
														`;
									refForPdf = snap.p_id;
	}
	else{
		swal('Error','Record Not Found! Please enter a valid Patient ID.','error');
	}
});
}
else{
	swal('Error',"Please enter a valid Patient ID.","error")
}
}
//exportPdf function to generate Pdf
function exportPdf(){	
	//calling function dateTime to get the current date and time
	var data = dateTime();
	//arrays for days
	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday", "Saturday"];
	//arrays for month
	var months = ["Jan","Feb", "Mar","Apr","May","June","Jul","Aug","Sep","Oct","Nov","Dec"];
	//fetching patient's records from the database and writing on the PDF using jsPDF library
	dbRef.child(refForPdf).on("value",function(snapshot){
		var snap = snapshot.val();

	var doc = new jsPDF();
	doc.setFontSize(26);
	doc.setFont("times","roman");
	doc.text(75, 20, 'Patient Tracker');
	doc.setFontSize(16);
	doc.text(60, 28, "Maintain patients' record on a single click");
	doc.text(65, 40, `${days[data[0]]}, ${months[data[2]]} ${data[1]} ${data[3]}   ${data[4]}:${data[5]}:${data[6]} ${data[7]}`);
	doc.setFont("courier","roman");
	doc.text(41, 55, `Patient ID`);
	doc.text(120, 55, `${snap.p_id}`);
	doc.text(41, 68, `Patient Name`);
	doc.text(120, 68, `${snap.p_name}`);
	doc.text(41, 81, `Patient Age`);
	doc.text(120, 81, `${snap.p_age}`);
	doc.text(41, 94, `Appointment Date`);
	doc.text(120, 94, `${snap.p_date}`);
	doc.text(41, 107, `Disease`);
	doc.text(120, 107, `${snap.p_disease}`);
	doc.text(41, 120, `Medications`);
	doc.text(120, 120, `${snap.p_medications}`);
	doc.text(41, 133, `Weight (in KG)`);
	doc.text(120, 133, `${snap.p_weight}`);
	doc.text(41, 146, `Growth`);
	doc.text(120, 146, `${snap.p_growth}`);
	doc.text(41, 159, `Blood Group`);
	doc.text(120, 159, `${snap.p_blood}`);
	doc.text(41, 172, `Blood Pressure`);
	doc.text(120, 172, `${snap.p_blood_pressure}`);
	doc.text(41, 185, `Pulse Rate`);
	doc.text(120, 185,`${snap.p_pulse_rate}`);
	doc.text(41, 198, `Sugar`);
	doc.text(120, 198,`${snap.p_sugar}`);
	doc.text(41, 211, `Doctor Assigned`);
	doc.text(120, 211, `${snap.p_doctor}`);
	doc.text(45, 231, "This is a system generated report without any error.");
	doc.save(refForPdf);
		});
}
function getPng(){
	var val = 0;
	var export_data_table = document.getElementById('export-data-table');
	var export_png_btn = document.getElementById('export-png-btn');
     html2canvas(export_data_table,{
		 onrendered:function(canvas){
			 			 export_png_btn.setAttribute('download',refForPdf);

			 imgUrl = canvas.toDataURL('image/png');
			 export_png_btn.setAttribute('href',imgUrl);
		 }
	 });
}


/******************Printing Patient's Record ******************/
// Fetching records from database for Printing
var refForPrinting;
function searchRecordForPrinting(){
var patient_id = document.getElementById('print-patient-id');
var data_table = document.getElementById('data-table');
var button_part = document.getElementById('button-part');
if(patient_id.value!=""){
dbRef.child(patient_id.value).on("value",function(snapshot){
	var snap = snapshot.val();
	if(snap){
		data_table.innerHTML = `<table class="table table-bordered table-striped table-responsive animated fadeIn">
								<tr>
									<td colspan='4' align='center'><h4>Patient Record - ID # ${snap.p_id}</h4></td>
								</tr>
								<tr>
									<td><b>Patient Name</b></td>
									<td>${snap.p_name}</td>									
								</tr>
								<tr>
									<td><b>Patient's Age</b></td>
									<td>${snap.p_age}</td>
								</tr>
								<tr>
									<td><b>Appointment Date</b></td>
									<td>${snap.p_date}</td>				
								</tr>
								<tr>
									<td><b>Disease</b></td>
									<td>${snap.p_disease}</td>				
								</tr>
								<tr>								
									<td><b>Medications</b></td>
									<td>${snap.p_medications}</td>									
								</tr>
								<tr>
									<td><b>Weight (in KG)</b></td>
									<td>${snap.p_weight}</td>							
								</tr>
								<tr>
									<td><b>Growth</b></td>
									<td>${snap.p_growth}</td>			
								</tr>
								<tr>
									<td><b>Blood Group</b></td>
									<td>${snap.p_blood}</td>
								</tr>
								<tr>
									<td><b>Blood Pressure</b></td>
									<td>${snap.p_blood_pressure}</td>
								</tr>
									<td><b>Pulse Rate</b></td>
									<td>${snap.p_pulse_rate}</td>
								</tr>
								<tr>				
									<td><b>Sugar</b></td>
									<td>${snap.p_sugar}</td>		
								</tr>
									<td><b>Doctor Assigned</b></td>
									<td>${snap.p_doctor}</td>							
								</tr>
								</table>
								`;
								button_part.innerHTML = `					
														<button type='button' class='btn btn-success btn-block animated fadeIn' onclick='printRecord()'> <span class='glyphicon glyphicon-print'></span>&nbsp;&nbsp;&nbsp;&nbsp;Print Patient's Record</button>							
														`;
								refForPrinting = patient_id.value;
	}
	else{
		swal('Error','Record Not Found! Please enter a valid Patient ID.','error');
	}
});
}
else{
	swal('Error',"Please enter a valid Patient ID.","error")
}
}
function printRecord(){
	//storing the original layout of a webpage
	var restorePage = document.body.innerHTML;
	//fetching data from the database which is to be printed.
	dbRef.child(refForPrinting).on("value",function(snapshot){
		var snap = snapshot.val();
		//layout of a report for printing
		var html = `
			<h2 style="text-align:center;" class="app-heading">Patient Tracker</h2>
			<p class="printing-paragraph">Maintain Patients' Record on a single click</p>
			<table border="1" class = "table-printing table table-bordered" style="width:700px;">
				<tr>
					<td colspan="2" align="center"><h3 class="printing-heading">Patient History</h3></td>
				</tr>
				<tr>
					<th>Patient ID</th>
					<td>${snap.p_id}</td>
				</tr>
				<tr>
					<th>Patient Name</th>
					<td> ${snap.p_name}</td>
				</tr>
				<tr>
					<th>Patient's Age</th>
					<td> ${snap.p_age}</td>
				</tr>
				<tr>
					<th>Appointment Date</th>
					<td> ${snap.p_date}</td>
				</tr>
				<tr>
					<th>Disease</th>
					<td> ${snap.p_disease}</td>
				</tr>
				<tr>
					<th>Medications</th>
					<td> ${snap.p_medications}</td>
				</tr>
				<tr>
					<th>Weight (in KG)</th>
					<td> ${snap.p_disease}</td>
				</tr>
				<tr>
					<th>Growth</th>
					<td> ${snap.p_growth}</td>
				</tr>
				<tr>
					<th>Blood Group</th>
					<td> ${snap.p_blood}</td>
				</tr>
				<tr>
					<th>Blood Pressure</th>
					<td> ${snap.p_blood_pressure}</td>
				</tr>
				<tr>
					<th>Pulse Rate</th>
					<td> ${snap.p_pulse_rate}</td>
				</tr>
				<tr>
					<th>Sugar</th>
					<td> ${snap.p_sugar}</td>
				</tr>
				<tr>
					<th>Doctor Assigned</th>
					<td> ${snap.p_doctor}</td>
				</tr>
			</table>
			<p class='printing-paragraph'>This is a system generated report of a patient without any error</p>`
			;

				
				//temporarily rendering the report on the real page.
				document.body.innerHTML = html;
					window.print();
					//page will be restored to its original state after printing
					document.body.innerHTML = restorePage;
		});
}
function aboutUs(){
	swal("Patient Tracker v1.0","This App will help the doctors or staff members to perform all the necessary tasks related to patient. You can easily maintain patients' records. This App is developed by S.M.Rizwan.\n\n Contact: +92331-2278339\n E-mail:smrizwan54@gmail.com",{
			className:"sweet-alert-icon",
			icon: "icons/patient_icon.png"
		});
}