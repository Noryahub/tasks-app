// src/_services/authMock.js
export const registerUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.find(u => u.email === email)) {
    throw new Error("Email déjà utilisé");
  }
  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));
  return true;
};

export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error("Email ou mot de passe incorrect");
  return "mock-token-" + Date.now();
};
