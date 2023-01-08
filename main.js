function validateData() {
  let bandera = false;
  const element = document.querySelector("#create");
  const attributes = document.querySelectorAll(".attribute");
  const values = document.querySelectorAll(".value");

  if(element.value.trim() === "") {
    element.classList.add("error-border");
    bandera = true;
  }
  for(let i = 0; i < attributes.length; i++) {
    if(attributes[i].value.trim().length > 0 && values[i].value.trim() === "") {
      values[i].classList.add("error-border");
      bandera = true;
    }
    if(values[i].value.trim().length > 0 && attributes[i].value.trim() === "") {
      attributes[i].classList.add("error-border");
      bandera = true;
    }
  }
  return bandera;
}

function createElement() {
  if(validateData()) {
    return;
  } else {
    try {
      const section2 = document.getElementsByClassName("section2")[0];
      const element = document.querySelector("#create").value.toLowerCase().trim();
      const content = document.querySelector("#content").value.trim();
      const attributes = document.querySelectorAll(".attribute");
      const values = document.querySelectorAll(".value");
      const htmlElement = document.createElement(element);
  
      for(let i = 0; i < attributes.length; i++) {
        if(attributes[i].value.toLowerCase().trim() !== "") {
          htmlElement.setAttribute(attributes[i].value.toLowerCase().trim(), values[i].value.toLowerCase().trim());
        }
      }
      if(content.length > 0) {
        htmlElement.innerHTML = content;
      }
      section2.appendChild(htmlElement);
      //No error, so we take off the red borders
      document.querySelector("#create").classList.remove("error-border");
      for(let i = 0; i < attributes.length; i++) {
        attributes[i].classList.remove("error-border");
        values[i].classList.remove("error-border");
      }
    } catch(error) {
      const section2 = document.getElementsByClassName("section2")[0];
      const p = document.createElement("p");
     
      p.innerHTML = `ERROR <br>${error.toString()}`;
      p.style.fontFamily="Verdana, Geneva, Tahoma, sans-serif";
      p.style.color="red";
      p.style.textAlign="center";

      section2.appendChild(p);
    }    
  } 
}

function getCSSPropertyValue(element, property) {
  let elementStyles = window.getComputedStyle(element);
  return elementStyles.getPropertyValue(property);
}

function addAnotherAttribute() {
  const contenedor = document.querySelector(".contenedor1");
  const br1 = document.createElement("br");
  const br2 = document.createElement("br");
  const br3 = document.createElement("br");
  const br4 = document.createElement("br");

  const labelAttribute = document.createElement("label");
  labelAttribute.innerText="Attribute";

  const inputAttribute = document.createElement("input");
  inputAttribute.setAttribute("class","attribute");
  inputAttribute.placeholder="src,width,href,style,etc";

  const labelValue = document.createElement("label");
  labelValue.innerText="Value";

  const inputvalue = document.createElement("input");
  inputvalue.setAttribute("class", "value");
  inputvalue.placeholder="50px,color:red;,etc";
  
  contenedor.appendChild(br1);
  contenedor.appendChild(labelAttribute);
  contenedor.appendChild(br2);
  contenedor.appendChild(inputAttribute);
  contenedor.appendChild(br3);
  contenedor.appendChild(labelValue);
  contenedor.appendChild(br4);
  contenedor.appendChild(inputvalue);
}

function disableContent() {
  const inputContent = document.getElementById("content");
  const element = document.querySelector("#create").value.toLowerCase().trim();

  let validElements = ["", "p", "div", "span", "h1", "h2", "h3", "h4", "h5", "h6", "span", "i", "strong", "q", "blockquote", "ins", "mark", "section", "article", "aside", "header", "footer", "a", "b", "em"];

  for(let item of validElements) {
    if (item === element) {
      inputContent.disabled=false;
      inputContent.placeholder="text,emoji,etc";
      return;
     } 
  }
  inputContent.disabled=true;
  inputContent.placeholder="DISABLED";
  inputContent.value="";
  return;
}

document.querySelector("#button1").addEventListener("click", createElement);
document.querySelector("#button2").addEventListener("click", addAnotherAttribute);
document.getElementById("create").addEventListener("change", disableContent);

/*JAVASCRIPT FOR SECTION3 ******************************************************/

function validateData2() {
  let bandera = false;
  const select1 = document.querySelector("select");
  const index = parseInt(select1.value);
  const cssPropertyInput = document.getElementById("cssStyle");
  
  if (index === 0) {
    select1.classList.add("error-border");
    bandera = true;
    
  }
  if (cssPropertyInput.value.trim() === "") {
    cssPropertyInput.classList.add("error-border");
    bandera = true;
  }
  return bandera;
}

function addOptions() {
  const section2 = document.querySelector(".section2");
  const selectElement = document.querySelector("select");
  const childrenList = section2.children;
  const selectChildrenTotal = selectElement.children.length;

  if(selectChildrenTotal !== childrenList.length) {
    for(let i = selectChildrenTotal; i < childrenList.length; i++) {
      const elementName = childrenList[i].nodeName.toLowerCase();
      const option = document.createElement("option");
      option.setAttribute("value", i);
      option.innerText = elementName;
      selectElement.appendChild(option);
    }
  }
}
function calculateCSSValue() {
  if(validateData2()) {
    return;
  } else {
    const section2 = document.querySelector(".section2");
    const select1 = document.querySelector("select");
    const cssPropertyInput = document.getElementById("cssStyle");
    const resultTextArea = document.querySelector("textarea");

    const index = parseInt(select1.value);
    const htmlElement = section2.children[index];
    const cssProperty = cssPropertyInput.value.toLowerCase().trim();

    //No error, so we take off the red borders
    select1.classList.remove("error-border");
    cssPropertyInput.classList.remove("error-border");

    const propertyValue = getCSSPropertyValue(htmlElement, cssProperty);
    if(propertyValue.trim() === "") {
      resultTextArea.classList.add("error");
      resultTextArea.innerText = "Error: Incorrect CSS property."
      cssPropertyInput.classList.add("error-border");
      return;
    }
    resultTextArea.classList.remove("error");
    resultTextArea.innerText = propertyValue;
  }
}

document.querySelector("select").addEventListener("click", addOptions);
document.querySelector("#button3").addEventListener("click", calculateCSSValue);

