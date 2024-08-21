addEventListener('load', () => {

    fillAgentList();

    initiateSkewScroll();

    // EEL EXPOSING
    eel.expose( alertUser );
    eel.expose( askUserToChooseAgent );
    eel.expose( changeStatus );
    eel.expose( hideStopButton )

})

function fillAgentList() {

    fetch("./json/agents.json")
    .then((response) => response.json())
    .then((agentJSON) => {

        let agents = Object.keys( agentJSON );

        for (const agent of agents) {

            let agent_div = document.createElement("div");
            agent_div.className = "agent";
            agent_div.id = agent;

            agent_div.setAttribute('onclick', `pickAgent('${agent}')`);

            let agent_div_thumbnail = document.createElement("img");
            agent_div_thumbnail.className = "agent-thumb";
            agent_div_thumbnail.src = `./assets/images/agent-banners/${ agent.toLowerCase() }.png`;

            let agent_div_name = document.createElement("p");
            agent_div_name.innerText = agent;

            agent_div.appendChild( agent_div_thumbnail );
            agent_div.appendChild( agent_div_name );

            document.getElementById("agents").appendChild(agent_div);

        }

    })

}

function alertUser(statusText = '', chosenAgentText = '') {

    let status = document.getElementById('status');
    let chosenAgent = document.getElementById('chosen-agent');
    let agent_preview = document.getElementById('agent-preview');

    agent_preview.src ='./assets/images/slurp.gif';
    status.innerText = statusText;
    chosenAgent.innerText = chosenAgentText;

}

function askUserToChooseAgent() {

    let status = document.getElementById('status');
    let chosenAgent = document.getElementById('chosen-agent');
    let agent_preview = document.getElementById('agent-preview');

    agent_preview.src ='./assets/images/slurp.gif';
    status.innerText = "CHOOSE AN AGENT";
    chosenAgent.innerText = "..."

}

function changeStatus(status) {

    document.getElementById('status').innerText = status;

}

function initiateSkewScroll() {

    const section = document.querySelector('#agents');

    let currentPos = section.scrollTop;

    const update = () => {
        let newPos = section.scrollTop;
        let diff = newPos - currentPos;
        let speed = diff * 0.3;
        if (speed > 10) speed = 10;
        if (speed < -10) speed = -10;
        section.style.transform = `skewY(${ speed }deg)`;

        currentPos = newPos;
        requestAnimationFrame(update);
    }

    update();

}

function pickAgent(agent) {
  // Update the status for both random and specific agent selections
  document.getElementById("status").innerText = "WAITING FOR PRE-GAME";

  if (agent === "Random") {
    // Fetch the list of agents
    fetch("./json/agents.json")
      .then((response) => response.json())
      .then((agentJSON) => {
        // Get the list of agents excluding "Random"
        let agents = Object.keys(agentJSON).filter((a) => a !== "Random");

        // Randomly select an agent from the list
        let randomAgent = agents[Math.floor(Math.random() * agents.length)];

        // Simulate the selection of the randomly chosen agent
        pickAgent(randomAgent);
      });
  } else {
    // Existing logic for selecting an agent
    document.getElementById("chosen-agent").innerText = agent.toUpperCase();
    document.getElementById(
      "agent-preview"
    ).src = `./assets/images/agent-previews/${agent.toLowerCase()}-preview.gif`;
    showStopButton();
    eel.try_lock(agent); // Trigger the eel function to lock the agent
  }
}

function showStopButton() {

    const button = bootstrap.Collapse.getOrCreateInstance( document.getElementById("stop-button-flex-row") );
    button.show();

}

function hideStopButton() {

    const button = bootstrap.Collapse.getOrCreateInstance( document.getElementById("stop-button-flex-row") );
    button.hide();

}

function stopLocking() {

    eel.stop_lock();
    askUserToChooseAgent();

}

function openInstagram() {

    eel.open_instagram();

}

function openGithub() {

    eel.open_github();

}
