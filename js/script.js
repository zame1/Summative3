// This ENTIRE PAGE IS MY OWN JS CODE
$(function() {

  let key = 'pch85w4ZYY8vTvMKbIuUg9BD1ZJgrkTs'
  let userID = 'andrejosselin';
  
  let projectHTML = $('#project-template').text();
  let projectTemplate = Template7(projectHTML).compile();

  let urlProjects = 'https://api.behance.net/v2/users/andrejosselin/projects?client_id='+key;	
  // let urlProjects = 'http://www.behance.net/v2/users/andrejosselin/projects?api_key='+key+'&per_page=50&page=1';
  // http://www.behance.net/v2/users/andrejosselin/projects?api_key=+key&per_page=25&page=2



  $.ajax({

  		url:urlProjects,
  		dataType: 'jsonp',
  		success: function(res){

  			let projects = res.projects;

        let projectDetailsHTML = $('#project-details-template').text();
        let projectDetailsTemplate = Template7(projectDetailsHTML).compile();

  $('#portfolioModal').on('show.bs.modal',function(e){

    let target = e.relatedTarget;
    let projectid = $(target).data('projectid');

    let urlProject = 'http://www.behance.net/v2/projects/'+projectid+'?api_key='+key;
console.log(urlProject)
    $.ajax({
      url: urlProject,
      dataType: 'jsonp',
      success: function(res){
        let project = res.project;
        
        let output = projectDetailsTemplate(project);
        $('.project-details').empty();
        $('.project-details').append(output);
      }
    });
  }); 


  			let stats = {
  				"digitalPhotography": 0,
  				"photography" : 0,
  				"artDirection" : 0,
  				"fashion" : 0,
  				"branding" : 0,
  			}

  			for(var i=0;i<projects.length;i++){
  				let project = projects[i];
  				let output = projectTemplate(project);
  				$('.project-container').append(output);

  				let fields = project.fields;

  				if(_(fields).indexOf('Digital Photography') > -1){
  					stats.digitalPhotography++;
  				}
  				if(_(fields).indexOf('Photography') > -1){
  					stats.photography++;
  				}
  				if(_(fields).indexOf('Art Direction') > -1){
  					stats.artDirection++;
  				}
  				if(_(fields).indexOf('Branding') > -1){
  					stats.branding++;
  				}
  			}

  			// console.log(projects);

  			// let fieldstat1 = stats.digitalPhotography;
  			// let fieldstat2 = stats.photography;
  			// let fieldstat3 = stats.artDirection;

  			var fieldstats = [
  						{name:'Art Direction', value:+stats.artDirection},
  						{name:'Digital Photography', value:+stats.photography},
  						{name:'Branding', value:+stats.branding},
  						{name:'Photography', value:+stats.digitalPhotography}
  						];
  			
  			// console.log(fieldstat1)


var width = 700;
var height = 700;
var marginTop = 50;
var marginLeft = 50;				

var radius = Math.min(width,height)/2;

var colGen = d3.scaleOrdinal()
				.range(['#F0433A','#C9283E','#820333','#540032']);

var pieDataGen = d3.pie()
					.sort(null)
					.value(function(d){return d.value });

var pieData = pieDataGen(fieldstats); 

var arcGen = d3.arc()
				.outerRadius(radius)
				.innerRadius(radius/1.5)
				.cornerRadius(0);

var arcLabelGen = d3.arc()
				.outerRadius(radius)
				.innerRadius(radius/1.7)
				

var chart = d3.select('#fieldstats')
			.append('g')
			.attr('transform','translate('+marginLeft+','+marginTop+')');

var pie = chart.append('g')
			.attr('transform','translate('+radius+','+radius+')'); 

pie.selectAll('.arc')
	.data(pieData)
	.enter()
	.append('path')
	.attr('id', function(d,i){ return 'arc' +i })
	.attr('class','arc')
	.attr('d',arcGen)
	.attr('fill',function(d){ return colGen (d.data.value)}) 

pie.selectAll('.size')
	.data(pieData)
	.enter()
	.append('text')
	.style('alignment-baseline','middle')
	.style('font-family','Verdana')
	.style('font-size','20')
	.style('fill','white')
	.attr('transform',function(d){return'translate('+arcLabelGen.centroid(d)+')'})
	.text(function(d){return d.data.value})

		


  		}   

  	}) 		

});