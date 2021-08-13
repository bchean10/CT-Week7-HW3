addErgastSeason();
addErgastRound();
addSubmitButton();
createErgastTable();

function addErgastSeason(){
    input=document.createElement("input");
    input.placeholder = "Enter Season";
    input.name = "Season";
    input.classList.add("form-control");
    document.body.appendChild(input);
}

function addErgastRound(){
    input=document.createElement("input");
    input.placeholder = "Enter Round";
    input.name = "Round";
    input.classList.add("form-control");
    document.body.appendChild(input);
}

function handleSubmit(event){
    season=document.getElementsByName("Season")[0].value
    console.log(season)
    round = document.getElementsByName("Round")[0].value
    console.log(round)
    doAPICall(season, round)
}

function addSubmitButton(){
    button=document.createElement('button');
    document.body.appendChild(button);
    button.innerText="Submit"
    button.classList.add('btn','btn-primary')
    button.addEventListener("click",handleSubmit)

}

function createErgastTable(){
    table = document.createElement("table");
    table.classList.add("table","table-striped")
    document.body.appendChild(table)

    thead = document.createElement("thead");
    table.appendChild(thead);

    tr = document.createElement("tr");
    thead.appendChild(tr);

    th = document.createElement("th");
    th.innerText = "First Name";
    th.scope="col";
    tr.appendChild(th);

    th = document.createElement("th");
    th.innerText = "Last Name";
    th.scope="col";
    tr.appendChild(th);

    th = document.createElement("th");
    th.innerText = "Position";
    th.scope="col";
    tr.appendChild(th);

    th = document.createElement("th");
    th.innerText = "Wins";
    th.scope="col";
    tr.appendChild(th);

    th = document.createElement("th");
    th.innerText = "DOB";
    th.scope="col";
    tr.appendChild(th);

    th = document.createElement("th");
    th.innerText = "Nationality";
    th.scope="col";
    tr.appendChild(th);

    th = document.createElement("th");
    th.innerText = "Constructor";
    th.scope="col";
    tr.appendChild(th);

    tbody = document.createElement("tbody");
    table.appendChild(tbody);

    let list = document.getElementsByTagName('tbody')[0];
    while (list.hasChildNodes()) {  
      list.removeChild(list.firstChild);
    }
}


async function doAPICall(season, round){
    result = await axios.get(`http://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
                                .catch((e)=>{console.log(e);alert("Error!")}).finally(console.log("Api request over"))

    if(!result){return}
    console.log(result)
    console.log("========")
    console.log(result.data)

    results=result.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    for (result of results){ 

    tbody=document.getElementsByTagName('tbody')[0];

    tr = document.createElement("tr");
    tbody.appendChild(tr);

    td = document.createElement('td');
    td.innerText=result.Driver.givenName;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerText=result.Driver.familyName;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerText=result.position;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerText=result.wins;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerText=result.Driver.dateOfBirth;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerText=result.Driver.nationality;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerText=result.Constructors[0].name;
    tr.appendChild(td);


    }
}
