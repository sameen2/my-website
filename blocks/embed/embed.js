const youtube = (element, url) => {
	const [, vid] = url.split("?v=");
	const html = `<div class="youtube-wrapper">
  <iframe src="https://www.youtube.com/embed/${vid}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen="" scrolling="no" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="Content from Youtube" loading="lazy"></iframe>
  </div>`;
	element.innerHTML = "";
	element.insertAdjacentHTML("afterbegin", html);
};

export default function decorate(block) {
	const [element] = block.firstElementChild.children;
	const url = element.innerText;
	if (url.includes("youtu")) {
		youtube(block, url);
	}
}
