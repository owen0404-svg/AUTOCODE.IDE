// netlify/functions/github-auth.js
const fetch = require("node-fetch");

exports.handler = async function(event) {
  const { code } = JSON.parse(event.body);
  const client_id = "Ov23ctoWKWIvvXsMAxZj";
  const client_secret = "b210cbbc70863953d08743cef536e2ba58b14a78";

  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: JSON.stringify({ client_id, client_secret, code })
    });

    const tokenData = await tokenRes.json();
    return {
      statusCode: 200,
      body: JSON.stringify(tokenData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "OAuth failed", message: error.message }),
    };
  }
};
