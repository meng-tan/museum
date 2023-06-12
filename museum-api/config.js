const env = process.env.NODE_ENV || "development";

module.exports = {
  db_url: env === "development" ? "mongodb://127.0.0.1/museum_api" : "",
  jwt_secret: "you never know",
  oauth_client_id:
    "763616496547-8v9bcs1njvp6faoo2lnd59lvai3t2v3h.apps.googleusercontent.com",
  oauth_client_secret: "75dtAkgRCAihfuoRYLgqekRL",
  gmail_client_id:
    "763616496547-mt7tjoirjdq652pcjum14jni84skiekl.apps.googleusercontent.com",
  gmail_client_secret: "KZlQ8n1KgRT1NElZMwBkoUDC",
  gmail_refresh_token:
    "1//048z6Ti_mmw_LCgYIARAAGAQSNwF-L9IrcsVXv4PvKTL-7VqDDU8XNbHkhHsXSKgT7amxkIRGbDL14sirmjVTVeculQ7aCr7l8wU"
};
