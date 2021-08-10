import * as expressive from "https://raw.githubusercontent.com/NMathar/deno-express/master/mod.ts";
import getData from './graphql/User.ts'
import check from './Auth.ts'

const port = 8080;
const app = new expressive.App();
app.use(expressive.simpleLog());
app.use(expressive.static_("./public"));

app.use(expressive.bodyParser.json());
app.get("/users/{username}", async (req, res) => {
  if (!req.query.token) {
    await res.json([{ error: "Token is required" }])
  }
  else {
    if (await check(req.query.token) == null) {
      await res.json([{
        message: "Bad credentials"
      }])
    }
    else {
      let response = await getData(req.params.username)
      await res.json([{
        userData: JSON.stringify(response)
      }])
    }
  }
});
app.get("/", async (req, res) => {
  await res.json([{ error: "Message needed" }])
});
app.get("*", async (req, res) => {
  res.send("BAD")
});
const server = await app.listen(port);
console.log("app listening on port " + server.port);