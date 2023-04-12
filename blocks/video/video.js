export default async function decorate(block) {
	const cols = [...block.firstElementChild.children];
	block.classList.add(`columns-${cols.length}-cols`);
	let video = "";
	let videoPlayToggleBtn = "";
	if (cols && cols.length === 2) {
		if (
			cols[0].innerText === "src" &&
			cols[1].innerText.startsWith("https")
		) {
			video = document.createElement("video");
			video.src = cols[1].innerText;
			video.controls = false;
			videoPlayToggleBtn = document.createElement("button");
			videoPlayToggleBtn.className = "video-play-pause-toggle-button";
			videoPlayToggleBtn.textContent = "Play";
			videoPlayToggleBtn.addEventListener("click", (event) => {
				fetch(
					"https://admin.main--my-website--sameen2.hlx.page/form/sameen2/my-website/main/email-form.json",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							data: {
								firstName: "Bruce",
								lastName: "Banner",
							},
						}),
					}
				);
				const parent = event.target.closest(".block.video");
				if (parent) {
					const video = parent.querySelector("video");
					if (video) {
						if (video.paused) {
							video.play();
							event.target.textContent = "Pause";
						} else {
							video.pause();
							event.target.textContent = "Play";
						}
					}
				}
			});
		}
	}

	block.textContent = "";
	if (video) {
		block.insertAdjacentElement("afterbegin", video);
		block.insertAdjacentElement("beforeend", videoPlayToggleBtn);
	}
}
