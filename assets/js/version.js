$(document).ready(function() {
	$('.listing_active').click(function(e){
		var BasePath=$(this).attr('data-path');
		var DataID	=$(this).attr('data-id');
		var txt=$(this);
		 jQuery.ajax({
				url: BasePath+"admin/parts/enable_disable",
				data:'listid='+DataID,
				type: "POST",
				dataType: "json",
				success:function(data){
					txt.empty();
					txt.append(data.status?'Active':'Inactive');
					},
				error:function (){
					console.log('error');
				}
			}); 
			
	});
	$('.change_status').click(function(e){
		var BasePath=$(this).attr('data-path');
		var DataID	=$(this).attr('data-id');
		var txt=$(this);
		//debugger;
		 jQuery.ajax({
				url: BasePath+"admin/users/changestatus",
				data:'userid='+DataID,
				type: "POST",
				dataType: "json",
				success:function(data){
					txt.empty();
					txt.append(data.status?'Active':'Inactive');
					},
				error:function (){
					console.log('error');
				}
			}); 
			
	}); 
	$('.approve_provider').click(function(e){
		var BasePath=$(this).attr('data-path');
		var DataID	=$(this).attr('data-id');
		var txt=$(this);
		//debugger;
		 jQuery.ajax({
				url: BasePath+"admin/users/accountapproval",
				data:'userid='+DataID,
				type: "POST",
				dataType: "json",
				success:function(data){
					console.log(data);
					//txt.empty();
					//txt.append(data.status?'Active':'Active');
					},
				error:function (){
					console.log('error');
				}
			}); 
			
	}); 
     jQuery("#make_list").change(function() {
		var links=jQuery(this).attr('data-link');
		  var MakeID=jQuery('#make_list :selected').val();
			var CsrfHash =$('input[name=csrf_test_name]').val();
			
       jQuery.ajax({
			type: "POST",
			url: links,
			data: {'csrf_test_name':CsrfHash,'makeid':MakeID},
			success: function(dataString) {
				//console.log(dataString);
				jQuery('#model_list').html('');
				jQuery('#model_list').append(dataString);
			}
		
		});
		
    });

	jQuery("#make_logo").change(function() {
		readURL(this,'makelogo');
	});
	
	function readURL(input,ViewerID) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				jQuery('#'+ViewerID).attr('src', e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
		}
	}
	
	//FUNCTION FOR CHECK USER NAME AVAILABLITY
	
	$('input[name="username"]').on('change',function(){
		var basepath=$(this).attr('data-path');
		var uname=$("#username").val();
		if(uname.length < 3){
			$("#user_availability").text('User Name too Short !');
		}else{
			jQuery.ajax({
				url: basepath+"frontend/users/check_availability",
				data:'username='+uname,
				type: "POST",
				dataType: "json",
				success:function(data){
					if(data.msg){
						$("#user_availability").text('Not Available');
					}else{
						$("#user_availability").text('');
					}
				},
				error:function (){}
			});
		}
	});
	
});