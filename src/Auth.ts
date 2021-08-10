export default async function makeQuery(token: any) {
  /*const githubData = {
    token: token,
    username: `darkworld`,
  };
  */
  const baseURL = "https://api.github.com/graphql";
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  const body = `
    query thing {
      viewer {
        login
      }
    }
  `
  var info = await fetch(baseURL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: body,
      variables: {},
    }),
  });
  var json = await info.json();
  if (json.message) {
    console.log(json.message)
    return null
  }
  if (json.errors) {
    return null
  }
  return json;
}