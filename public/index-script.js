const lis=document.querySelectorAll("#header-nav-ul li");




lis.forEach(li => {
	li.addEventListener("click", function() {

		lis.forEach(item => {
			item.classList.remove("active");
		});

		this.classList.add("active");
	  });
	
});