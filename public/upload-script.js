const formFieldset = document.getElementById("form-fieldset");
const formButton = document.getElementById("form-button");

const apiURL = "https://127.0.0.1:10001/label";

const fetchLabel = async () => {
    const response = await fetch(apiURL, {
        method: "POST"
    });
    const data = await response.json();
    data.label.forEach((d) => {
        let p = document.createElement("p");

        let checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("id", d);
        checkBox.setAttribute("name", "label");
        checkBox.setAttribute("value", d);

        let label = document.createElement("label");
        label.innerText = d;
        label.setAttribute("for", d);

        p.appendChild(checkBox);
        p.appendChild(label);
        formFieldset.appendChild(p);
    });
}

const clickFormButton = (e) => {
    e.preventDefault();

}

fetchLabel();