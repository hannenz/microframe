/* microframe main javascrtipt file
 *
 * loads all necessary plugins and does initializing
 *
 * 2013 Johannes Braun <j.braun@agentur-halma.de>
 */

$(document).ready(function(){

	console.log('microframe js v 0.1');

	$('body').addClass('js-ready');

	//$('.pulldown-menu').pulldownmenu();
	$('.menu').navlist();
	console.log('Initializing Off-Canvas-Menu');
	$('.ocmenu').ocmenu();
});