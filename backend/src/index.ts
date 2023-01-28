import { appFactory } from "./application";

const port = process.env.PORT || 8000;

const app = appFactory();

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
