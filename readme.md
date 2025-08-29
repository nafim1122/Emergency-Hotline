ans 1:
Difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll:
getElementById("id") finds an element by its unique id and always returns only one element.
getElementsByClassName("class") finds all elements with a given class name and returns a live HTMLCollection.
querySelector("selector") finds the first element that matches a CSS selector.
querySelectorAll("selector") finds all elements matching the CSS selector and returns a static NodeList.

ans 2:
How to create and insert a new element into the DOM:
You first create an element with document.createElement(), then set its content or attributes, and finally insert it into the DOM using appendChild(), append(), prepend(), or insertBefore().
Example:
let newDiv = document.createElement("div");
newDiv.textContent = "Hello, I’m new here!";
document.body.appendChild(newDiv);

ans: 3
Event bubbling means when an event occurs on a child element, it first runs on that element and then moves up (bubbles) to its parent, then to the grandparent, and so on until it reaches the document.

ans: 4
Event delegation means attaching a single event listener on a parent element instead of multiple listeners on child elements. Because of bubbling, the parent can detect events from children. It is useful because it saves memory, works with dynamically added elements, and keeps the code cleaner.

ans: 5
preventDefault() stops the default behavior of an element, for example preventing a form from submitting or a link from opening.
stopPropagation() stops the event from bubbling up to parent elements.


