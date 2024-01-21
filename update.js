class UserTable {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.users = [];
  }

  static getInstance(apiUrl) {
    if (!UserTable.instance) {
      UserTable.instance = new UserTable(apiUrl);
    }
    return UserTable.instance;
  }

  async fetchUsers() {
    try {
      const response = await fetch(
        "https://65a8cad5219bfa3718679868.mockapi.io/prct/employee",
        { method: "GET" }
      );
      const users = await response.json();
      this.users = users;
      return this.users;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  createUserRow(user) {
    const row = document.createElement("tr");
    row.id = `row-${user.id}`;

    const idCell = document.createElement("td");
    idCell.textContent = user.id;
    row.appendChild(idCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = user.name;
    nameCell.id = `name-${user.id}`;
    row.appendChild(nameCell);

    const avatarCell = document.createElement("td");
    const avatarImg = document.createElement("img");
    avatarImg.src = user.avatar;
    avatarCell.appendChild(avatarImg);
    row.appendChild(avatarCell);

    const departmentCell = document.createElement("td");
    departmentCell.textContent = user.department;
    departmentCell.id = `department-${user.id}`;
    row.appendChild(departmentCell);

    const buttonCell = document.createElement("td");

    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.classList.add("update");
    updateButton.addEventListener("click", () => this.updateUser(user, row));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    deleteButton.addEventListener("click", () => this.deleteUser(user, row));

    buttonCell.append(updateButton, deleteButton);
    row.appendChild(buttonCell);
    return row;
  }

  async addUser() {
    let name = prompt("Enter new user's name");
    let department = prompt("Enter new user's department");

    let regex = /^[a-zA-Z ]+$/;

    if (
      !regex.test(name) ||
      !regex.test(department) ||
      !name ||
      name.trim() === "" ||
      !department ||
      department.trim() === ""
    ) {
      alert("Please enter the required fields with alphabetical characters.");
      return;
    } else {
      try {
        const response = await fetch(this.apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            department: department,
          }),
        });

        if (response.ok) {
          // Add the new user to the users array
          const newUser = await response.json();
          this.users.push(newUser);
          // Add the new user to the table
          const table = document
            .getElementById("userTableContainer")
            .getElementsByTagName("table")[0];
          table.appendChild(this.createUserRow(newUser));
          alert("User added");
        } else {
          throw new Error(`Error: ${response.statusText}`);
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred while adding the user");
      }
    }
  }

  async updateUser(user, row) {
    let newName = prompt("Enter new name for the user:", user.name);
    let newDepartment = prompt(
      "Enter new department for the user:",
      user.department
    );

    let regex = /^[a-zA-Z ]+$/;

    if (
      regex.test(newName) ||
      newName === null ||
      newName.trim() === "" ||
      regex.test(newDepartment) ||
      newDepartment === null ||
      newDepartment.trim() === ""
    ) {
      alert(
        "No updates made to the user. User inputs are not alphabetical characters."
      );
      return;
    }

    try {
      const response = await fetch(
        `https://65a8cad5219bfa3718679868.mockapi.io/prct/employee/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName,
            department: newDepartment,
          }),
        }
      );

      if (response.ok) {
        // update user object
        user.name = newName;
        user.department = newDepartment;

        // update DOM
        document.getElementById(`name-${user.id}`).textContent = newName;
        document.getElementById(`department-${user.id}`).textContent =
          newDepartment;
        alert("User updated!");
      } else {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating the user");
    }
  }

  async deleteUser(user, row) {
    let confirmation = confirm(
      `Are you sure you want to delete the user ${user.name} ?`
    );

    if (confirmation) {
      try {
        const response = await fetch(
          `https://65a8cad5219bfa3718679868.mockapi.io/prct/employee/${user.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("An error occurred while deleting the user");
        }

        row.remove();
        alert("User deleted!");
      } catch (err) {
        console.error(err);
        alert("An error occurred while deleting the user");
      }
    }
  }

  async renderTable() {
    const tableContainer = document.createElement("div");
    tableContainer.id = "userTableContainer";
    document.body.appendChild(tableContainer);

    const table = document.createElement("table");
    const thead = `<thead><tr><th>Employee ID</th><th>Name</th><th>Avatar</th><th>Department</th><th>Actions</th></tr></thead>`;
    table.innerHTML = thead;

    const addUserButton = document.createElement("button");
    addUserButton.textContent = "Add User";
    addUserButton.classList.add("addUser");
    addUserButton.addEventListener("click", () => this.addUser());
    tableContainer.before(addUserButton);

    (await this.fetchUsers()).forEach((user) => {
      table.appendChild(this.createUserRow(user));
    });

    tableContainer.appendChild(table);
  }
}

const table = UserTable.getInstance(
  "https://65a8cad5219bfa3718679868.mockapi.io/prct/employee"
);
table.renderTable();
