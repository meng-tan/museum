const env = process.env.NODE_ENV || "development";

module.exports = {
  db_url: env === "development" ? "mongodb://127.0.0.1/museum_api" : "",
  jwt_secret: "you never know",
  oauth_client_id:
    "763616496547-8v9bcs1njvp6faoo2lnd59lvai3t2v3h.apps.googleusercontent.com",
  oauth_client_secret: "75dtAkgRCAihfuoRYLgqekRL",
  gmail_user: "tanmeng.job@gmail.com",
  gmail_client_id:
    "763616496547-0i03etcd24qh22urss0oc9of0asp1eof.apps.googleusercontent.com",
  gmail_client_secret: "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",
  gmail_redirect_uri: "https://developers.google.com/oauthplayground",
  gmail_refresh_token:
    "1//04zOvX2NUJjAbCgYIARAAGAQSNwF-L9IrQ_wTlle06ytWtF-mBaCPglcGhuFU_BR-7hx2LUHwM4SGXc6wYlEY2VskMzEuvFkYoc0"
};
