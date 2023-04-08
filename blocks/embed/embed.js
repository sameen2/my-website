// import { loadCSS } from "../../scripts/scripts.js";

const jsonpGist = (url, callback) => {
	// Setup a unique name that cane be called & destroyed
	const callbackName = `jsonp_${Math.round(100000 * Math.random())}`;

	// Create the script tag
	const script = document.createElement("script");
	script.src = `${url}${
		url.indexOf("?") >= 0 ? "&" : "?"
	}callback=${callbackName}`;

	// Define the function that the script will call
	window[callbackName] = (data) => {
		delete window[callbackName];
		document.body.removeChild(script);
		callback(data);
	};

	// Append to the document
	document.body.appendChild(script);
};

const gist = (element) => {
	const { href } = element;
	const url = href.slice(-2) === "js" ? `${href}on` : `${href}.json`;

	jsonpGist(url, (data) => {
		// loadCSS(data.stylesheet);
		element.insertAdjacentHTML("afterend", data.div);
		element.remove();
	});
};

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
	if (url.includes("gist")) {
		gist(block);
	}
}
