// �������� ������ Team, Work, Services � Features � ������� Handlebars
$(function () {
	// Grab the template script
	var MainMemberScript = $("#member-main-template").html();
	var WorksScript = $("#work-template").html();
	var ServicesScript = $("#sevices-template").html();
	var FeaturesScript = $("#features-template").html();
	
	// Compile the template
	var MainMemberTemplate = Handlebars.compile(MainMemberScript);
	var WorksTemplate = Handlebars.compile(WorksScript);
	var ServicesTemplate = Handlebars.compile(ServicesScript);
	var FeaturesTemplate = Handlebars.compile(FeaturesScript);
	
	// Define our data object
	// ���������� members.json ��� ����� TEAM
		$.getJSON("../json/members.json", function(data) {
			var MainMemberCompiledHtml = MainMemberTemplate(data);
			var MainMemberCompiledHtml = MainMemberCompiledHtml.replace(/[\u200B-\u200D\uFEFF]/g, ''); // ������� #8203
			$('.members_items').html(MainMemberCompiledHtml);
		});
		
		// ���������� work.json ��� ����� WORK
		$.getJSON("../json/works.json", function(data) {
			var WorksCompiledHtml = WorksTemplate(data);
			var WorksCompiledHtml = WorksCompiledHtml.replace(/[\u200B-\u200D\uFEFF]/g, ''); // ������� #8203
			$('.work_items').html(WorksCompiledHtml);
		});
		
		// ���������� services.json ��� ����� SERVICES
		$.getJSON("../json/services.json", function(data) {
			var ServicesCompiledHtml = ServicesTemplate(data);
			var ServicesCompiledHtml = ServicesCompiledHtml.replace(/[\u200B-\u200D\uFEFF]/g, ''); // ������� #8203
			$('.services_items').html(ServicesCompiledHtml);
		});
		
		// ���������� features.json ��� ����� FEATURES
		$.getJSON("../json/features.json", function(data) {
			var FeaturesCompiledHtml = FeaturesTemplate(data);
			var FeaturesCompiledHtml = FeaturesCompiledHtml.replace(/[\u200B-\u200D\uFEFF]/g, ''); // ������� #8203
			$('.features_items').html(FeaturesCompiledHtml);
		});
});

// ��������� �� �����
function load_member_bio(i) {
	var AboutMemberScript = $("#member-template").html();
	var AboutMemberTemplate = Handlebars.compile(AboutMemberScript);
	$.getJSON("../json/members.json", function(data) {
		var member_context = [];
		var member = {};
		member.firstname = data[i].firstname;
		member.surname = data[i].surname;
		member.birthday = data[i].birthday;
		member.about = data[i].about;
		var AboutMemberCompiledHtml = AboutMemberTemplate(member);
		var AboutMemberCompiledHtml = AboutMemberCompiledHtml.replace(/[\u200B-\u200D\uFEFF]/g, ''); // ������� #8203
		$('.about_members').html(AboutMemberCompiledHtml);	
	});
}

// ��������� ����� �� ������� ������ Video Tour
document.getElementsByClassName('video_tour_button')[0].onclick = function() {
	$('.video_tour_button').css("display","none");
	$('.content_1140').html($('.content_1140').html() + '<iframe style="float: right; margin-top: -80px" width="560" height="315" src="https://www.youtube.com/embed/nZZFqBi6aUg" frameborder="0" allowfullscreen></iframe>');
}