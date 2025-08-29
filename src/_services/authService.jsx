import axios from "axios";
import { accountService } from "./account.service";

const API_URL = "http://localhost:3000";

export const loginUser = async (email, password) => {
  try {
    const res = await axios.get(`${API_URL}/users?email=${email}`);
    const user = res.data[0];

    if (!user) throw new Error("Utilisateur non trouvé !");
    if (user.password !== password) throw new Error("Mot de passe incorrect");

    const token = btoa(email + ":" + password);
    accountService.saveToken(token);
    return token;
  } catch (err) {
    throw err;
  }
};

export const registerUser = async (email, password) => {
  try {
    const res = await axios.get(`${API_URL}/users?email=${email}`);
    if (res.data.length > 0) throw new Error("Utilisateur déjà existant !");

    const newUser = {
      id: Date.now().toString(),
      email,
      password
    };

    await axios.post(`${API_URL}/users`, newUser);

    const token = btoa(email + ":" + password);
    accountService.saveToken(token);
    return token;
  } catch (err) {
    throw err;
  }
};
