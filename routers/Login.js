const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
  try {
    res.send('data berhasil di send');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//  @route      POST api/login
//  @desc       LOGIN admin
//  @access     Public
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    let admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ msg: 'email tidak ditemukan' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'password salah' });
    }

    const payload = {
      admin: {
        id: admin.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 36000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
