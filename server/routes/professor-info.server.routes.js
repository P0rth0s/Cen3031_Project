var professor = require('../controllers/professor-info.server.controller.js'),
    express = require('express'),
    router = express.Router();

    router.route('/')
          .get(professor.list);

    router.route('/update')
      .post(professor.update);

    module.exports = router;
