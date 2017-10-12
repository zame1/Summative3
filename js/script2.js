$(function() {

    let key = 'pch85w4ZYY8vTvMKbIuUg9BD1ZJgrkTs'
    let user1ID = 'andrejosselin';
    let user2ID = 'ilonaveresk';
    let user3ID = 'tinapicardphoto';
    let user4ID = 'Carlaveggio';

    let urlUser1 = 'https://api.behance.net/v2/users/' + user1ID + '?client_id=' + key;
    let urlUser2 = 'https://api.behance.net/v2/users/' + user2ID + '?client_id=' + key;
    let urlUser3 = 'https://api.behance.net/v2/users/' + user3ID + '?client_id=' + key;
    let urlUser4 = 'https://api.behance.net/v2/users/' + user4ID + '?client_id=' + key;
    console.log(urlUser1)

    let promise1 = $.ajax({
        url: urlUser1,
        dataType: 'jsonp'
    });

    let promise2 = $.ajax({
        url: urlUser2,
        dataType: 'jsonp'
    });

    let promise3 = $.ajax({
        url: urlUser3,
        dataType: 'jsonp'
    });

    let promise4 = $.ajax({
        url: urlUser4,
        dataType: 'jsonp'
    });

    $.when(promise1, promise2, promise3, promise4).done(function(r1, r2, r3, r4) {

        let data = {
            'user1': r1[0].user.stats,
            'user2': r2[0].user.stats,
            'user3': r3[0].user.stats,
            'user4': r4[0].user.stats
        };
        console.log(data.user1);

        // STATS OF THE DESIGNERS

        let viewstats = [{
                designer: 'Andrejosselin',
                value: +r1[0].user.stats.views
            }, {
                designer: 'ilonaveresk',
                value: +r2[0].user.stats.views
            }, {
                designer: 'tinapicardphoto',
                value: +r3[0].user.stats.views
            }, {
                designer: 'Carlaveggio',
                value: +r4[0].user.stats.views
            }];
            console.log(viewstats);

        let followerstats = [{
            designer: 'Andrejosselin',
            value: +r1[0].user.stats.followers
        }, {
            designer: 'ilonaveresk',
            value: +r2[0].user.stats.followers
        }, {
            designer: 'tinapicardphoto',
            value: +r3[0].user.stats.followers
        }, {
            designer: 'Carlaveggio',
            value: +r4[0].user.stats.followers
        }];

        let appreciationstats = [{
            designer: 'Andrejosselin',
            value: +r1[0].user.stats.appreciations
        }, {
            designer: 'ilonaveresk',
            value: +r2[0].user.stats.appreciations
        }, {
            designer: 'tinapicardphoto',
            value: +r3[0].user.stats.appreciations
        }, {
            designer: 'Carlaveggio',
            value: +r4[0].user.stats.appreciations
        }];
        let commentstats = [
            {designer: 'Andrejosselin',value: +r1[0].user.stats.comments}, 
            {designer: 'ilonaveresk',value: +r2[0].user.stats.comments}, 
            {designer: 'tinapicardphoto',value: +r3[0].user.stats.comments}, 
            {designer: 'Carlaveggio',value: +r4[0].user.stats.comments}
        ];
        // console.log(viewstats[0].stats[0].value)  
        console.log(r1[0].user.sections) 
        $('<p>'+r1[0].user.sections["ANDRÈ JOSSELIN"]+'</p>').appendTo('.about-txt')        

        function makeCustomBarGraph(container,data,title){

          var width = 220;
          var height = 250;
          var margin = 30;
          //GRAPH ONE

          var maxValue = d3.max(data, function(d) { return d.value; });
          var yScale = d3.scaleLinear()   
          .domain([0,maxValue])
          .range([0,height])

          var colGen = d3.scaleOrdinal()
          .range(['#CF4232','#EB7F23','#FAC023','#068675']);
          // var colGen = d3.scaleLinear().domain([0, 3]).range([d3.rgb('#f7f299'), d3.rgb('#E53E5E')]);
          // console.log(colGen)
          var chart = d3.select(container)
              .append('g')
              .attr('transform', 'translate('+margin+','+margin+')');
          chart.append('text').text(title)
              .style('alignment-baseline', 'hanging')
              .style('transform', 'translateY(10px)')
              .style('text-anchor', 'middle')
              .style('text-transform', 'Uppercase')
              .style('font-family', 'Lato')
              .style('font-weight', '100')
              .style('font-size', '15')
              .style('fill', 'white')
              .attr('y', height)
              .attr('x', 70);

          var bars = chart.selectAll('rect').data(data);

          bars.enter()
              .append('rect')
              .attr('class', 'bar')
              .attr('fill', function(d, i) {
                  return colGen(i)
              })
              .attr('width', 25)
              .attr('x', function(d, i) {
                  return i * 30
              })
              .attr('height',0)
              .attr('y',250)
              .transition()
              .duration(7500)
              .attr('height', function(d){return yScale(d.value)})
              .attr('y', function(d){return height - yScale(d.value)});
        

          //tool tips 

          var tooltip = chart.append('g')
              .style('opacity', 0)
              .attr('class', 'tooltip');

          tooltip.append('rect')
              .attr('width', 160)
              .attr('height', 50)
              .attr('fill', '#F0433A');

          var tooltipText = tooltip.append('text')
              .text('bla')
              .attr('x', 80)
              .attr('y', 25)
              .attr('fill', 'white')
              .style('alignment-baseline', 'middle')
              .style('text-anchor', 'middle');

          bars = chart.selectAll('.bar');

          bars.on('mouseover', function(d) {

              tooltip.style('opacity', 1)
              tooltipText.text(d.designer + ' : ' + d.value);
          });

          bars.on('mouseout', function(d) {

              tooltip.style('opacity', 0);
          });

          bars.on('mousemove', function(d) {
              //move the tooltip around
              var mousePos = d3.mouse(this.parentNode);
              var xPos = mousePos[0] + 20;
              var yPos = mousePos[1] + 20;
              
              tooltip.attr('transform', 'translate(' + xPos + ',' + yPos + ')');

          });
        }

        makeCustomBarGraph('#bardata',viewstats,'behance Project Views');
        makeCustomBarGraph('#followdata',followerstats,'Behance followers');
        makeCustomBarGraph('#appreciatedata',appreciationstats,'Behance Appreciations');
        makeCustomBarGraph('#commentdata',commentstats,'Behance Comment');

    });
    
});