const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "localhost",
      user: "sa",
      password: "111111",
      database: "basechatapp",
      connectTimeout: 60000
    },
    listPerPage: 10,
  };
  module.exports = config;