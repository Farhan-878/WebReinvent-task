import axios from "axios";
import { register } from "./api";

jest.mock("axios");

test("registers a user successfully", async () => {
  const token = "fake-token";
  axios.post.mockResolvedValueOnce({ data: { token } });

  const response = await register("test@example.com", "password");

  expect(response.data.token).toBe(token);
  expect(axios.post).toHaveBeenCalledWith("https://reqres.in/api/register", {
    email: "test@example.com",
    password: "password",
  });
});

test("fails to register a user", async () => {
  axios.post.mockRejectedValueOnce(new Error("Registration failed"));

  await expect(register("test@example.com", "password")).rejects.toThrow(
    "Registration failed"
  );
});
