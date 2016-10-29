"use strict";

var d, popArrayLPC, resultsHTML;


//TODO pass arguments to processX() functions instead of using global variables
//TODO load XMLHttpRequests within a function so reduce global variables

function checkLoadState() {
	var loadPercentage = (popLoaded + baselineLoaded)/2*100;
	var status = document.getElementById("status")
	status.innerHTML = "<td>Loaded "+loadPercentage+"%...</td>";
	
	if(loadPercentage == 100) {
		loadLocationDropdown();
		//loadTourneyDropdown();
		//updateLink();

		var toxicParameter = getURLParameter("toxic");
		if (toxicParameter != "null") {
			var select = document.getElementById("toxic");
			for (var i=0; i<select.children.length; i++) {
				var child = select.children[i];
				if (child.innerHTML == toxicParameter) {
					child.selected = true;
			    	toxicChanged();
					break;
				}
			}
		}

		var batteryParameter = getURLParameter("battery");
		if (batteryParameter != "null") {
			var select = document.getElementById("battery");
			for (var i=0; i<select.children.length; i++) {
				var child = select.children[i];
				if (child.innerHTML == batteryParameter) {
					child.selected = true;
			    	batteryChanged();
					break;
				}
			}
		}
		
		status.innerHTML = "<td>All set!</td>";
		setTimeout(function() {status.innerHTML = '<td><br></td>'}, 3000);
	}
}

var popCSV = [];
var popArray = [];

/**
 * This one is different in CRE/best setup.
 */
function processPop () {
	var popText = pop.responseText;

	popCSV = CSVToArray(popText);
	//console.log(popCSV);

	var popCSVLength = Object.size(popCSV);
	//console.log("popCSVLength", popCSVLength);

	//Creating popArray
	for(var i=1; i<popCSVLength; i++) {
		if (popArray[popCSV[i][0]] == undefined) popArray[popCSV[i][0]] = [];
		if (popArray[popCSV[i][0]][popCSV[i][1]] == undefined) popArray[popCSV[i][0]][popCSV[i][1]] = [];
		if (popArray[popCSV[i][0]][popCSV[i][1]][popCSV[i][2]] == undefined) popArray[popCSV[i][0]][popCSV[i][1]][popCSV[i][2]] = [];
		if (popArray[popCSV[i][0]][popCSV[i][1]][popCSV[i][2]][popCSV[i][3]] == undefined) popArray[popCSV[i][0]][popCSV[i][1]][popCSV[i][2]][popCSV[i][3]] = [];
		popArray[popCSV[i][0]][popCSV[i][1]][popCSV[i][2]][popCSV[i][3]][popCSV[i][5]] = parseFloat(popCSV[i][4]);
	}

	//console.log(popArray);

	popLoaded = 1;
	checkLoadState();
}


function getDataFromURL(parameters) {
    if (parameters) {
        parameters = decodeURI(parameters[1]);

        return parameters
            .split('/')
            .join('\n');
    } else {
        return [];
    }
}

function showTrapSetup(type) {
	var trapSetup = document.getElementById("trapSetup");

	if (type == 0) trapSetup.innerHTML = "<tr><td></td></tr>";
	else {
		trapSetup.innerHTML = "<tr><td>Type</td><td>" + trapType + "<tr><td>Power</td><td>" + commafy(trapPower) + "</td></tr><tr><td>Luck</td><td>" + trapLuck + "</td></tr><tr><td>Attraction Bonus</td><td>" + trapAtt + "%</td></tr><tr><td>Cheese Effect</td><td>" + reverseParseFreshness[trapEff] + "</td></tr>";
	}
}

function loadWeaponSelection() {
	var len = Object.size(weaponsArray);
	for (var i=0; i<len; i++) $("#weapons_selector_table").append("<tr><td style='padding:0'><input type='checkbox' class='weapon_checkbox' checked>&nbsp" + Object.keys(weaponsArray)[i] + "</td></tr>");
	$(".weapon_checkbox").change(function() { $("#all_weapons_checkbox").prop('checked', false);});
}

function loadBaseSelection() {
	var len = Object.size(basesArray);
	for (var i=0; i<len; i++) $("#bases_selector_table").append("<tr><td style='padding:0'><input type='checkbox' class='base_checkbox' checked>&nbsp" + Object.keys(basesArray)[i] + "</td></tr>");
	$(".base_checkbox").change(function() { $("#all_bases_checkbox").prop('checked', false);});
}

function loadCharmSelection() {
	var len = Object.size(charmsArray);
	for (var i=0; i<len; i++) $("#charms_selector_table").append("<tr><td style='padding:0'><input type='checkbox' class='charm_checkbox' checked>&nbsp" + Object.keys(charmsArray)[i] + "</td></tr>");
	$(".charm_checkbox").change(function() { $("#all_charms_checkbox").prop('checked', false);});
}

var pop = new XMLHttpRequest();
var baseline = new XMLHttpRequest();

window.onload = function () {

	// if (location.href.indexOf("https") < 0) {
	// 	var currLoc = location.href;
	// 	currLoc = currLoc.replace("http", "https");
	// 	location.href = currLoc;
	// }

	//Instructions
	$("#instructions").click(function() {
		var instructionString = "Drag the blue 'Best Setup' link to your bookmarks bar if possible. If that doesn't work, try the manual steps below.\n\n";
		instructionString += "Google Chrome:\n- Bookmark a random page and name it 'Best Setup Bookmarklet'"
		instructionString += "\n- Copy the bookmarklet code by right-clicking the 'Best Setup' link and selecting 'Copy link address...'"
		instructionString += "\n- Right click the newly created bookmark and select 'Edit...'"
		instructionString += "\n- Paste into the 'URL' field\n\n";
		instructionString += "Firefox:\n- Right click the 'Best Setup' link and select 'Bookmark This Link'\n\n";
		instructionString += "Internet Explorer:\n- Right click the 'Best Setup' link and select 'Add to favorites...'\n\n";
		instructionString += "Mobile/Other Browsers:\n- Same concept as above. Processes may vary";
		alert(instructionString);
	});

	//Bookmarklet storage logic
	if (setupBookmarkletString != localStorage.getItem('setupBookmarklet')) {
		alert("Bookmarklet has changed! Please update accordingly.");
		localStorage.setItem('setupBookmarklet', setupBookmarkletString);
	}
    $("#bookmarklet").attr("href", setupBookmarkletString);
    $("#slowBookmarklet").attr("href", setupBookmarkletString.replace(/=500/g, "=2500"));
    $("#evenslowerBookmarklet").attr("href", setupBookmarkletString.replace(/=500/g, "=6000"));
    // Hacky, use more precise "SUBMIT_DELAY" replacement

	//Initialize tablesorter, bind to table
    $.tablesorter.defaults.sortInitialOrder = 'desc';
    $("#results").tablesorter({
		// sortForce: [[noMice,1]],
		sortReset: true,
		widthFixed: true,
		ignoreCase: false,
		widgets: ["filter", "pager"],
		widgetOptions: {
			filter_childRows : false,
			filter_childByColumn : false,
			filter_childWithSibs : true,
			filter_columnFilters : true,
			filter_columnAnyMatch: true,
			filter_cellFilter : '',
			filter_cssFilter : '', // or []
			filter_defaultFilter : {},
			filter_excludeFilter : {},
			filter_external : '',
			filter_filteredRow : 'filtered',
			filter_formatter : null,
			filter_functions : null,
			filter_hideEmpty : true,
			filter_hideFilters : true,
			filter_ignoreCase : true,
			filter_liveSearch : true,
			filter_matchType : { 'input': 'exact', 'select': 'exact' },
			filter_onlyAvail : 'filter-onlyAvail',
			filter_placeholder : { search : 'Filter results...', select : '' },
			filter_reset : 'button.reset',
			filter_resetOnEsc : true,
			filter_saveFilters : false,
			filter_searchDelay : 420,
			filter_searchFiltered: true,
			filter_selectSource  : null,
			filter_serversideFiltering : false,
			filter_startsWith : false,
			filter_useParsedData : false,
			filter_defaultAttrib : 'data-value',
			filter_selectSourceSeparator : '|',
	        pager_output: '{startRow:input} to {endRow} of {totalRows} rows', // '{page}/{totalPages}'
	        pager_updateArrows: true,
	        pager_startPage: 0,
	        pager_size: 10,
	        pager_savePages: false,
	        pager_fixedHeight: false,
	        pager_removeRows: false, // removing rows in larger tables speeds up the sort
	        pager_ajaxUrl: null,
	        pager_customAjaxUrl: function(table, url) { return url; },
	        pager_ajaxError: null,
	        pager_ajaxObject: {
	          dataType: 'json'
	        },
	        pager_ajaxProcessing: function(ajax){ return [ 0, [], null ]; },

	        // css class names that are added
	        pager_css: {
	          container   : 'tablesorter-pager',    // class added to make included pager.css file work
	          errorRow    : 'tablesorter-errorRow', // error information row (don't include period at beginning); styled in theme file
	          disabled    : 'disabled'              // class added to arrows @ extremes (i.e. prev/first arrows "disabled" on first page)
	        },

	        // jQuery selectors
	        pager_selectors: {
	          container   : '.pager',       // target the pager markup (wrapper)
	          first       : '.first',       // go to first page arrow
	          prev        : '.prev',        // previous page arrow
	          next        : '.next',        // next page arrow
	          last        : '.last',        // go to last page arrow
	          gotoPage    : '.gotoPage',    // go to page selector - select dropdown that sets the current page
	          pageDisplay : '.pagedisplay', // location of where the "output" is displayed
	          pageSize    : '.pagesize'     // page size selector - select dropdown that sets the "size" option
	        }
		}
	}).bind('pagerChange pagerComplete pagerInitialized pageMoved', function(e, c){
      var p = c.pager, // NEW with the widget... it returns config, instead of config.pager
        msg = '"</span> event triggered, ' + (e.type === 'pagerChange' ? 'going to' : 'now on') +
        ' page <span class="typ">' + (p.page + 1) + '/' + p.totalPages + '</span>';
      $('#display')
        .append('<li><span class="str">"' + e.type + msg + '</li>')
        .find('li:first').remove();
    });

	loadWeaponSelection();
	loadBaseSelection();
	loadCharmSelection();

	//Load in data from URL
	var rawBases = getDataFromURL(window.location.search.match(/bases=([^&]*)/));
	var rawWeapons = getDataFromURL(window.location.search.match(/weapons=([^&]*)/));
	var rawCharms = getDataFromURL(window.location.search.match(/charms=([^&]*)/));
	if (rawBases.length == 0 && rawWeapons.length == 0 && rawCharms.length == 0) {
		checkCookies();
		pop.open("get", "https://tsitu.github.io/MH-Tools/data/populations.csv", true);
		pop.onreadystatechange = function() {
			if (pop.readyState == 4) {
				//console.log(pop.responseText);
				processPop();
			}
		}
		pop.send();
		baseline.open("get", "https://tsitu.github.io/MH-Tools/data/baselines.txt", true);
		baseline.onreadystatechange = function() {
			if (baseline.readyState == 4) {
				//console.log(baseline.responseText);
				processBaseline(baseline.responseText);
			}
		}
		baseline.send();

		$("#main").show(500);
	}
	else if (rawBases.length > 0) {
		processRawData(rawBases, "bases");
	}
	else if (rawWeapons.length > 0) {
		processRawData(rawWeapons, "weapons");
	}
	else if (rawCharms.length > 0) {
		processRawData(rawCharms, "charms");
	}

	gsParamCheck();
	
	var bonusLuckParameter = parseInt(getURLParameter("bonusLuck"));
	if (bonusLuckParameter >= 0) {
		document.getElementById("bonusLuck").value = bonusLuckParameter;
		bonusLuckChanged();
	}
  	
    document.getElementById("location").onchange = function () {
		locationChanged();
    };
	
    document.getElementById("phase").onchange = function () {
		phaseChanged();
    };

    document.getElementById("cheese").onchange = function () {
		cheeseChanged();
    };

    document.getElementById("charm").onchange = function () {
		charmChanged();
    };

    document.getElementById("toxic").onchange = function () {
		toxicChanged();
    };

    document.getElementById("battery").onchange = function () {
		batteryChanged();
    };

    document.getElementById("gs").onchange = function () {
		gsChanged();
	}
	
    document.getElementById("bonusLuck").onchange = function () {
		bonusLuckChanged();
	}

    $("#save_setup_button").click(function() {
    	saveSetupCookie();
    });

    $("#show_pop_button").click(function() {
    	$("#pleaseWaitMessage").show();
		setTimeout(function() {
    		showPop();
    	}, 1);
    });

    $("#show_weapons_button").click(function() {
    	$("#weapons_selector_table").toggle();
    	$("#bases_selector_table").hide();
    	$("#charms_selector_table").hide();
    })

    $("#show_bases_button").click(function() {
    	$("#bases_selector_table").toggle();
    	$("#weapons_selector_table").hide();
    	$("#charms_selector_table").hide();
    })

    $("#show_charms_button").click(function() {
    	$("#charms_selector_table").toggle();
    	$("#weapons_selector_table").hide();
    	$("#bases_selector_table").hide();
    })

    $("#results").bind("sortStart",function() { 
        $("#pleaseWaitMessage").show(); 
    }).bind("sortEnd",function() { 
        $("#pleaseWaitMessage").hide(); 
    }); 

    $("#all_weapons_checkbox").change(function() {
    	if (this.checked) $(".weapon_checkbox").each(function() { this.checked = true; });
    	else $(".weapon_checkbox").each(function() { this.checked = false; });
    })
    $("#all_bases_checkbox").change(function() {
    	if (this.checked) $(".base_checkbox").each(function() { this.checked = true; });
    	else $(".base_checkbox").each(function() { this.checked = false; });
    })
    $("#all_charms_checkbox").change(function() {
    	if (this.checked) $(".charm_checkbox").each(function() { this.checked = true; });
    	else $(".charm_checkbox").each(function() { this.checked = false; });
    })
}

function saveSetupCookie() {
	var checkedWeapons = [];
	var checkedBases = [];
	var checkedCharms = [];
	for (var i=0; i < Object.size(weaponsArray); i++) {
		if ($(".weapon_checkbox").get(i).checked) {
			checkedWeapons.push(1);
		} else checkedWeapons.push(0);
	}
	for (var i=0; i < Object.size(basesArray); i++) {
		if ($(".base_checkbox").get(i).checked) {
			checkedBases.push(1);
		} else checkedBases.push(0);
	}
	for (var i=0; i < Object.size(charmsArray); i++) {
		if ($(".charm_checkbox").get(i).checked) {
			checkedCharms.push(1);
		} else checkedCharms.push(0);
	}

	//cvalue is an object of 3 arrays, where each is of int strings (either 1 for checked or 0 for not)
	var cvalue = {};
	cvalue['weapons'] = checkedWeapons;
	cvalue['bases'] = checkedBases;
	cvalue['charms'] = checkedCharms;

	Cookies.set('setup', cvalue, {
		expires: 365,
		path: '/'
	}); //expires in a year
}

function processRawData(rawDataArray, type) {
	var dataObject = {};
	var storedData = localStorage.getItem("setupData");
	if (storedData != null) {
        dataObject = JSON.parse(storedData);
    }

	if (type == "bases" || type == "weapons" || type == "charms") {
		if (dataObject[type] == undefined) {
			dataObject[type] = [];
		}
		var dataLen = rawDataArray.split("\n").length-1;
	    var dataSplit = rawDataArray.split("\n");
	    for (var i=0; i<dataLen; i++) {
	    	if (dataObject[type].indexOf(dataSplit[i]) < 0) {
	    		dataObject[type].push(dataSplit[i]);
	    	}
	    }
	}

	if (Object.size(dataObject) > 0) {
        localStorage.setItem("setupData", JSON.stringify(dataObject));
        window.location.replace("https://tsitu.github.io/MH-Tools/setupwaiting.html");
        // window.location.replace("https://localhost:8888/setupwaiting.html"); //debug
	}
}

//Object size helper function
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function checkCookies() {
	var storedData = {};
	var bases = [];
	var weapons = [];
	var charms = [];
	if (localStorage.getItem("setupData") != null) {
		storedData = JSON.parse(localStorage.getItem("setupData"));
		if (storedData["bases"] != undefined) {
			bases = storedData["bases"];
		}
		if (storedData["weapons"] != undefined) {
			weapons = storedData["weapons"];
		}
		if (storedData["charms"] != undefined) {
			charms = storedData["charms"];
		}
		console.log("Bases loaded: " + bases.length);
		console.log("Weapons loaded: " + weapons.length);
		console.log("Charms loaded: " + charms.length);
	}
	if (Object.size(storedData) > 0) {
		for (var i=0; i<Object.size(basesArray); i++) {
			$(".base_checkbox").get(i).checked = false;
		}
		for (var i=0; i<Object.size(weaponsArray); i++) {
			$(".weapon_checkbox").get(i).checked = false;
		}
		for (var i=0; i<Object.size(charmsArray); i++) {
			$(".charm_checkbox").get(i).checked = false;
		}
		if (bases != undefined) {
			var indexedBases = [];
			for (var base in basesArray) {
				indexedBases.push(base);
			}
			for (var i=0; i<indexedBases.length; i++) {
				if (bases.indexOf(indexedBases[i]) >= 0) {
					$(".base_checkbox").get(i).checked = true;
				}
			}
		}
		if (weapons != undefined) {
			var indexedWeapons = [];
			for (var weapon in weaponsArray) {
				indexedWeapons.push(weapon);
			}
			for (var i=0; i<indexedWeapons.length; i++) {
				if (weapons.indexOf(indexedWeapons[i]) >= 0) {
					$(".weapon_checkbox").get(i).checked = true;
					if (indexedWeapons[i] == "Isle Idol Trap") {
						$(".weapon_checkbox").get(indexedWeapons.indexOf("Isle Idol Hydroplane Skin")).checked = true;
						$(".weapon_checkbox").get(indexedWeapons.indexOf("Isle Idol Stakeshooter Skin")).checked = true;
					}
				}
			}
		}
		if (charms != undefined) {
			var indexedCharms = [];
			for (var charm in charmsArray) {
				indexedCharms.push(charm);
			}
			for (var i=0; i<indexedCharms.length; i++) {
				if (charms.indexOf(indexedCharms[i]) >= 0) {
					$(".charm_checkbox").get(i).checked = true;
				}
			}
		}
		localStorage.removeItem("setupData");
		saveSetupCookie();
	}

	if (typeof Cookies.get('setup') != 'undefined') {
		var savedSetup = JSON.parse(Cookies.get('setup'));
		var savedWeapons = savedSetup['weapons'];
		var savedBases = savedSetup['bases'];
		var savedCharms = savedSetup['charms'];

		if (savedWeapons.length != Object.size(weaponsArray) || savedBases.length != Object.size(basesArray) || savedCharms.length != Object.size(charmsArray)) {
			window.alert("New items have been added. Please re-tick what you own, or use the bookmarklet. Sorry for any inconvenience!")
			//Delete cookie
			Cookies.remove('setup', {
				path: '/'
			});
			Cookies.remove('setup', {
				path: '/MH-Tools'
			});
		} else {
			//Unticks 'All' if there was an unticked box stored in the cookie
			if (savedWeapons.indexOf(0) >= 0) {
				$("#all_weapons_checkbox").prop('checked', false);
			}

			if (savedBases.indexOf(0) >= 0) {
				$("#all_bases_checkbox").prop('checked', false);
			}

			if (savedCharms.indexOf(0) >= 0) {
				$("#all_charms_checkbox").prop('checked', false);
			}

			//Iterates through arrays saved in cookie and unticks checkboxes accordingly
			for (var i=0; i<savedWeapons.length; i++) {
				if (savedWeapons[i] == 0) {
					$(".weapon_checkbox").get(i).checked = false;
				}
			}

			for (var i=0; i<savedBases.length; i++) {
				if (savedBases[i] == 0) {
					$(".base_checkbox").get(i).checked = false;
				}
			}

			for (var i=0; i<savedCharms.length; i++) {
				if (savedCharms[i] == 0) {
					$(".charm_checkbox").get(i).checked = false;
				}
			}	
		}
	}
}

function loadLocationDropdown() {
	var locationDropdown = document.getElementById("location");
	var locationDropdownHTML = '<option></option>';

	var popArrayLength = Object.size(popArray);

	for (var i=0; i<popArrayLength; i++) {
		locationDropdownHTML += "<option>"+Object.keys(popArray)[i]+"</option>\n";
	}
	
	locationDropdown.innerHTML = locationDropdownHTML;
	
	var locationParameter = getURLParameter("location");
	if(locationParameter != "null") {
		var select = document.getElementById("location");
		for (var i=0; i<select.children.length; i++) {
			var child = select.children[i];
			if (child.innerHTML == locationParameter) {
				child.selected = true;
		    	locationChanged();
				break;
			}
		}
	}
}

function populateSublocationDropdown (locationName) {
	var sublDropdown = document.getElementById("phase");
	var sublDropdownHTML = '';
	
	var nSublocations = Object.size(popArray[locationName]);
	
	for (var i=0; i<nSublocations; i++) {
		var option = Object.keys(popArray[locationName])[i];
		sublDropdownHTML += "<option>"+option+"</option>\n";
	}
	
	sublDropdown.innerHTML = sublDropdownHTML;
	phaseName = Object.keys(popArray[locationName])[0];
	
	var phaseParameter = getURLParameter("phase");
	if(phaseParameter != "null") {
		var select = document.getElementById("phase");
		for (var i=0; i<select.children.length; i++) {
			var child = select.children[i];
			if (child.innerHTML == phaseParameter) {
				child.selected = true;
				break;
			}
		}
	}
	
	loadCheeseDropdown();
   	phaseChanged();
	//Load cheese dropdown
}

function loadCheeseDropdown() {
	var cheeseDropdown = document.getElementById("cheese");
	var cheeseDropdownHTML = '';
	
	var cheeseLength = Object.size(popArray[locationName][phaseName]);
	var insertedCheeses = [];
	
	for (var i=0; i<cheeseLength; i++) {
		var option = Object.keys(popArray[locationName][phaseName])[i];
		if (option.indexOf("/") < 0 || option.indexOf("Combat") >= 0) { //Fix this master cheese thingy	
			if (insertedCheeses.indexOf(option) < 0) {
				cheeseDropdownHTML += "<option>"+option+"</option>\n";
				insertedCheeses.push(option);
			}
		}
		else {
			var optionArray = option.split("/");
			var optionArrayLength = Object.size(optionArray);
			for (var j=0; j<optionArrayLength; j++) {
				if (insertedCheeses.indexOf(optionArray[j]) < 0) {
					cheeseDropdownHTML += "<option>"+optionArray[j]+"</option>\n";
					insertedCheeses.push(optionArray[j]);
				}
			}
		}
	}
	
	cheeseDropdown.innerHTML = cheeseDropdownHTML;

	var cheeseParameter = getURLParameter("cheese");
	if(cheeseParameter != "null" && cheeseLoaded < 3) {
		var select = document.getElementById("cheese");
		for (var i=0; i<select.children.length; i++) {
			var child = select.children[i];
			if (child.innerHTML == cheeseParameter) {
				child.selected = true;
				cheeseLoaded++;
		    	//selectCharm();
				break;
			}
		}
	}

	cheeseChanged();
}

function loadCharmDropdown() {
	var charmDropdown = document.getElementById("charm");
	var charmDropdownHTML = '<option>-</option>';

	var popArrayLPC = popArray[locationName][phaseName][cheeseName];
	if (popArrayLPC == undefined) {
		var popArrayLP = popArray[locationName][phaseName];
		for (var cheese in popArrayLP) {
			if (cheese.indexOf(cheeseName) >= 0) {
				popArrayLPC = popArray[locationName][phaseName][cheese];
			}
		}
	}
	var nSpecialCharms = Object.size(popArrayLPC);
	for (var i=0; i<nSpecialCharms; i++) {
		if (Object.keys(popArrayLPC)[i] != "-") {
			charmDropdownHTML += "<option>" + Object.keys(popArrayLPC)[i] + "</option>\n";
		}
	}
	
	charmDropdown.innerHTML = charmDropdownHTML;

	var charmParameter = getURLParameter("charm");
	if(charmParameter != "null") {
		var select = document.getElementById("charm");
		for (var i=0; i<select.children.length; i++) {
			var child = select.children[i];
			if (child.innerHTML == charmParameter) {
				child.selected = true;
		    	charmChanged();
				break;
			}
		}
	}
}

function updateLink() {
	var URLString = 'setup.html?';
	var select = document.getElementById("charm");
	var selectedCharm = select.children[select.selectedIndex].innerHTML;
	
	if(locationName != "") URLString+= "&location="+locationName;
	if(phaseName != "" && phaseName != "-") URLString+= "&phase="+phaseName;
	if(cheeseName != "") URLString+= "&cheese="+cheeseName;
	if(selectedCharm != "-") URLString+= "&charm="+selectedCharm;
	if(isToxic != "" && isToxic != "-" && $("#toxic").is(":visible")) URLString += "&toxic=" + isToxic;
	if(batteryPower != 0) URLString += "&battery=" + batteryPower;
	if(gsLuck == 0) URLString+= "&gs="+gsLuck;
	if(bonusLuck >= 0) URLString+= "&bonusLuck="+bonusLuck;
	if(tournamentName != "") URLString+= "&tourney="+tournamentName;
	
	document.getElementById("link").href = URLString;
	
	ga('send', 'event', 'link', 'updated', URLString);
	/*
	ga('send', 'event', 'weapon', 'selected', weaponName);
	ga('send', 'event', 'location', 'selected', locationName);
	ga('send', 'event', 'cheese', 'selected', cheeseName);
	ga('send', 'event', 'base', 'selected', baseName);
	ga('send', 'event', 'charm', 'selected', charmName);
	ga('send', 'event', 'tournament', 'selected', tournamentName);*/
}

function weaponChanged() {
		//updateLink();

		var weaponsArrayN = weaponsArray[weaponName];
		if (weaponsArrayN == undefined) weaponsArrayN=[0];

		weaponPower = parseInt(weaponsArrayN[1]);
		trapType = weaponsArrayN[0].trim();
		weaponBonus = parseInt(weaponsArrayN[2]);
		weaponAtt = parseInt(weaponsArrayN[3]);
		weaponLuck = parseInt(weaponsArrayN[4]);
		weaponEff = parseFreshness[weaponsArrayN[5]];
	
		calculateTrapSetup();
}

function locationChanged () {
    var select = document.getElementById("location");
	locationName = select.children[select.selectedIndex].innerHTML;
	updateLink();

	hideAllRows();
	if (locationName == "Furoma Rift") {
		$("#batteryRow").show(500);
		$("#frComment").show(500);
	}
	else if (locationName == "Whisker Woods Rift") {
		$("#wwrComment").show(500);
	}
	else if (locationName == "Zugzwang's Tower") {
		$("#ampSlider").slider('option','value',100);
		$("#ampRow").show(500);
		$("#sliderRow").show(500);
		$("#ztComment").show(500);
	}
	else if (locationName == "Labyrinth") {
		$("#labyComment").show(500);
	}

	batteryPower = 0;
	ztAmp = 100;
	
	//showPop(0);
	
	//Populate sublocation dropdown and select first option
	if (locationName != "") {
		populateSublocationDropdown(locationName);
	}
}

function hideAllRows() {
	$("#toxicRow").hide();
	$("#toxic").val('No');
	$("#batteryRow").hide();
	$("#battery").val('-');
	$("#ampRow").hide();
	$("#sliderRow").hide();
}

function phaseChanged () {
	console.log("Phase changed");

    var select = document.getElementById("phase");
	phaseName = select.children[select.selectedIndex].innerHTML;

	var autoBase = '';
	if (phaseName.indexOf("Magnet") >= 0) autoBase = "Magnet Base";
	else if ((phaseName == "Bombing Run" || phaseName == "The Mad Depths" || phaseName == "Treacherous Tunnels") && baseName == "Magnet Base") autoBase = " ";
	else if (phaseName.indexOf("Hearthstone") >= 0) autoBase = "Hearthstone Base";
	else if (phaseName == "The Mad Depths" && baseName == "Hearthstone Base") autoBase = " ";
	
	if (autoBase != "") {
		var selectBase = document.getElementById("base");
		for (var i=0; i<selectBase.children.length; i++) {
			var child = selectBase.children[i];
			if (child.innerHTML == autoBase) {
				child.selected = true;
	    		baseChanged();
				break;
			}
		}
	}	
	
	if (locationName=="Twisted Garden" && phaseName=="Poured" && pourBonus == 0) {
		pourBonus = 5;
		pourLuck = 5;
		calculateTrapSetup();
	} else if (!(locationName=="Twisted Garden" && phaseName=="Poured") && pourBonus == 5) {
		pourBonus = 0;
		pourLuck = 0;
		calculateTrapSetup();
	}

	loadCheeseDropdown();
	updateLink();
	//ga('send', 'event', 'phase', 'changed', phaseName);
}

function cheeseChanged() {
	console.log("Cheese changed");
    var select = document.getElementById("cheese");
	cheeseName = select.children[select.selectedIndex].innerHTML;
	ga('send', 'event', 'cheese', 'changed', cheeseName);
	//ga('send', 'event', 'charm', 'selected', charmName);
	updateLink();

	//Toxic checks
	if (cheeseName == "Brie" || cheeseName == "SB+") {
		$("#toxicRow").show(500);
		toxicChanged();
	}
	else {
		$("#toxicRow").hide();
		toxicChanged();
	}

	//showPop();
	//selectCharm();
	loadCharmDropdown();
}

function baseChanged() {
	//updateLink();
	
	var basesArrayN = basesArray[baseName];
	if (basesArrayN == undefined) basesArrayN=[0];
	
	//Bases with special effects when paired with particular charm
	if (specialCharm[baseName]) calcSpecialCharms(charmName);
	else {
		var charmsArrayN = charmsArray[charmName];

		//If No charm selected
		if (charmsArrayN == undefined) {
			charmsArrayN= [0,0,0,0,0];
		}
	
		else {
			charmPower = parseInt(charmsArrayN[0]);
			charmBonus = parseInt(charmsArrayN[1]);
			charmAtt = parseInt(charmsArrayN[2]);
			charmLuck = parseInt(charmsArrayN[3]);
			charmEff = parseFreshness[charmsArrayN[4]];
		}
	}

	basePower = parseInt(basesArrayN[0]);
	baseBonus = parseInt(basesArrayN[1]);
	baseAtt = parseInt(basesArrayN[2]);
	baseLuck = parseInt(basesArrayN[3]);
	baseEff = parseFreshness[basesArrayN[4]];
	
	calculateTrapSetup();
}

function charmChanged() {
	ga('send', 'event', 'charm', 'changed', charmName);
	updateLink();

	var charmsArrayN = charmsArray[charmName];

	//If No charm selected
	if (charmsArrayN == undefined) {
		charmsArrayN= [0,0,0,0,0];

		charmPower = (charmsArrayN[0]);
		charmBonus = (charmsArrayN[1]);
		charmAtt = (charmsArrayN[2]);
		charmLuck = (charmsArrayN[3]);
		charmEff = 0;

		calculateTrapSetup();
		//showPop();
	}

	//Charms with special effects when paired with particular base
	else if (specialCharm[charmName]) {
		calcSpecialCharms(charmName);
	}
	//console.log(specialCharm[charmName]);

	else {
		charmPower = (charmsArrayN[0]);
		charmBonus = (charmsArrayN[1]);
		charmAtt = (charmsArrayN[2]);
		charmLuck = (charmsArrayN[3]);
		charmEff = parseFreshness[charmsArrayN[4]];

		calculateTrapSetup();
		//showPop();
	}
	//console.log(charmsArrayN);
}

function gsChanged() {
    var select = document.getElementById("gs");

    if (select.children[select.selectedIndex].innerHTML == "Yes") gsLuck = 7;
    else gsLuck = 0;
    
	updateLink();
	calculateTrapSetup();
	//showPop();
}

function bonusLuckChanged() {
    var select = document.getElementById("bonusLuck").value;

    if (select >= 0) {
    	bonusLuck = select;
    }
    else if (select < 0) {
    	document.getElementById("bonusLuck").value = 0;
    	bonusLuck = 0;
    }
    
	updateLink();
	calculateTrapSetup();
}

function showPop(type) {
	d = new Date();
	//console.log("Showing pop (" + type + ")");
	var results = document.getElementById("results");

	if (locationName == '' || cheeseName == '' || type == 0) {
		results.innerHTML = ''
	} else {
//	    $("#pleaseWaitMessage").show(); 
		//console.log(popArray[locationName][cheeseName]);
		popArrayLPC = popArray[locationName][phaseName][cheeseName];

		//For common cheeses e.g. gouda, brie etc.
		if (popArrayLPC == undefined && cheeseName != "Cheese") {
			var popArrayL = popArray[locationName][phaseName];
			var popArrayLLength = Object.size(popArray[locationName][phaseName]);
			var commonCheeseIndex;
			for (var i=0; i<popArrayLLength; i++) {
				if (Object.keys(popArrayL)[i].indexOf(cheeseName) >= 0 && Object.keys(popArrayL)[i].indexOf("/") >= 0) {
					commonCheeseIndex = Object.keys(popArrayL)[i];
					break;
				}
			}
			popArrayLPC = popArray[locationName][phaseName][commonCheeseIndex];
		}
		
		//console.log(popArrayLC);

		var select = document.getElementById("charm");
		var selectedCharm = select.children[select.selectedIndex].innerHTML;

		var noMice = Object.size(popArrayLPC[selectedCharm]);
		resultsHTML = "<thead><tr><th align='left'>Setup</th>"
		for (var i=0; i<noMice; i++) { 
			resultsHTML += "<th data-filter='false'>" + Object.keys(popArrayLPC[selectedCharm])[i] + "</th>"
		}		
		resultsHTML += "<th id='overallHeader' data-filter='false'>Overall</th></tr></thead><tbody>";
		
		printCombinations(popArrayLPC[selectedCharm], resultsHTML);
	}
}

function printCombinations(micePopulation, tableHTML) {
	var results = document.getElementById("results");
	
	var baseAR = findBaseline();
	var noMice = Object.size(micePopulation)+1;
	//console.log(noMice);
	
	var power = [];
	for (var mouse in micePopulation) {
		power[mouse] = powersArray[mouse][0]
	}
	
	var nWeapons = Object.size(weaponsArray);
	var nBases = Object.size(basesArray);

	for (var i=0; i < nWeapons; i++) {
		if (!$(".weapon_checkbox").get(i).checked) continue;
		var weapon = Object.keys(weaponsArray)[i];
		weaponName = weapon;
		weaponChanged();

		var eff = [];
		for (var mouse in micePopulation) {
			eff[mouse] = findEff(mouse)
		}
		
		for (var j=0; j < nBases; j++) {
			if (!$(".base_checkbox").get(j).checked) continue;
			var base = Object.keys(basesArray)[j];
			baseName = base;
			baseChanged();
			//console.log(weapon + base);

			var overallAR = baseAR + trapAtt/100 - trapAtt/100*baseAR;
			var overallCR = 0;
			var select = document.getElementById("charm");
			var selectedCharm = select.children[select.selectedIndex].innerHTML;
			
			var URLString = 'cre.html?';
			URLString+= "location="+locationName;
			if(phaseName != "-") URLString+= "&phase="+phaseName;
			URLString+= "&cheese="+cheeseName;
			if(selectedCharm != "-") URLString+= "&charm="+selectedCharm+" Charm";
			if(gsLuck == 0) URLString+= "&gs="+gsLuck;
			if(bonusLuck >= 0) URLString+= "&bonusLuck="+bonusLuck;
			URLString+= "&weapon="+weapon;
			URLString+= "&base="+base;
			URLString+= "&toxic="+isToxic;
			URLString+= "&battery="+batteryPower;
			URLString = URLString.replace(/'/g, "%27");
			
			//console.log(URLString);
			
			if (selectedCharm == "-") {
				tableHTML += "<tr><td><a href='" + URLString + "' target='_blank'>" + weapon + " / " + base + "</a><span style='float: right'><button class='find_best_charm_button'>Find best charm</button></span></td>";
			}
			else {
				tableHTML += "<tr><td><a href='" + URLString + "' target='_blank'>" + weapon + " / " + base + "</td>";
				charmName = selectedCharm + " Charm";
			}
			
			for (var mouse in micePopulation) {

				var attractions = parseFloat(micePopulation[mouse])*overallAR;
					
				if (mouse.indexOf("Rook")>=0 && charmName=="Rook Crumble Charm") {
					charmBonus += 300;
					calculateTrapSetup();
				}
				var catchRate = calcCR(eff[mouse], trapPower, trapLuck, power[mouse]);
				//console.log("CR: " + catchRate);
				//console.log(power[mouse]);

				if (locationName == "Zugzwang's Tower" || locationName == "Seasonal Garden") {
					if (ztAmp > 0 && weaponName == "Zugzwang's Ultimate Move") {
						catchRate += ((1-catchRate)/2);
					}
				}

				if (mouse.indexOf("Rook")>=0 && charmName=="Rook Crumble Charm") {
					charmBonus -= 300;
					calculateTrapSetup();
				}

				//Exceptions, modifications to catch rates
				if (charmName == "Ultimate Charm") catchRate = 1;
				else if (locationName == "Sunken City" && charmName == "Ultimate Anchor Charm" && phaseName != "Docked") catchRate = 1;
				else if (mouse == "Dragon" && charmName == "Dragonbane Charm") catchRate *= 2;
				else if (mouse == "Bounty Hunter" && charmName == "Sheriff's Badge Charm") catchRate = 1;
				else if (mouse == "Zurreal the Eternal" && weapon != "Zurreal's Folly") catchRate = 0;

				var catches = attractions*catchRate;
				overallCR += catches;
				catches = catches.toFixed(2);

				tableHTML += "<td align='right'>" + catches + "</td>";
				
			}

			overallCR = overallCR.toFixed(2);
			tableHTML += "<td>" + overallCR + "</td></tr>";
		}
	}
	//tableHTML.innerHTML += "<tr><td>" + "Maniacal" + "</td></tr>";
		
	tableHTML += "</tbody>";
	results.innerHTML = tableHTML;
	
    $(".find_best_charm_button").click(function(event) {
    	console.log("Finding best charm...");
    	var weaponBase = event.target.parentNode.previousSibling.innerHTML;
    	var indexOfSlash = weaponBase.indexOf(" / ");
    	weaponName = weaponBase.slice(0,indexOfSlash);
    	baseName = weaponBase.substr(indexOfSlash+3);
    	weaponChanged();
    	baseChanged();
    	d = new Date();
    	printCharmCombinations(popArrayLPC["-"], resultsHTML);
    });

    var resort = true, callback = function() {
    	var header = $("#overallHeader");
    	if (header.hasClass("tablesorter-headerAsc")) {
    		header.click();
    		header.click();
    	}
    	else if (header.hasClass("tablesorter-headerUnSorted")) {
    		header.click();
    	}
    };
	$("#results").trigger("updateAll", [ resort, callback ]);

	// console.log(new Date().getTime()-d.getTime());
}

function printCharmCombinations(micePopulation, tableHTML) {
	var results = document.getElementById("results");
	
	var baseAR = findBaseline();
	var noMice = Object.size(micePopulation)+1;
	//console.log(noMice);
	
	var power = [];
	for (var mouse in micePopulation) {
		power[mouse] = powersArray[mouse][0];
	}
	
	var nCharms = Object.size(charmsArray);
	for (var i=0; i < nCharms; i++) {
		if (!$(".charm_checkbox").get(i).checked) continue;
		var charm = Object.keys(charmsArray)[i];
		charmName = charm;
		charmChanged();

		var eff = [];
		for (var mouse in micePopulation) {
			eff[mouse] = findEff(mouse)
		}
		
		var overallAR = baseAR + trapAtt/100 - trapAtt/100*baseAR;
		var overallCR = 0;
		
		var URLString = 'cre.html?';
		URLString+= "location="+locationName;
		if(phaseName != "-") URLString+= "&phase="+phaseName;
		URLString+= "&cheese="+cheeseName;
		if(charmName != "") URLString+= "&charm="+charmName;
		if(gsLuck == 0) URLString+= "&gs="+gsLuck;
		if(bonusLuck >= 0) URLString+= "&bonusLuck="+bonusLuck;
		URLString+= "&weapon="+weaponName;
		URLString+= "&base="+baseName;
		URLString = URLString.replace(/'/g, "%27");
		
		//console.log(URLString);
		
		tableHTML += "<tr><td><a href='" + URLString + "' target='_blank'>" + weaponName + " / " + baseName + " / " + charmName + "</a><span style='float: right'></span></td>";
		
		for (var mouse in micePopulation) {

			var attractions = parseFloat(micePopulation[mouse])*overallAR;
		
			
			if (mouse.indexOf("Rook")>=0 && charmName=="Rook Crumble Charm") {
				charmBonus += 300;
				calculateTrapSetup();
			}
			var catchRate = calcCR(eff[mouse], trapPower, trapLuck, power[mouse]);
			//console.log("CR: " + catchRate);
			//console.log(power[mouse]);
			if (mouse.indexOf("Rook")>=0 && charmName=="Rook Crumble Charm") {
				charmBonus -= 300;
				calculateTrapSetup();
			}

			//Exceptions, modifications to catch rates
			if (charmName == "Ultimate Charm") catchRate = 1;
			else if (mouse == "Dragon" && charmName == "Dragonbane Charm") catchRate *= 2;
			else if (mouse == "Zurreal the Eternal" && weaponName != "Zurreal's Folly") catchRate = 0;

			var catches = attractions*catchRate;
			overallCR += catches;
			catches = catches.toFixed(2);

			tableHTML += "<td align='right'>" + catches + "</td>";
			
		}

		overallCR = overallCR.toFixed(2);
		tableHTML += "<td>" + overallCR + "</td></tr>";
	}
	//tableHTML.innerHTML += "<tr><td>" + "Maniacal" + "</td></tr>";
	
	
	tableHTML += "</tbody>"
	results.innerHTML = tableHTML
	
	var resort = true, callback = function() {
    	var header = $("#overallHeader");
    	if (header.hasClass("tablesorter-headerAsc") || header.hasClass("tablesorter-headerUnSorted")) {
    		$("#overallHeader").click();
    	}
    };
	$("#results").trigger("updateAll", [ resort, callback ]);

	// console.log(new Date().getTime()-d.getTime());
}