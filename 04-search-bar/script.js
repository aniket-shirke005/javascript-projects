const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[user-card-container]");
const input = document.getElementById("search");

let users = [];

input.addEventListener("input", (e) => {
  let value = e.target.value.toLowerCase();

  users.forEach((user) => {
    // search by name or email
    const isVisible =
      user.name.toLowerCase().startsWith(value) ||
      user.email.toLowerCase().startsWith(value);
    user.element.classList.toggle("hide", !isVisible);
  });
});

const apiUrl = "https://jsonplaceholder.typicode.com/users";
fetch(apiUrl)
  .then((res) => res.json())
  .then((data) => {
    users = data.map((user) => {
      // template.content property return document fragment
      // each time i am using card template/blue-print to create/re-use card template
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[card-header]");
      const body = card.querySelector("[card-body]");
      header.textContent = user.name;
      body.textContent = user.email;
      userCardContainer.append(card);
      return { name: user.name, email: user.email, element: card };
    });
  })
  .catch((error) => console.log("Something went wrong" + error.message));
