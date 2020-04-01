//this is the .kulaSlider method that I am adding to jQuery
(function($){
					$.fn.kulaSlider = function(options) {
						
						//here I am setting the default values for 
						var defaults = {
							slideClass: "slide",
							prevControlID: "",
							nextControlID: "",
							tabsContainerID: "",
							tabImage: new Array(),
							tabImageCurrent: new Array(),
							tabImageHover: new Array(),
							tabImageActive: new Array(),
							slideTimer: 5000,
							slideEffect: "snap",
							autoSlide: true,
							tabChangeOn: "click",
							tabClickLink: new Array()
							
						};
						var options = $.extend(defaults, options);
						
						return this.each(function(){
							slideShow = $(this);
							currentSlide = 0;
							showLength = slideShow.children('.'+options.slideClass).length;
							
							
							//show first slide hide all others
							slideShow.children('.'+options.slideClass).css('display','none');
							$(slideShow.children('.'+options.slideClass)[currentSlide]).css('display', 'block');
					
							
							if(!options.tabImageCurrent || options.tabImageCurrent == ""){
								options.tabImageCurrent = options.tabImage;
							}
							if(!options.tabImageHover || options.tabImageHover == ""){
								options.tabImageHover = options.tabImageCurrent;
							}
							if(!options.tabImageActive || options.tabImageActive == ""){
								options.tabImageActive = options.tabImageHover;
							}
							
							
							//set up nav tabs if tabsContainerID is declared
							if(options.tabsContainerID && options.tabsContainerID != ""){
								
								for(var i=0; i<showLength; i++){
									var tabImage;
									if(i>=options.tabImage.length){
										tabImage = options.tabImage[(i-Math.round(i/options.tabImage.length))];
										tabImageCurrent = options.tabImageCurrent[(i-Math.round(i/options.tabImageCurrent.length))];
									}else{
										tabImage = options.tabImage[i];
										tabImageCurrent = options.tabImageCurrent[i];
									}
									
									if(i==currentSlide){
										$('#'+options.tabsContainerID).append('<li id="'+options.tabsContainerID+'-li-'+i+'" class="kulaSliderTab"><img src="'+tabImageCurrent+'"></li>');
									}else{
										$('#'+options.tabsContainerID).append('<li id="'+options.tabsContainerID+'-li-'+i+'" class="kulaSliderTab"><img src="'+tabImage+'"></li>');
									}
								}
							}
							
							function gotoSlide(gotoID){
								if(!$($(slideShow).children()).is(':animated')){
									previousSlide = currentSlide;
									currentSlide = gotoID;
									if(options.slideEffect == "slideTop"){
										$(slideShow.children('.'+options.slideClass)[previousSlide]).animate({width:'toggle'});
										$(slideShow.children('.'+options.slideClass)[currentSlide]).animate({width:'toggle'});
										
									}else if(options.slideEffect == "slideSide"){
										$(slideShow.children('.'+options.slideClass)[previousSlide]).slideToggle();
										$(slideShow.children('.'+options.slideClass)[currentSlide]).slideToggle();
										
									}else if(options.slideEffect == "fade"){
										$(slideShow.children('.'+options.slideClass)[previousSlide]).fadeTo('slow',0,function(){
																																																				 $(slideShow.children('.'+options.slideClass)[previousSlide]).css('display','none');
																																																				 $(slideShow.children('.'+options.slideClass)[currentSlide]).css('display','block');
																																																				 $(slideShow.children('.'+options.slideClass)[currentSlide]).css('opacity',0);
																																																				 $(slideShow.children('.'+options.slideClass)[currentSlide]).fadeTo('slow',1);
																																																				 });
									}else{
										$(slideShow.children('.'+options.slideClass)[previousSlide]).css('display', 'none');
										$(slideShow.children('.'+options.slideClass)[currentSlide]).css('display', 'block');
									}
																																																			 
									$($('#'+options.tabsContainerID).children()[currentSlide]).children().attr('src', options.tabImageCurrent[(currentSlide-Math.round(currentSlide/options.tabImageCurrent.length))]);
									$($('#'+options.tabsContainerID).children()[previousSlide]).children().attr('src', options.tabImage[(previousSlide-Math.round(previousSlide/options.tabImageCurrent.length))]);
								}
							}
							
							$('.kulaSliderTab').click(function() {
								myID = $(this).index();
								//alert(myID);
								if(options.tabChangeOn == 'click'){
									if(myID != currentSlide)
									gotoSlide(myID);
								}else if(options.tabClickLink[myID] && options.tabClickLink[myID] != "" && options.tabChangeOn == 'hover'){
									window.location = options.tabClickLink[myID];
								}
							});
							
							$('.kulaSliderTab').hover(function() {
								myID = $(this).index();
								
								if(options.tabChangeOn == 'hover'){
									if(myID != currentSlide)
									gotoSlide(myID);
								}else{
									if(myID != currentSlide)
									$($('#'+options.tabsContainerID).children()[myID]).children().attr('src', options.tabImageHover[(myID-Math.round(myID/options.tabImageCurrent.length))]);
								}
																				 
							},function() {
								myID = $(this).index();
								
								if(options.tabChangeOn == 'hover'){
								}else{
									if(myID != currentSlide)
									$($('#'+options.tabsContainerID).children()[myID]).children().attr('src', options.tabImage[(myID-Math.round(myID/options.tabImageCurrent.length))]);
								}
							});
														
							$('.kulaSliderTab').mousedown(function() {
								myID = $(this).index();
								
								if(myID != currentSlide)
								$($('#'+options.tabsContainerID).children()[myID]).children().attr('src', options.tabImageActive[(myID-Math.round(myID/options.tabImageCurrent.length))]);
																				 
							});
							
							if(options.prevControlID && options.prevControlID != "" && options.nextControlID && options.nextControlID != ""){
								$('#'+options.prevControlID).click(function(){
									if(currentSlide == 0){
										gotoSlide(showLength - 1);
									}else{
										gotoSlide(currentSlide - 1);
									}
								});
								
								$('#'+options.nextControlID).click(function(){
									if(currentSlide == (showLength - 1)){
										gotoSlide(0);
									}else{
										gotoSlide(currentSlide + 1);
									}
								});
							}
							
							if(options.autoSlide == true){
								window.setInterval(function(){
																						if(!$($(slideShow).children()).is(':animated')){
																							if(currentSlide == (showLength - 1)){
																								gotoSlide(0);
																							}else{
																								gotoSlide(currentSlide + 1);
																							}
																						}
																						
																						}, options.slideTimer);
							}
							
							
							//resizes the slideshow for ie
							/*if($.browser.msie){
								$(document).ready(function(){
																					 slideShow.width(slideShow.parent().width() - 4);
																					 $(window).resize(function() {
																					  slideShow.width(slideShow.parent().width() - 4);
																						slideShow.children('.'+options.slideClass).css('display','none');
																						$(slideShow.children('.'+options.slideClass)[currentSlide]).css('display', 'block');
																					 });
																					 });
							}*/
						});
					};
					})(jQuery);
