const lis=document.querySelectorAll("#header-nav-ul li");
const headerNavUl = document.getElementById("header-nav-ul");
const main = document.getElementById("main")


const labelApi = "https://127.0.0.1/label";
const commodityApi = "https://127.0.0.1/commodity"

const fetchLabel = async () => {
	const response = await fetch(labelApi, {
		method: "POST"
	});
	const data = await response.json();
	data.label.forEach((d) => {
		let li = document.createElement("li");
		li.innerText = d;
		li.setAttribute("onclick", "clickHeaderNavLi(this)");
		headerNavUl.appendChild(li);

	});
	document.querySelectorAll("#header-nav-ul li")[0].classList.add("active");
}

const fetchCommodity = async () => {
	const response = await fetch(commodityApi, {
		method: "post"
	});
	const data = await response.json();
	data.picArray.forEach((pic) => {
		let div = document.createElement("div");
		div.setAttribute("class", "main-item");

		let picData = pic.split(".")[0];
		picData = picData.split("-");

		let img = document.createElement("img");
		let h3 = document.createElement("h3");
		let h2 = document.createElement("h2");
		img.setAttribute("src", data.dir+pic);
		h3.innerText = picData[0];
		h2.innerText = picData[1];
		div.appendChild(img);
		div.appendChild(h3);
		div.appendChild(h2);
		main.appendChild(div);

	});
	console.log(data);
};


function clickHeaderNavLi(target)  { // 还好用的是function

	document.querySelectorAll("#header-nav-ul li").forEach(item => {
		item.classList.remove("active");
	});

	target.classList.add("active");
};

fetchLabel();
fetchCommodity();