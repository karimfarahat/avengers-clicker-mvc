model = {
  items: [
    {
      name: "Doctor Strange",
      src: "./img/strange.jpg",
      counter: 0,
      selected: false,
    },
    {
      name: "Black Panther",
      src: "./img/panther.jpg",
      counter: 0,
      selected: false,
    },
    { name: "Iron Man", src: "./img/ironman.jpg", counter: 0, selected: false },
  ],
};

view = {
  clearView: function () {
    document.getElementById("img-list").innerHTML = "";

    document.getElementById("img-cont").innerHTML = "";
    // document.getElementById("edit-form").innerHTML = "";
  },
  render: function () {
    this.clearView();
    if (model.items.length != 0) {
      list = document.getElementById("img-list");
      frame = document.getElementById("img-cont");
      for (let i = 0; i < model.items.length; i++) {
        item = document.createElement("img");
        item.className = "img-thumbnail";
        item.setAttribute("onclick", "controller.selectItem(" + i + ")");
        item.setAttribute("src", model.items[i].src);
        list.append(item);

        if (model.items[i].selected) {
          title = document.createElement("div");
          title.className = "fs-3";
          img = document.createElement("img");
          img.className = "img-fluid";

          title.textContent = model.items[i].name;
          img.className = "img-fluid";
          img.setAttribute("src", model.items[i].src);

          counter = document.createElement("div");
          counter.className = "counter";
          counter.textContent = "Counter " + model.items[i].counter;

          button = document.createElement("button");
          button.className = "btn btn-primary";
          button.textContent = "Admin";
          button.setAttribute("onclick", "controller.editItem(" + i + ")");
          console.log(model.items[i].counter);

          frame.append(title);
          img.setAttribute("onclick", "controller.countIncrement(" + i + ")");
          frame.append(img);
          frame.append(counter);
          frame.append(button);
        }
      }
    }
  },
};

controller = {
  init: function () {
    view.render();
  },
  selectItem: function (itemIndex) {
    model.items.forEach((element) => {
      element.selected = false;
    });
    item = model.items[itemIndex];
    item.selected = true;
    view.render();
  },
  countIncrement: function (itemIndex) {
    item = model.items[itemIndex];
    item.counter++;
    view.render();
  },
  editItem: function (itemIndex) {
    for (let i = 0; i < Object.keys(model.items[itemIndex]).length - 1; i++) {
      form = document.createElement("form");
      form.id = "edit-form";
      input = document.createElement("input");
      input.className = "form-control";
      input.id = "input-" + Object.keys(model.items[itemIndex])[i];
      input.setAttribute("type", "text");
      input.setAttribute(
        "placeholder",
        Object.values(model.items[itemIndex])[i]
      );
      input.setAttribute("aria-label", "default input example");

      submit = document.createElement("button");
      submit.className = "btn btn-primary";
      submit.id = "submit-btn";
      submit.textContent = "Submit";
      //   submit.setAttribute("onclick", "updateItem(" + itemIndex + ")");
      submit.addEventListener("submit", (e) => {
        e.preventDefault();

        let name = document.getElementById("input-name");
        let src = document.getElementById("input-src");
        let counter = document.getElementById("input-counter");
        model.items[itemIndex].name = name.value;
        model.items[itemIndex].src = src.value;
        model.items[itemIndex].counter = counter.value;
      });

      form.append(input);
      frame.append(form);
    }
    form.append(submit);
    //why ruin code
    // view.render();
  },
  //   updateItem: function (itemIndex) {
  //     model.items[itemIndex].name = document.getElementById("input-name").value;
  //     model.items[itemIndex].src = document.getElementById("input-src").value;
  //     model.items[itemIndex].counter =
  //       document.getElementById("input-counter").value;
  //     // view.render();
  //   },
};

controller.init();
