var workingList;
var selectedSightWordSetList = [];

function loadSetListList() {
    for (var i = 0; i < setLists.length; i++) {
        $("#setListsSelection").append("<option value='" + i + "'>" + setLists[i].setListName + "</option>");
    }
}

function loadSetList() {

    var index = $("#setListsSelection").val();
    selectedSightWordSetList = setLists[index].sets;

    clearWord();
    $("#wordList").empty();
    $("#setList").empty();

    for (var i = 0; i < selectedSightWordSetList.length; i++) {
        //$("#setList").append("<div class='set' style='border: 4px solid " + selectedSightWordSetList[i].colorHex + ";' collectionIndex='" + i + "' id='" + selectedSightWordSetList[i].colour + "_set'><label><input type='checkbox' value='" + selectedSightWordSetList[i].colour + "'>" + selectedSightWordSetList[i].colour + "</label></li>");
        $("#setList").append("<div class='set' style='border: 2px solid #" + selectedSightWordSetList[i].colorHex + "; border-radius: 5px;' collectionIndex='" + i + "' id='" + selectedSightWordSetList[i].setName + "_set'>" + selectedSightWordSetList[i].setName + "</div>");
        $("#" + selectedSightWordSetList[i].setName + "_set").on("click", function() {
            loadWordList(this.attributes.collectionindex.value);
        });
    }
}

function loadWordList(index) {
    clearWord();
    $("#wordList").empty();
    var set = selectedSightWordSetList[index];
    $("#wordContainer").css("backgroundColor", "white");
    $("#wordContainer").css("backgroundColor", "#" + set.colorHex);
    for (var i = 0; i < set.wordList.length; i++) {
        $("#wordList").append("<div id='" + set.wordList[i] + "' class='word' word='" + set.wordList[i] + "'>" + set.wordList[i] + "</div>");
    }
    $(".word").click(function() { sayThisWord(this.id); });
}

function loadVoiceList() {
    //Populate voice selection dropdown
    var voicelist = responsiveVoice.getVoices();

    var vselect = $("#voiceselection");

    $.each(voicelist, function() {
        vselect.append($("<option />").val(this.name).text(this.name));
    });
}

function sayWord() {
    sayThisWord($("#word").html());
}

function sayThisWord(word) {
    responsiveVoice.speak(word, $('#voiceselection').val());
}

function displayRandom() {
    var previous = $("#word").html();
    var word = previous;
    while (previous == word) {
        var index = Math.floor($(".word").length * Math.random());
        word = $(".word")[index].attributes.word.value;
    }
    displayWord(word);
}

function displayWord(word) {
    $("#word").empty();
    $("#word").append(word);
}

function clearWord() {
    $("#word").empty();
    $("#word").append("-");
}

function initialise() {
    loadSetListList();
    loadVoiceList();

    $("#pickRandomWordButton").click(function() { displayRandom(); });
    $("#sayWordButton").click(function() { sayWord(); });
    $("#word").click(function() { sayWord(); });

    $("#setListsSelection").change(function() { loadSetList(); });
    loadSetList();
}