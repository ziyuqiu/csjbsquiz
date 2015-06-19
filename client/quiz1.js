Template.quiz1.helpers({
	ips: function(){return IPAddresses.find({},{sort:{project:1,firstName:1,lastName:1}});}
})


Template.iprow.events({
	"click .jbsapp-delete-icon": function(){IPAddresses.remove(this._id);}
})

Template.quiz1.events({
		"submit #createipform": function(event){
		event.preventDefault();

		var project = event.target.project.value;
		var firstName = event.target.firstName.value;
		var lastName = event.target.lastName.value;
		var website = event.target.website.value;
		var github = event.target.github.value;
		console.log(JSON.stringify(this));


		IPAddresses.insert({project:project,firstName:firstName,lastName:lastName,website:website,github:github});

		
	}
})