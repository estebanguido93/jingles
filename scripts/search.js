var inputJingle=document.getElementById("inpJingle");var currentFocus;function addMultipleEventListeners(element,events,handler){events.forEach(event=>{element.addEventListener(event,handler)})}
addMultipleEventListeners(inputJingle,["input","focus"],function(e){var a,b,i,val=this.value;closeAllLists();currentFocus=-1;a=document.createElement("div");a.setAttribute("id",this.id+"autocomplete-list");a.setAttribute("class","autocomplete-items");a.style.maxHeight='500px';a.style.overflowY='auto';this.parentNode.appendChild(a);let results=searchJingles(jingles,val);for(i=0;i<results.length;i++){let name=getName(results[i]);let cleanName=cleanText(name);b=document.createElement("div");b.innerHTML=name;b.innerHTML+="<input type='hidden' value='"+cleanName+"'>";b.innerHTML+="<input type='hidden' class='video-link' value='"+results[i].link+"'>";b.addEventListener("click",function(e){inputJingle.value=this.getElementsByTagName("input")[0].value;const videoLink=this.getElementsByClassName("video-link")[0].value;window.open(videoLink,'_blank');closeAllLists();showClearButton()});a.appendChild(b)}});function highlightText(text,searchText){const normalizedText=text.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"");const normalizedSearchText=searchText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"");const index=normalizedText.indexOf(normalizedSearchText);if(index===-1){return text}
const originalText=text.substring(index,index+searchText.length);return text.substring(0,index)+'<strong>'+originalText+'</strong>'+text.substring(index+searchText.length)}
function searchJingles(jingles,searchText){if(searchText){const lowerSearchText=searchText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"");return jingles.filter(course=>{return(course.nombreJingle.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(lowerSearchText)||course.nombreReal.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(lowerSearchText)||course.autorReal.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(lowerSearchText)||course.autorJingle.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(lowerSearchText))}).map(course=>{const highlightedCourse={...course};Object.keys(course).forEach(key=>{if(key!="link"){highlightedCourse[key]=highlightText(course[key],lowerSearchText)}});return highlightedCourse})}else{return jingles}}
function getName(result){const nombreJingle=result.nombreJingle||'';const autorJingle=result.autorJingle||'';const nombreReal=result.nombreReal||'';const autorReal=result.autorReal||'';let name='';if(nombreJingle){name+=nombreJingle;if(autorJingle){name+=` (${autorJingle})`}}
if(nombreReal){if(name){name+=' - '}
name+=nombreReal;if(autorReal){name+=` (${autorReal})`}}
return name}
function cleanText(text){const div=document.createElement("div");div.innerHTML=text;return div.textContent||div.innerText||""}
function closeAllLists(elmnt){var x=document.getElementsByClassName("autocomplete-items");for(var i=0;i<x.length;i++){if(elmnt!=x[i]&&elmnt!=inputJingle){x[i].parentNode.removeChild(x[i])}}}
inputJingle.addEventListener("input",function(e){var x=document.getElementById(this.id+"autocomplete-list");if(x)x=x.getElementsByTagName("div");if(e.keyCode==40){currentFocus++;addActive(x)}else if(e.keyCode==38){currentFocus--;addActive(x)}else if(e.keyCode==13){e.preventDefault();if(currentFocus>-1){if(x)x[currentFocus].click();}}});function addActive(x){if(!x)return!1;removeActive(x);if(currentFocus>=x.length)currentFocus=0;if(currentFocus<0)currentFocus=(x.length-1);x[currentFocus].classList.add("autocomplete-active");x[currentFocus].scrollIntoView({behavior:"smooth",block:"nearest"})}
function showClearButton(){let clearBtn=inputJingle.nextElementSibling;if(!clearBtn||clearBtn.id!=='clear-btn'){clearBtn=document.createElement('span');clearBtn.setAttribute('id','clear-btn');clearBtn.classList.add('clear-icon');clearBtn.innerHTML='&#10006;';clearBtn.addEventListener('click',function(){inputJingle.value='';closeAllLists();this.remove()});inputJingle.parentNode.insertBefore(clearBtn,inputJingle.nextSibling);clearBtn.style.position='absolute';clearBtn.style.right='10px';clearBtn.style.top='50%';clearBtn.style.transform='translateY(-50%)';inputJingle.style.paddingRight='30px'}}
function removeActive(x){for(var i=0;i<x.length;i++){x[i].classList.remove("autocomplete-active")}}
inputJingle.addEventListener("keydown",function(e){console.log(e.keyCode)
var x=document.getElementById(this.id+"autocomplete-list");if(x){x=x.getElementsByTagName("div")}
showClearButton();if(e.keyCode==40){currentFocus++;addActive(x)}else if(e.keyCode==38){currentFocus--;addActive(x)}else if(e.keyCode==13){e.preventDefault();if(currentFocus>-1){if(x)x[currentFocus].click();}}})