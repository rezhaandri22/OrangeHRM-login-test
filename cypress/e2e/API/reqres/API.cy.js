describe("API Testing on Reqres.in", () => {
  it("GET List Users", () => {
    cy.request("GET", "https://reqres.in/api/users?page=2").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("page", 2);
      expect(response.body.data).to.be.an("array");
    });
  });

  it("GET Single User", () => {
    cy.request("GET", "https://reqres.in/api/users/2").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property("id", 2);
    });
  });

  it("GET Single User Not Found", () => {
    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/23",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it("POST Create User", () => {
    cy.request("POST", "https://reqres.in/api/users", {
      name: "morpheus",
      job: "leader",
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("name", "morpheus");
      expect(response.body).to.have.property("job", "leader");
    });
  });

  it("PUT Update User", () => {
    cy.request("PUT", "https://reqres.in/api/users/2", {
      name: "morpheus",
      job: "zion resident",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("job", "zion resident");
    });
  });

  it("DELETE User", () => {
    cy.request("DELETE", "https://reqres.in/api/users/2").then((response) => {
      expect(response.status).to.eq(204); // No Content
    });
  });

  it("POST Register - Successful", () => {
    cy.request("POST", "https://reqres.in/api/register", {
      email: "eve.holt@reqres.in",
      password: "pistol",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("token");
    });
  });

  it("POST Register - Unsuccessful", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/register",
      body: { email: "sydney@fife" },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error", "Missing password");
    });
  });

  it("POST Login - Successful", () => {
    cy.request("POST", "https://reqres.in/api/login", {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("token");
    });
  });

  it("POST Login - Unsuccessful", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/login",
      body: { email: "peter@klaven" },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error", "Missing password");
    });
  });
});
