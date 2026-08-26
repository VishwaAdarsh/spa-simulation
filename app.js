const app=document.querySelector("#app");
const links=document.querySelectorAll("[data-route]");
const menu=document.querySelector("#menuButton");
const nav=document.querySelector("#navLinks");

const projects=[
{id:1,name:"Northstar Website",status:"In Progress",description:"A responsive business website."},
{id:2,name:"Orbit Mobile App",status:"Completed",description:"A simple mobile product interface."},
{id:3,name:"Greenline Campaign",status:"Completed",description:"A promotional campaign website."}
];

function route(){return location.hash.replace("#","")||"/"}

function render(){
 const r=route();
 closeMenu();
 links.forEach(l=>l.classList.toggle("active",r===l.dataset.route||(r.startsWith("/projects/")&&l.dataset.route==="/projects")));
 if(r==="/") home();
 else if(r==="/projects") projectsPage();
 else if(r.startsWith("/projects/")) projectPage(Number(r.split("/")[2]));
 else if(r==="/services") services();
 else if(r==="/about") about();
 else notFound();
}

function home(){
 app.innerHTML=`<section class="page hero"><div><p>WEEK 5 INTERNSHIP PROJECT</p><h1>Welcome to the Aster Studio SPA.</h1><p>This application demonstrates client-side navigation and dynamic content using plain JavaScript.</p><a class="button" href="#/projects">View projects</a></div><img src="assets/images/dashboard.svg" alt="Dashboard illustration" width="700" height="500"></section>`;
}

function projectsPage(){
 app.innerHTML=`<section class="page"><h1>Projects</h1><div class="cards">${projects.map(p=>`<article class="card"><h2>${p.name}</h2><p><strong>Status:</strong> ${p.status}</p><p>${p.description}</p><a href="#/projects/${p.id}">View project</a></article>`).join("")}</div></section>`;
}

function projectPage(id){
 const p=projects.find(x=>x.id===id);
 if(!p){notFound();return}
 app.innerHTML=`<section class="page"><p>PROJECT DETAILS</p><h1>${p.name}</h1><article class="card"><p><strong>Status:</strong> ${p.status}</p><p>${p.description}</p><p>This content was rendered from JavaScript data without loading another HTML page.</p></article><a class="button" href="#/projects">Back to projects</a></section>`;
}

function services(){app.innerHTML=`<section class="page"><h1>Services</h1><div class="cards"><article class="card"><h2>Web Design</h2><p>Simple interfaces for digital products.</p></article><article class="card"><h2>Frontend Development</h2><p>Responsive HTML, CSS and JavaScript websites.</p></article><article class="card"><h2>Digital Strategy</h2><p>Planning useful digital experiences.</p></article></div></section>`}

function about(){app.innerHTML=`<section class="page"><p>ABOUT</p><h1>A small digital studio.</h1><article class="card"><p>Aster Studio is a fictional project created for this internship assignment to demonstrate a basic SPA using web programming fundamentals.</p></article></section>`}

function notFound(){app.innerHTML=`<section class="page not-found"><h1>404</h1><h2>Page not found</h2><p>The requested page does not exist.</p><a class="button" href="#/">Return home</a></section>`}

function closeMenu(){nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}
menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",open)})
window.addEventListener("hashchange",render);
window.addEventListener("popstate",render);
render();